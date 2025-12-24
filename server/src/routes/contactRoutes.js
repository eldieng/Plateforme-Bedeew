import express from 'express';
import {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import {
  validateContact,
  validateUpdateContact,
  validateObjectId,
  validatePagination
} from '../middleware/validators.js';

const router = express.Router();

router.post('/', contactLimiter, validateContact, submitContact);
router.get('/', protect, authorize('admin'), validatePagination, getContacts);
router.get('/:id', protect, authorize('admin'), validateObjectId, getContact);
router.put('/:id', protect, authorize('admin'), validateUpdateContact, updateContact);
router.delete('/:id', protect, authorize('admin'), validateObjectId, deleteContact);

export default router;
