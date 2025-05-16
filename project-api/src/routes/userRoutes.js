import express from 'express';
import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User routes
router.get('/', verifyToken, checkRole(['admin']), (req, res) => {
  // TODO: Implement get all users logic
  res.json({ message: 'Get all users route' });
});

router.get('/:id', verifyToken, (req, res) => {
  // TODO: Implement get user by id logic
  res.json({ message: 'Get user by id route' });
});

router.put('/:id', verifyToken, (req, res) => {
  // TODO: Implement update user logic
  res.json({ message: 'Update user route' });
});

router.delete('/:id', verifyToken, checkRole(['admin']), (req, res) => {
  // TODO: Implement delete user logic
  res.json({ message: 'Delete user route' });
});

export default router; 