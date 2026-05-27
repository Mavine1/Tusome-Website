import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

class MpesaService {
  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY;
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    this.passkey = process.env.MPESA_PASSKEY;
    this.shortCode = process.env.MPESA_SHORTCODE;
    this.callbackURL = process.env.MPESA_CALLBACK_URL;
    this.baseURL = process.env.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke';
    this.token = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.token && this.tokenExpiry > Date.now()) return this.token;

    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');

    try {
      const { data } = await axios.get(
        `${this.baseURL}/oauth/v1/generate?grant_type=client_credentials`,
        { headers: { Authorization: `Basic ${auth}` } }
      );
      this.token = data.access_token;
      this.tokenExpiry = Date.now() + 50 * 60 * 1000;
      return this.token;
    } catch (error) {
      const msg = error.response?.data || error.message;
      console.error('Token error:', msg);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  getTimestamp() {
    return new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);
  }

  generatePassword(timestamp) {
    return Buffer.from(`${this.shortCode}${this.passkey}${timestamp}`).toString('base64');
  }

  async stkPush(phoneNumber, amount, accountReference, transactionDesc) {
    const token = await this.getAccessToken();
    const timestamp = this.getTimestamp();
    const password = this.generatePassword(timestamp);

    // DEBUG — remove after fixing
    console.log("=== STK DEBUG ===");
    console.log("Shortcode:", this.shortCode);
    console.log("Passkey:", this.passkey);
    console.log("Passkey length:", this.passkey?.length);
    console.log("Timestamp:", timestamp);
    console.log("Raw string:", `${this.shortCode}${this.passkey}${timestamp}`);
    console.log("Password:", password);

    const payload = {
      BusinessShortCode: this.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: phoneNumber,
      PartyB: this.shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: this.callbackURL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc
    };

    try {
      const { data } = await axios.post(
        `${this.baseURL}/mpesa/stkpush/v1/processrequest`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      const msg = error.response?.data || error.message;
      console.error('STK Push error:', JSON.stringify(msg, null, 2));
      throw new Error('STK Push initiation failed');
    }
  }
}

export default new MpesaService();