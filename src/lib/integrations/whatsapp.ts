import axios from 'axios';
import { IWhatsAppProvider } from './types';
import { logger } from '../monitoring/logger';

export class WhatsAppIntegration implements IWhatsAppProvider {
  private static get token() { return process.env.WHATSAPP_ACCESS_TOKEN; }
  private static get phoneId() { return process.env.WHATSAPP_PHONE_NUMBER_ID; }
  private static get apiUrl() { return `https://graph.facebook.com/v19.0/${this.phoneId}/messages`; }

  async send(to: string, message: string): Promise<boolean> {
    try {
      if (!WhatsAppIntegration.token) return false;

      await axios.post(
        WhatsAppIntegration.apiUrl,
        {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to.replace('+', ''),
          type: "text",
          text: { preview_url: false, body: message }
        },
        { headers: { Authorization: `Bearer ${WhatsAppIntegration.token}` } }
      );
      return true;
    } catch (error: any) {
      logger.error({ err: error.response?.data || error.message }, 'WhatsApp send failed');
      return false;
    }
  }

  async sendTemplate(to: string, templateName: string, params: any[]): Promise<boolean> {
    try {
      if (!WhatsAppIntegration.token) return false;

      await axios.post(
        WhatsAppIntegration.apiUrl,
        {
          messaging_product: "whatsapp",
          to: to.replace('+', ''),
          type: "template",
          template: {
            name: templateName,
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: params.map(p => ({ type: "text", text: p }))
              }
            ]
          }
        },
        { headers: { Authorization: `Bearer ${WhatsAppIntegration.token}` } }
      );
      return true;
    } catch (error: any) {
      logger.error({ err: error.response?.data || error.message }, 'WhatsApp template failed');
      return false;
    }
  }
}
