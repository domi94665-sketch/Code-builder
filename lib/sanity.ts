import { createClient } from '@sanity/client';
import { z } from 'zod';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

let client: ReturnType<typeof createClient> | null = null;

if (projectId && dataset) {
  client = createClient({
    projectId,
    dataset,
    apiVersion: '2023-10-01',
    useCdn: true,
    token: process.env.SANITY_API_TOKEN
  });
}

const playbookSchema = z.object({
  _id: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  category: z.string().optional()
});

export type Playbook = z.infer<typeof playbookSchema>;

export async function getPlaybooks(): Promise<Playbook[]> {
  if (!client) {
    return [];
  }

  const query = `*[_type == "playbook"]{ _id, title, summary, category } | order(_createdAt desc)`;
  const data = await client.fetch(query);
  const result = z.array(playbookSchema).safeParse(data);
  if (!result.success) {
    console.error(result.error);
    return [];
  }
  return result.data;
}
