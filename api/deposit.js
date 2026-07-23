import axios from 'axios';
import { addTransaction } from '../lib/db.js';

export default async function handler(req, res) {
  const { email, phone, amount } = req.body; // phone = 254712345678

  // 1. Get Safaricom Access Token
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
  const tokenRes = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: `Basic ${auth}` }
  });
  const token = tokenRes.data.access_token;

  // 2. Send STK Push
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(`174379${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

  await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    BusinessShortCode: 174379,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: 174379,
    PhoneNumber: phone,
    CallBackURL: "https://your-vercel-app.vercel.app/api/mpesa-callback",
    AccountReference: email,
    TransactionDesc: "Investpesa Deposit"
  }, { headers: { Authorization: `Bearer ${token}` } });

  // 3. Save as "Pending" until callback comes
  await addTransaction(email, { type: 'deposit', method: 'M-Pesa', amount, status: 'Pending' });

  res.json({ success: true, message: "Check your phone to enter MPesa PIN" });
}
