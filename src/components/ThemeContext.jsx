import React, {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = useMemo(() => ({
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? 'gray.800' : 'gray.50',
      cardBg: isDarkMode ? 'gray.700' : 'white',
      text: isDarkMode ? 'white' : 'gray.800',
      border: isDarkMode ? 'gray.600' : 'gray.200',
      hover: isDarkMode ? 'gray.600' : 'gray.100',
      modalBg: isDarkMode ? 'gray.700' : 'white',
      inputBg: isDarkMode ? 'gray.600' : 'white',
      sidebarBg: isDarkMode ? 'gray.700' : 'gray.100',
    },
  }), [isDarkMode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
