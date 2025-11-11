import mongoose from 'mongoose';
import slugify from 'slugify';

// Phase 2: Course model for e-learning platform
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
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
    required: [true, 'Please provide a full description']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['web-development', 'mobile-development', 'design', 'marketing', 'seo', 'social-media', 'video-editing', 'other']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  thumbnail: {
    type: String,
    required: [true, 'Please provide a thumbnail']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  duration: {
    hours: Number,
    minutes: Number
  },
  lessons: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    videoUrl: {
      type: String,
      required: true
    },
    duration: {
      minutes: Number
    },
    order: {
      type: Number,
      required: true
    },
    resources: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['pdf', 'video', 'link', 'file']
      }
    }]
  }],
  requirements: [String],
  whatYouWillLearn: [String],
  tags: [String],
  language: {
    type: String,
    default: 'fr'
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  certificate: {
    enabled: {
      type: Boolean,
      default: true
    },
    template: String
  }
}, {
  timestamps: true
});

// Create slug before saving
courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Course', courseSchema);
