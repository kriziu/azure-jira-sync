import { env } from '@/env';

const jiraDomain = env.JIRA_ORG_DOMAIN;
const email = env.JIRA_EMAIL;
const apiToken = env.JIRA_API_TOKEN;

const jiraBaseUrl = `https://${jiraDomain}/rest/api/2`;
const authHeader = `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`;

export async function getWorkItem(id: number) {
  try {
    const fields =
      'summary,description,parent,subtasks,status,issuetype,assignee,reporter,priority';

    const response = await fetch(`${jiraBaseUrl}/issue/${id}?fields=${fields}`, {
      method: 'GET',
      headers: {
        Authorization: authHeader,
        Accept: 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Error fetching work item: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching work item:', error);
    throw error;
  }
}
export async function getAllWorkItems() {
  try {
    const jql = 'ORDER BY created DESC';
    const response = await fetch(
      `${jiraBaseUrl}/search?jql=${encodeURIComponent(jql)}&maxResults=1000&fields=id,key,summary,status,issuetype`,
      {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          Accept: 'application/json',
        },
        next: { revalidate: 0 },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching all work items: ${response.statusText}`);
    }

    const data = await response.json();
    return data.issues;
  } catch (error) {
    console.error('Error fetching all work items:', error);
    throw error;
  }
}

export async function updateWorkItemTitle(id: number, newTitle: string) {
  try {
    const patchData = {
      update: {
        summary: [
          {
            set: newTitle,
          },
        ],
      },
    };

    const response = await fetch(`${jiraBaseUrl}/issue/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(patchData),
    });

    if (!response.ok) {
      throw new Error(`Error updating work item title: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating work item title:', error);
    throw error;
  }
}
