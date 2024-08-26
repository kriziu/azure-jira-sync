import * as azdev from 'azure-devops-node-api';

import { env } from '@/env';

const orgUrl = env.AZURE_ORG_URL;
const authHandler = azdev.getPersonalAccessTokenHandler(env.AZURE_DEVOPS_PAT);
const connection = new azdev.WebApi(orgUrl, authHandler);

async function getWorkItemTrackingApi() {
  return await connection.getWorkItemTrackingApi();
}

export async function getWorkItem(id: number) {
  const api = await getWorkItemTrackingApi();

  const workItem = await api.getWorkItem(id);
  return workItem;
}

export async function getAllWorkItems() {
  const api = await getWorkItemTrackingApi();

  const workItemsQuery = {
    query: 'Select [System.Id] From WorkItems',
  };

  const workItemsQueryResult = await api.queryByWiql(workItemsQuery);
  const workItemsIds = workItemsQueryResult.workItems
    ?.map((workItem) => workItem.id)
    .filter((id): id is number => id !== undefined);

  if (!workItemsIds) {
    return [];
  }

  const workItems = await api.getWorkItems(workItemsIds);
  return workItems;
}

export async function updateWorkItemTitle(id: number, newTitle: string) {
  const api = await getWorkItemTrackingApi();

  const patchDocument = [
    {
      op: 'add',
      path: '/fields/System.Title',
      value: newTitle,
    },
  ];

  const updatedWorkItem = await api.updateWorkItem(null, patchDocument, id);
  return updatedWorkItem;
}
