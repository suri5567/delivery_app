import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('Admin', 'User'), createOrder);
router.get('/', authenticate, authorizeRoles('Admin'), getAllOrders);
router.get('/:id', authenticate, authorizeRoles('Admin', 'User'), getOrderById);
router.put('/:id', authenticate, authorizeRoles('Admin', 'User'), updateOrder);
router.delete('/:id', authenticate, authorizeRoles('Admin'), deleteOrder);

export default router;
