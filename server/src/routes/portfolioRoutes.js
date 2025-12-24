import express from 'express';
import {
  getPortfolios,
  getPortfolio,
  getPortfolioBySlug,
  createPortfolio,
  updatePortfolio,
  deletePortfolio
} from '../controllers/portfolioController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateCreatePortfolio,
  validateUpdatePortfolio,
  validateObjectId,
  validateSlug,
  validatePagination
} from '../middleware/validators.js';

const router = express.Router();

router.get('/', validatePagination, getPortfolios);
router.post('/', protect, authorize('admin'), validateCreatePortfolio, createPortfolio);

router.get('/slug/:slug', validateSlug, getPortfolioBySlug);

router.get('/:id', validateObjectId, getPortfolio);
router.put('/:id', protect, authorize('admin'), validateUpdatePortfolio, updatePortfolio);
router.delete('/:id', protect, authorize('admin'), validateObjectId, deletePortfolio);

export default router;
