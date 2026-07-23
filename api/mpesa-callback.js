import { updateUser, getUser, addTransaction } from '../lib/db.js';

export default async function handler(req, res) {
  const body = req.body;
  const result = body.Body.stkCallback;

  if(result.ResultCode === 0){ // Success
    const amount = result.CallbackMetadata.Item[0].Value;
    const email = result.CallbackMetadata.Item[3].Value; // AccountReference

    const user = await getUser(email);
    await updateUser(email, { balance: user.balance + amount });
    await addTransaction(email, { type: 'deposit', method: 'M-Pesa', amount, status: 'Success' });
  }

  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
