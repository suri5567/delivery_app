import express from 'express';
import { calculateDriverPayment } from '../controllers/paymentController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/calculate', authenticate, authorizeRoles('Admin', 'Driver'), calculateDriverPayment);

export default router;
