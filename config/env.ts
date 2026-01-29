console.log(" config env");
import dotenv from 'dotenv';

// Try to load .env file for local development
// This will fail silently in production (Railway)
try {
  dotenv.config();
  console.log('📁 Loaded .env file for local development');
} catch (error) {
  // Silently continue - Railway provides env vars directly
}

export const PORT = parseInt(process.env.PORT || '3000', 10);
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crud_app';
export const JWT_SECRET = process.env.JWT_SECRET || 'local_dev_secret';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';