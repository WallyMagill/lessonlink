/**
 * Environment Configuration
 * 
 * Environment variable management and validation:
 * 
 * Features:
 * - Environment variable loading
 * - Configuration validation
 * - Default values
 * - Environment-specific settings
 * 
 * Required Variables:
 * - NODE_ENV: Development/Production mode
 * - PORT: Server port
 * - JWT_SECRET: JWT signing key
 * - MONGODB_URI: Database connection
 * - CORS_ORIGIN: Allowed origins
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['NODE_ENV', 'PORT', 'JWT_SECRET', 'MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Export configuration
export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3001,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN || '*',
}; 