import mongoose from 'mongoose';
import slugify from 'slugify';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description'],
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  fullDescription: {
    type: String,
    required: [true, 'Please provide a full description']
  },
  icon: {
    type: String,
    default: 'code'
  },
  image: String,
  features: [{
    title: String,
    description: String
  }],
  pricing: {
    startingPrice: Number,
    currency: {
      type: String,
      default: 'FCFA'
    },
    pricingType: {
      type: String,
      enum: ['fixed', 'hourly', 'project', 'monthly', 'custom'],
      default: 'custom'
    }
  },
  category: {
    type: String,
    enum: ['development', 'design', 'marketing', 'seo', 'content', 'consulting'],
    required: true
  },
  processSteps: [{
    number: String,
    title: String,
    description: String,
    duration: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  testimonials: [{
    name: String,
    company: String,
    text: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    image: String
  }],
  order: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug before saving
serviceSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Service', serviceSchema);
