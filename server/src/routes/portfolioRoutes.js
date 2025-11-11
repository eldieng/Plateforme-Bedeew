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

const router = express.Router();

router.get('/', getPortfolios);
router.post('/', protect, authorize('admin'), createPortfolio);

router.get('/slug/:slug', getPortfolioBySlug);

router.get('/:id', getPortfolio);
router.put('/:id', protect, authorize('admin'), updatePortfolio);
router.delete('/:id', protect, authorize('admin'), deletePortfolio);

export default router;
