/**
 * Application Entry Point
 *
 * Initializes the React application with:
 * - React DOM rendering
 * - Global styles
 * - Development tools
 * - Error tracking
 *
 * Configuration:
 * - Strict mode
 * - Development tools
 * - Performance monitoring
 * - Error reporting
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('main'));
root.render(<App />);
