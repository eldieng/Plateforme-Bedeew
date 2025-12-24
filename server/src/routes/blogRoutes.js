import express from 'express';
import { getBlogs, getBlog, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
  validateCreateBlog,
  validateUpdateBlog,
  validateObjectId,
  validateSlug,
  validatePagination
} from '../middleware/validators.js';

const router = express.Router();

router.route('/')
  .get(validatePagination, getBlogs)
  .post(protect, authorize('admin'), validateCreateBlog, createBlog);

router.route('/slug/:slug')
  .get(validateSlug, getBlogBySlug);

router.route('/:id')
  .get(validateObjectId, getBlog)
  .put(protect, authorize('admin'), validateUpdateBlog, updateBlog)
  .delete(protect, authorize('admin'), validateObjectId, deleteBlog);

export default router;
