import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Get the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the app wrapped in BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
