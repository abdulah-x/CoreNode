import mongoose from 'mongoose';

/**
 * Centralized error handling middleware
 * Returns errors in format: { "error": { "message": "...", "code": "..." } }
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorResponse = {
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }
  };

  // Invalid ObjectId - 400
  if (err instanceof mongoose.Error.CastError && err.kind === 'ObjectId') {
    statusCode = 400;
    errorResponse = {
      error: {
        message: 'Invalid ID format',
        code: 'INVALID_ID'
      }
    };
  }
  // Mongoose Validation Error - 400
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    const messages = Object.values(err.errors).map(e => e.message);
    errorResponse = {
      error: {
        message: messages.join(', '),
        code: 'VALIDATION_ERROR'
      }
    };
  }
  // Duplicate Email (Unique constraint) - 409
  else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern)[0];
    errorResponse = {
      error: {
        message: `An intern with this ${field} already exists`,
        code: 'DUPLICATE_ENTRY'
      }
    };
  }
  // Custom error (if we throw errors with statusCode property)
  else if (err.statusCode) {
    statusCode = err.statusCode;
    errorResponse = {
      error: {
        message: err.message || 'An error occurred',
        code: err.code || 'ERROR'
      }
    };
  }
  // Generic error
  else if (err.message) {
    errorResponse.error.message = err.message;
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
