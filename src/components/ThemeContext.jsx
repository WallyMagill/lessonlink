import React, {
  createContext, useContext, useState, useEffect, useMemo, useRef,
} from 'react';
import useStore from '../store';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const user = useStore((state) => state.userSlice.current);
  const backendToggleTheme = useStore((state) => state.userSlice.toggleTheme);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const initialized = useRef(false);
  const prevUserId = useRef(null);

  useEffect(() => {
    if (user && user._id !== prevUserId.current) {
      initialized.current = false;
      prevUserId.current = user?._id;
    }
    if (!initialized.current && user && typeof user.theme === 'boolean') {
      setIsDarkMode(user.theme);
      initialized.current = true;
    }
  }, [user]);

  const toggleTheme = async () => {
    setIsDarkMode((prev) => !prev);
    await backendToggleTheme();
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
