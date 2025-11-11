import express from 'express';
import {
  getServices,
  getService,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.post('/', protect, authorize('admin'), createService);

router.get('/slug/:slug', getServiceBySlug);

router.get('/:id', getService);
router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

export default router;
