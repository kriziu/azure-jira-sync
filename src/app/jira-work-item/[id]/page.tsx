import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as JiraWorkItemDataAccess from '@/data-access/jira-work-item';
import { convertJiraMarkupToHtml } from '@/entities/markdown';

import { updateJiraWorkItemTitleAction } from './actions';

export const dynamic = 'force-dynamic';

type WorkItemPageProps = {
  params: { id: string };
};

export default async function WorkItemPage({ params }: WorkItemPageProps) {
  const workItem = await JiraWorkItemDataAccess.getWorkItem(Number(params.id));

  const title = workItem?.fields?.['summary'];
  // TODO: This doesnt work properly
  const description = convertJiraMarkupToHtml(workItem?.fields?.['description'] ?? '');
  const state = workItem?.fields?.['status']?.name;
  const assignedTo = workItem?.fields?.['assignee'];

  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {state} | {assignedTo?.displayName}
          </CardDescription>
        </CardHeader>
        {description && <CardContent dangerouslySetInnerHTML={{ __html: description }} />}
        <CardFooter>
          <form action={updateJiraWorkItemTitleAction}>
            <Input name="id" type="hidden" value={params.id} />
            <Label htmlFor="newTitle">New Title</Label>
            <Input name="newTitle" type="text" defaultValue={title} id="newTitle" />
            <Button type="submit" className="mt-4">
              Update Title
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
