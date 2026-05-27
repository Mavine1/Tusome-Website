import express from 'express';
import { getUserSubscriptions } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/subscriptions', protect, getUserSubscriptions);

export default router;