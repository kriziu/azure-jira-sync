import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import * as AzureWorkItemDataAccess from '@/data-access/azure-work-item';
import * as JiraWorkItemDataAccess from '@/data-access/jira-work-item';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const azureWorkItems = await AzureWorkItemDataAccess.getAllWorkItems();
  const jiraWorkItems = await JiraWorkItemDataAccess.getAllWorkItems();

  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <h1 className="text-2xl font-bold">Azure Work Items</h1>
      {azureWorkItems.map((workItem) => (
        <Link href={`/azure-work-item/${workItem.id}`} key={workItem.id}>
          {workItem.fields?.['System.Title']}
        </Link>
      ))}

      <Separator className="my-4" />

      <h1 className="text-2xl font-bold">Jira Work Items</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {jiraWorkItems.map((workItem: Record<string, any>) => (
        <Link href={`/jira-work-item/${workItem.id}`} key={workItem.id}>
          {workItem.fields?.['summary']}
        </Link>
      ))}
    </main>
  );
}
