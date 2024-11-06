import express from 'express';
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('Admin'), createRoute);
router.get('/', authenticate, authorizeRoles('Admin', 'Driver'), getAllRoutes);
router.get('/:id', authenticate, authorizeRoles('Admin', 'Driver'), getRouteById);
router.put('/:id', authenticate, authorizeRoles('Admin'), updateRoute);
router.delete('/:id', authenticate, authorizeRoles('Admin'), deleteRoute);

export default router;
