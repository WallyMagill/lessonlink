/**
 * Database Configuration
 * 
 * MongoDB connection setup and configuration:
 * 
 * Features:
 * - Connection string management
 * - Connection options
 * - Error handling
 * - Reconnection logic
 * - Connection pooling
 * 
 * Environment Variables:
 * - MONGODB_URI: Database connection string
 * - DB_NAME: Database name
 * - DB_USER: Database user
 * - DB_PASS: Database password
 */

import mongoose from 'mongoose';
import { config } from './env.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 