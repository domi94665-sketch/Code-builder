import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import playbook from './sanity/schemas/playbook';

export default defineConfig({
  name: 'codex-architect',
  title: 'Codex Architect CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [deskTool()],
  schema: {
    types: [playbook]
  }
});
