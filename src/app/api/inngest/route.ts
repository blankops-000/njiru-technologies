import { serve } from 'inngest/next';
import { inngest } from '@/queues/inngest/client';
import { notifyContactCreated } from '@/queues/inngest/functions/contact-notifications';
import { notifyProjectStatusChanged } from '@/queues/inngest/functions/project-notifications';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    notifyContactCreated,
    notifyProjectStatusChanged,
  ],
});
