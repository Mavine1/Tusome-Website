import express from 'express';
import { initiatePayment, mpesaCallback, getPaymentStatus } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/initiate', protect, initiatePayment);
router.post('/callback', mpesaCallback);
router.get('/status/:checkoutRequestID', protect, getPaymentStatus);

export default router;