import express from 'express';
import authRoutes from './authRoutes.js';
import contactRoutes from './contactRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import blogRoutes from './blogRoutes.js';
import userRoutes from './userRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import apiLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply rate limiting to all API routes
router.use(apiLimiter);

// API Routes
router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/services', serviceRoutes);
router.use('/blog', blogRoutes);
router.use('/users', userRoutes);
router.use('/upload', uploadRoutes);

export default router;
