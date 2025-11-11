import mongoose from 'mongoose';
import slugify from 'slugify';

// Phase 2: Job model for recruitment platform
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description']
  },
  requirements: [String],
  responsibilities: [String],
  skills: [String],
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['development', 'design', 'marketing', 'sales', 'management', 'support', 'other']
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    required: true
  },
  location: {
    city: String,
    country: {
      type: String,
      default: 'Sénégal'
    },
    remote: {
      type: Boolean,
      default: false
    }
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'FCFA'
    },
    period: {
      type: String,
      enum: ['hour', 'month', 'year'],
      default: 'month'
    },
    negotiable: {
      type: Boolean,
      default: true
    }
  },
  experience: {
    min: Number,
    max: Number,
    unit: {
      type: String,
      enum: ['years', 'months'],
      default: 'years'
    }
  },
  education: {
    type: String,
    enum: ['none', 'high-school', 'bachelor', 'master', 'phd'],
    default: 'bachelor'
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed', 'filled'],
    default: 'draft'
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create slug before saving
jobSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Job', jobSchema);
