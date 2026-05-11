import { Resend } from 'resend';
import { IEmailProvider } from './types';
import { logger } from '../monitoring/logger';

export class EmailIntegration implements IEmailProvider {
  private resend: Resend;
  private from: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    this.from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  }

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      if (!process.env.RESEND_API_KEY) return false;

      await this.resend.emails.send({
        from: this.from,
        to,
        subject,
        html
      });
      return true;
    } catch (error) {
      logger.error({ err: error }, 'Resend email failed');
      return false;
    }
  }
}
