import axios from 'axios';
import { logger } from '../monitoring/logger';

export class MpesaIntegration {
  private static get baseUrl() {
    return process.env.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';
  }

  private static get authHeader() {
    const key = process.env.MPESA_CONSUMER_KEY;
    const secret = process.env.MPESA_CONSUMER_SECRET;
    return `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`;
  }

  static async getAccessToken(): Promise<string> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
        { headers: { Authorization: this.authHeader } }
      );
      return response.data.access_token;
    } catch (error) {
      logger.error({ err: error }, 'Failed to get M-Pesa access token');
      throw new Error('M-Pesa Authentication Failed');
    }
  }

  static async stkPush(phone: string, amount: number, reference: string, description: string = 'Payment') {
    const token = await this.getAccessToken();
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    
    // Format timestamp: YYYYMMDDHHmmss
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
    
    // Ensure phone is 254... format
    const formattedPhone = phone.startsWith('+') ? phone.substring(1) : phone;

    try {
      const response = await axios.post(
        `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
        {
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: formattedPhone,
          PartyB: shortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: process.env.MPESA_CALLBACK_URL,
          AccountReference: reference,
          TransactionDesc: description
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return response.data;
    } catch (error: any) {
      logger.error({ err: error.response?.data || error.message }, 'M-Pesa STK Push Failed');
      throw new Error('Failed to initiate M-Pesa payment');
    }
  }
}
