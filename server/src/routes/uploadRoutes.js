import express from 'express';
import { upload } from '../config/cloudinary.js';
import { uploadImage, uploadMultipleImages, deleteImage } from '../controllers/uploadController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Single image upload (accessible to all authenticated users)
router.post(
  '/',
  protect,
  upload.single('image'),
  uploadImage
);

// Multiple images upload
router.post(
  '/multiple',
  protect,
  authorize('admin'),
  upload.array('images', 10), // Max 10 images
  uploadMultipleImages
);

// Delete image
router.delete(
  '/:filename',
  protect,
  authorize('admin'),
  deleteImage
);

export default router;
