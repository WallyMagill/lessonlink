/**
 * Authentication Middleware
 * 
 * Handles authentication and authorization:
 * 
 * Functions:
 * - verifyToken: Validate JWT tokens
 * - checkRole: Verify user permissions
 * - requireAuth: Ensure authenticated access
 * - attachUser: Add user to request object
 * 
 * Security Features:
 * - Token validation
 * - Role verification
 * - Session management
 * - Access control
 */

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const checkRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }

  next();
}; 