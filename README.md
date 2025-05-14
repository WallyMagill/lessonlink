# LessonLink

A platform for teachers to create, edit, share, ensure standards, and organize lesson plans.

## Architecture

### Frontend (project-client)
- React.js with Vite for fast development and building
- TailwindCSS for styling
- React Router for navigation
- Axios for API communication

#### Structure
- `src/`
  - `assets/`: Static assets (images, fonts)
  - `components/`: Reusable UI components
  - `features/`: Feature-specific components and logic
  - `layouts/`: Page layout components
  - `pages/`: Top-level page components
  - `routes/`: React Router configuration
  - `services/`: API service layer
  - `state/`: Global state management
  - `styles/`: Global styles and themes
- `public/`: Static public assets

### Backend (project-api)
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Mongoose for ODM

#### Structure
- `models/`: MongoDB schemas for Users, Lessons, Classes, and Feedback
- `controllers/`: Business logic for handling API requests
- `routes/`: Express route definitions for API endpoints
- `middlewares/`: Authentication and error handling middleware
- `config/`: Database and environment configuration
- `app.js`: Express application setup
- `server.js`: Server entry point

## Setup

### Frontend Setup
```bash
cd project-client
npm install
npm run dev
```

### Backend Setup
```bash
cd project-api
npm install
npm run dev
```

## Development

1. Clone the repository
2. Set up both frontend and backend as described above
3. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Create a pull request to merge your changes

## Deployment

The application will be deployed using:
- Frontend: Render (temporary)
- Backend: Render
- Database: MongoDB Atlas

## Authors

- Annabelle
- Cam
- Neal
- Kalina
- Wally
- Abby

## Acknowledgments

- Dartmouth CS52 Course Staff
- React.js Documentation
- MongoDB Documentation
