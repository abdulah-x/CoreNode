import mongoose from 'mongoose';

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters long'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['Frontend', 'Backend', 'Fullstack'],
        message: '{VALUE} is not a valid role'
      }
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Applied', 'Interviewing', 'Hired', 'Rejected'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Applied'
    },
    score: {
      type: Number,
      min: [0, 'Score must be at least 0'],
      max: [100, 'Score must be at most 100'],
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for search performance
internSchema.index({ name: 'text', email: 'text' });

const Intern = mongoose.model('Intern', internSchema);

export default Intern;
