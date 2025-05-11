# LessonLink API

This is the backend API for the LessonLink platform, a modern web application designed to streamline lesson planning for K-12 educators.

## Project Structure

- `models/`: MongoDB schemas for Users, Lessons, Classes, and Feedback
- `controllers/`: Business logic for handling API requests
- `routes/`: Express route definitions for API endpoints
- `middlewares/`: Authentication and error handling middleware
- `config/`: Database and environment configuration
- `app.js`: Express application setup
- `server.js`: Server entry point

## Setup Instructions

1. Install dependencies: `npm install`
2. Create a `.env` file with required environment variables
3. Start the development server: `npm run dev`

## API Endpoints

- `/api/auth`: Authentication routes (login, register)
- `/api/users`: User management routes
- `/api/lessons`: Lesson plan CRUD operations
- `/api/classes`: Class management routes
- `/api/feedback`: Substitute feedback routes

## Development Guidelines

- Follow RESTful API design principles
- Implement proper error handling and validation
- Use JWT for authentication
- Document all API endpoints
- Write tests for critical functionality
