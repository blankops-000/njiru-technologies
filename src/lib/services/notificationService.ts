import { logger } from '../monitoring/logger';

export class NotificationService {
  static async notifyAdmin(message: string) {
    logger.info({ message }, 'NOTIFY ADMIN');
    // Here we would call the WhatsApp Integration
    // await WhatsAppAPI.sendTextMessage(process.env.WHATSAPP_ADMIN_PHONE!, message);
  }

  static async notifyClient(contactId: string, message: string) {
    logger.info({ contactId, message }, 'NOTIFY CLIENT');
    // Here we would lookup the contact, decrypt PII, and send email/WhatsApp
  }
}
