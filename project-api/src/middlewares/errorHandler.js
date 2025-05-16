/**
 * Error Handling Middleware
 * 
 * Centralized error handling for the API:
 * 
 * Functions:
 * - errorHandler: Global error handler
 * - notFound: 404 handler
 * - validationError: Input validation errors
 * - asyncHandler: Async error wrapper
 * 
 * Features:
 * - Error logging
 * - Response formatting
 * - Status code mapping
 * - Development/Production modes
 */

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default errorHandler; 