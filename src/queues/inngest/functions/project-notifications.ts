import { inngest } from '../client';
import { WhatsAppIntegration } from '@/lib/integrations/whatsapp';
import { logger } from '@/lib/monitoring/logger';

export const notifyProjectStatusChanged = inngest.createFunction(
  { id: 'notify-project-status', triggers: [{ event: 'project.status.changed' }] },
  async ({ event, step }) => {
    const { projectId, newStatus, contactId } = event.data;

    if (newStatus === 'delivered') {
      await step.run('notify-client-delivery', async () => {
        // Here you would lookup the contact, decrypt their phone number, and send a message.
        // For demonstration, we just log it.
        logger.info({ projectId, contactId }, 'Simulating client delivery notification via WhatsApp');
        // const whatsapp = new WhatsAppIntegration();
        // await whatsapp.sendTemplate(decryptedPhone, 'project_delivered', [projectName]);
      });
    }
    
    return { success: true };
  }
);
