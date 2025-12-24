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
import {
  validateCreateService,
  validateUpdateService,
  validateObjectId,
  validateSlug
} from '../middleware/validators.js';

const router = express.Router();

router.get('/', getServices);
router.post('/', protect, authorize('admin'), validateCreateService, createService);

router.get('/slug/:slug', validateSlug, getServiceBySlug);

router.get('/:id', validateObjectId, getService);
router.put('/:id', protect, authorize('admin'), validateUpdateService, updateService);
router.delete('/:id', protect, authorize('admin'), validateObjectId, deleteService);

export default router;
