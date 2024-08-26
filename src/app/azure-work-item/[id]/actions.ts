'use server';

import { revalidatePath } from 'next/cache';

import { updateWorkItemTitle } from '@/data-access/azure-work-item';

export async function updateAzureWorkItemTitleAction(formData: FormData) {
  const id = formData.get('id');
  const newTitle = formData.get('newTitle');

  if (!id || !newTitle) {
    return;
  }

  await updateWorkItemTitle(Number(id), newTitle.toString());

  revalidatePath(`/azure-work-item/${id}`);
}
