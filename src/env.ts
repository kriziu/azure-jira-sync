import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AZURE_ORG_URL: z.string().min(1),
    AZURE_DEVOPS_PAT: z.string().min(1),
    JIRA_ORG_DOMAIN: z.string().min(1),
    JIRA_EMAIL: z.string().min(1),
    JIRA_API_TOKEN: z.string().min(1),
  },
  runtimeEnv: {
    AZURE_DEVOPS_PAT: process.env.AZURE_DEVOPS_PAT,
    AZURE_ORG_URL: process.env.AZURE_ORG_URL,
    JIRA_ORG_DOMAIN: process.env.JIRA_ORG_DOMAIN,
    JIRA_EMAIL: process.env.JIRA_EMAIL,
    JIRA_API_TOKEN: process.env.JIRA_API_TOKEN,
  },
});
