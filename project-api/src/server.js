import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api', routes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LessonLink API' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 