import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  isQuote: {
    type: Boolean,
    default: false
  },
  projectType: {
    type: String,
    enum: {
      values: ['web', 'mobile', 'design', 'seo', 'social-media', 'video', 'other'],
      message: '{VALUE} is not a valid project type'
    },
    required: function() {
      return this.isQuote;
    },
    default: undefined
  },
  budget: {
    type: String,
    required: function() {
      return this.isQuote;
    },
    default: undefined
  },
  deadline: {
    type: String,
    required: function() {
      return this.isQuote;
    },
    default: undefined
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema);
