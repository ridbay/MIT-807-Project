import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);
  const [studentType, setStudentType] = useState('ug'); // 'ug' or 'pg'
  const [loading, setLoading] = useState(false);

  // Example effect
  useEffect(() => {
    console.log('App initialization...');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    user,
    setUser,
    loading,
    setLoading,
    studentType,
    setStudentType,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
