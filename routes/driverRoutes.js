import express from 'express';
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from '../controllers/driverController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('Admin'), createDriver);
router.get('/', authenticate, authorizeRoles('Admin'), getAllDrivers);
router.get('/:id', authenticate, authorizeRoles('Admin', 'Driver'), getDriverById);
router.put('/:id', authenticate, authorizeRoles('Admin'), updateDriver);
router.delete('/:id', authenticate, authorizeRoles('Admin'), deleteDriver);

export default router;
