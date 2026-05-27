import mpesaService from '../services/mpesaService.js';
import Class from '../models/Class.js';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

export const initiatePayment = async (req, res) => {
  try {
    const { classId, phoneNumber } = req.body;
    const userId = req.user.id;

    const classItem = await Class.findById(classId);
    if (!classItem) return res.status(404).json({ error: 'Class not found' });

    // Format phone number to 254XXXXXXXXX
    let phone = phoneNumber.trim().replace(/\s+/g, '');
    if (phone.startsWith('+254')) phone = phone.slice(1);
    else if (phone.startsWith('0')) phone = '254' + phone.slice(1);
    else if (!phone.startsWith('254')) phone = '254' + phone;

    const accountReference = `TUSOME-${classId}`;
    const response = await mpesaService.stkPush(
      phone,
      classItem.price,
      accountReference,
      `Subscription to ${classItem.title}`
    );

    if (response.ResponseCode === '0') {
      const subscription = await Subscription.create({
        userId,
        classId,
        amount: classItem.price,
        status: 'pending',
        checkoutRequestID: response.CheckoutRequestID,
        merchantRequestID: response.MerchantRequestID
      });

      return res.json({
        success: true,
        checkoutRequestID: response.CheckoutRequestID,
        message: 'STK Push sent. Complete payment on your phone.'
      });
    }

    return res.status(400).json({
      success: false,
      message: response.ResponseDescription || 'STK Push failed'
    });

  } catch (error) {
    console.error('Payment error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const mpesaCallback = async (req, res) => {
  try {
    console.log('M-Pesa callback:', JSON.stringify(req.body, null, 2));

    const stkCallback = req.body?.Body?.stkCallback;
    if (!stkCallback) return res.json({ ResultCode: 0, ResultDesc: 'Success' });

    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback;

    const subscription = await Subscription.findOne({ checkoutRequestID: CheckoutRequestID });
    if (!subscription) return res.json({ ResultCode: 0, ResultDesc: 'Success' });

    if (ResultCode === 0) {
      // Payment successful
      const items = CallbackMetadata?.Item || [];
      const receipt = items.find(i => i.Name === 'MpesaReceiptNumber')?.Value;
      const transDate = items.find(i => i.Name === 'TransactionDate')?.Value;

      const now = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      subscription.status = 'active';
      subscription.startDate = now;
      subscription.endDate = endDate;
      if (receipt) subscription.mpesaReceiptNumber = receipt;
      if (transDate) subscription.transactionDate = transDate;
      await subscription.save();

      await User.findByIdAndUpdate(subscription.userId, {
        subscriptionStatus: 'active',
        subscriptionId: subscription._id
      });

      await Class.findByIdAndUpdate(subscription.classId, {
        $addToSet: { enrolledStudents: subscription.userId }
      });

    } else {
      // Payment failed or cancelled
      subscription.status = 'failed';
      subscription.failureReason = ResultDesc;
      await subscription.save();
    }

  } catch (error) {
    console.error('Callback error:', error.message);
  }

  // Always respond with success to Safaricom
  res.json({ ResultCode: 0, ResultDesc: 'Success' });
};

export const getPaymentStatus = async (req, res) => {
  try {
    const { checkoutRequestID } = req.params;
    const subscription = await Subscription.findOne({ checkoutRequestID });
    if (!subscription) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ status: subscription.status, subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};