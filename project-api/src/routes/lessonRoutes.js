import express from 'express';
import { verifyToken, checkRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Lesson routes
router.get('/', (req, res) => {
  // TODO: Implement get all lessons logic
  res.json({ message: 'Get all lessons route' });
});

router.get('/:id', (req, res) => {
  // TODO: Implement get lesson by id logic
  res.json({ message: 'Get lesson by id route' });
});

router.post('/', verifyToken, checkRole(['teacher', 'admin']), (req, res) => {
  // TODO: Implement create lesson logic
  res.json({ message: 'Create lesson route' });
});

router.put('/:id', verifyToken, checkRole(['teacher', 'admin']), (req, res) => {
  // TODO: Implement update lesson logic
  res.json({ message: 'Update lesson route' });
});

router.delete('/:id', verifyToken, checkRole(['teacher', 'admin']), (req, res) => {
  // TODO: Implement delete lesson logic
  res.json({ message: 'Delete lesson route' });
});

export default router; 