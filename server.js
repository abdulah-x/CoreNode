import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import internRoutes from './routes/internRoutes.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/intern-tracker';

// Configure Mongoose for serverless
mongoose.set('strictQuery', false);
mongoose.set('bufferCommands', false);

// Connect to MongoDB
let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas');
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB connection failed:', error);
    res.status(503).json({
      error: 'Database connection failed',
      message: 'Unable to connect to the database. Please check your MongoDB connection string.'
    });
  }
});

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite default
  'https://corenode-frontend.vercel.app', // Production frontend
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(null, true); // Allow all for now to debug
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/interns', internRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: dbStatus
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND'
    }
  });
});

// Centralized error handling middleware (must be last)
app.use(errorHandler);

// Start server only in non-Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });
}

// Export for Vercel
export default app;
