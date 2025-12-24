import { body, param, query, validationResult } from 'express-validator';

// Middleware pour gérer les erreurs de validation
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Validation pour MongoDB ObjectId
export const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  validate
];

// Validation pour les slugs
export const validateSlug = [
  param('slug')
    .isSlug()
    .withMessage('Invalid slug format')
    .isLength({ min: 1, max: 100 })
    .withMessage('Slug must be between 1 and 100 characters'),
  validate
];

// ========== SERVICE VALIDATORS ==========

export const validateCreateService = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ max: 200 })
    .withMessage('Short description cannot exceed 200 characters'),
  
  body('fullDescription')
    .trim()
    .notEmpty()
    .withMessage('Full description is required')
    .isLength({ min: 50 })
    .withMessage('Full description must be at least 50 characters'),
  
  body('category')
    .isIn(['development', 'design', 'marketing', 'seo', 'content', 'consulting'])
    .withMessage('Invalid category'),
  
  body('icon')
    .optional()
    .isString()
    .withMessage('Icon must be a string'),
  
  body('pricing.startingPrice')
    .optional()
    .isNumeric()
    .withMessage('Starting price must be a number'),
  
  body('pricing.pricingType')
    .optional()
    .isIn(['fixed', 'hourly', 'project', 'monthly', 'custom'])
    .withMessage('Invalid pricing type'),
  
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean'),
  
  validate
];

export const validateUpdateService = [
  param('id').isMongoId().withMessage('Invalid service ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Short description cannot exceed 200 characters'),
  
  body('category')
    .optional()
    .isIn(['development', 'design', 'marketing', 'seo', 'content', 'consulting'])
    .withMessage('Invalid category'),
  
  validate
];

// ========== PORTFOLIO VALIDATORS ==========

export const validateCreatePortfolio = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  
  body('category')
    .isIn(['web', 'mobile', 'design', 'seo', 'social-media', 'video', 'branding', 'other'])
    .withMessage('Invalid category'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array'),
  
  body('projectUrl')
    .optional()
    .isURL()
    .withMessage('Invalid project URL'),
  
  body('client.website')
    .optional()
    .isURL()
    .withMessage('Invalid client website URL'),
  
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  
  validate
];

export const validateUpdatePortfolio = [
  param('id').isMongoId().withMessage('Invalid portfolio ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('category')
    .optional()
    .isIn(['web', 'mobile', 'design', 'seo', 'social-media', 'video', 'branding', 'other'])
    .withMessage('Invalid category'),
  
  validate
];

// ========== BLOG VALIDATORS ==========

export const validateCreateBlog = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('excerpt')
    .trim()
    .notEmpty()
    .withMessage('Excerpt is required')
    .isLength({ max: 300 })
    .withMessage('Excerpt cannot exceed 300 characters'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters'),
  
  body('category')
    .isIn(['design', 'marketing', 'development', 'seo', 'business', 'tutorial'])
    .withMessage('Invalid category'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('readTime')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('Read time must be between 1 and 120 minutes'),
  
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  
  validate
];

export const validateUpdateBlog = [
  param('id').isMongoId().withMessage('Invalid blog ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('category')
    .optional()
    .isIn(['design', 'marketing', 'development', 'seo', 'business', 'tutorial'])
    .withMessage('Invalid category'),
  
  validate
];

// ========== CONTACT VALIDATORS ==========

export const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage('Name contains invalid characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Invalid phone number format'),
  
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('isQuote')
    .optional()
    .isBoolean()
    .withMessage('isQuote must be a boolean'),
  
  body('projectType')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Project type cannot exceed 100 characters'),
  
  body('budget')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Budget cannot exceed 50 characters'),
  
  body('deadline')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Deadline cannot exceed 100 characters'),
  
  validate
];

export const validateUpdateContact = [
  param('id').isMongoId().withMessage('Invalid contact ID'),
  body('status')
    .optional()
    .isIn(['new', 'read', 'replied', 'archived'])
    .withMessage('Invalid status'),
  
  body('adminNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Admin notes cannot exceed 1000 characters'),
  
  validate
];

// ========== USER VALIDATORS ==========

export const validateRegister = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage('First name contains invalid characters'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage('Last name contains invalid characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Invalid phone number format'),
  
  validate
];

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  validate
];

export const validateUpdateUser = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('role')
    .optional()
    .isIn(['user', 'admin', 'recruiter', 'candidate'])
    .withMessage('Invalid role'),
  
  validate
];

// ========== QUERY VALIDATORS ==========

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  validate
];

export const validateCategory = (allowedCategories) => [
  query('category')
    .optional()
    .isIn(allowedCategories)
    .withMessage(`Invalid category. Allowed: ${allowedCategories.join(', ')}`),
  
  validate
];
