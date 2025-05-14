import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import lessonRoutes from './lessonRoutes.js';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/lessons', lessonRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'Hello from LessonLink API!' });
});

export default router; 