import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  status: { type: String, enum: ['pending', 'active', 'expired', 'cancelled', 'failed'], default: 'pending' },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'KES' },
  startDate: { type: Date },
  endDate: { type: Date },
  paymentMethod: { type: String, enum: ['mpesa', 'card'], default: 'mpesa' },
  checkoutRequestID: { type: String },
  merchantRequestID: { type: String },
  mpesaReceiptNumber: { type: String },
  transactionDate: { type: String },
  failureReason: { type: String }
}, { timestamps: true });

export default mongoose.model('Subscription', subscriptionSchema);