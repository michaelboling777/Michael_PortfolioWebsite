import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  // Initialize dark mode state from localStorage, defaulting to true if no saved preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    // Parse the saved value or default to true if nothing is saved
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    // Persist the current preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
      // Update the HTML document class to reflect current mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Return the current state and setter function
  return [darkMode, setDarkMode];
};