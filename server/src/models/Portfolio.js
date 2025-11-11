import mongoose from 'mongoose';
import slugify from 'slugify';

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  fullDescription: {
    type: String,
    maxlength: [2000, 'Full description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['web', 'mobile', 'design', 'seo', 'social-media', 'video', 'branding', 'other']
  },
  tags: [String],
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  client: {
    name: String,
    logo: String,
    website: String,
    testimonial: String,
    position: String
  },
  technologies: [String],
  projectUrl: String,
  completionDate: Date,
  duration: String,
  teamSize: Number,
  longDescription: String,
  challenges: String,
  metrics: [{
    label: String,
    value: String,
    icon: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug before saving
portfolioSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Portfolio', portfolioSchema);
