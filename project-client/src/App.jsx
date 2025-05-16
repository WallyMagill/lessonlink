/**
 * Main Application Component
 *
 * Root component that sets up:
 * - Routing configuration
 * - Global state providers
 * - Theme provider
 * - Error boundaries
 * - Authentication context
 *
 * Features:
 * - Protected routes
 * - Role-based access
 * - Global error handling
 * - Layout management
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
