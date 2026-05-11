import axios from 'axios';
import { ISmsProvider } from './types';
import { logger } from '../monitoring/logger';

export class SmsIntegration implements ISmsProvider {
  async send(to: string, message: string): Promise<boolean> {
    try {
      const username = process.env.AFRICASTALKING_USERNAME;
      const apiKey = process.env.AFRICASTALKING_API_KEY;
      
      if (!username || !apiKey) return false;

      const params = new URLSearchParams();
      params.append('username', username);
      params.append('to', to);
      params.append('message', message);

      await axios.post(
        'https://api.africastalking.com/version1/messaging',
        params,
        {
          headers: {
            'apiKey': apiKey,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      return true;
    } catch (error: any) {
      logger.error({ err: error.response?.data || error.message }, 'SMS send failed');
      return false;
    }
  }
}
