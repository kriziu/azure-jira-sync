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
import * as AzureWorkItemDataAccess from '@/data-access/azure-work-item';

import { updateAzureWorkItemTitleAction } from './actions';

export const dynamic = 'force-dynamic';

type WorkItemPageProps = {
  params: { id: string };
};

export default async function WorkItemPage({ params }: WorkItemPageProps) {
  const workItem = await AzureWorkItemDataAccess.getWorkItem(Number(params.id));

  const title = workItem?.fields?.['System.Title'];
  const state = workItem?.fields?.['System.State'];
  const assignedTo = workItem?.fields?.['System.AssignedTo'];
  const description = workItem?.fields?.['System.Description'];

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
          <form action={updateAzureWorkItemTitleAction}>
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
