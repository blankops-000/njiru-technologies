import { inngest } from '../client';
import { EmailIntegration } from '@/lib/integrations/email';
import { WhatsAppIntegration } from '@/lib/integrations/whatsapp';
import { logger } from '@/lib/monitoring/logger';

export const notifyContactCreated = inngest.createFunction(
  { id: 'notify-contact-created', triggers: [{ event: 'contact.created' }] },
  async ({ event, step }) => {
    const { contactId, source, message } = event.data;

    // Step 1: Send WhatsApp notification to Admin
    await step.run('notify-admin-whatsapp', async () => {
      const whatsapp = new WhatsAppIntegration();
      const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;
      
      if (adminPhone) {
        await whatsapp.send(
          adminPhone, 
          `New Contact Lead (${source})\n\nID: ${contactId}\nMessage: ${message || 'No message provided'}`
        );
      } else {
        logger.warn('No admin phone configured for WhatsApp notifications');
      }
    });

    // We can add a step here to auto-reply to the user if they provided an email,
    // but we would need to look up the contact and decrypt their email.
    
    return { success: true };
  }
);
