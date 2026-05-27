import express from 'express';
import { getAllClasses, getClassById, createClass } from '../controllers/classController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.post('/', protect, createClass); // only for seeding

export default router;