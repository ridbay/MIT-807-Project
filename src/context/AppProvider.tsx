import React, { useState, useEffect } from 'react';
import { AppContext, AppContextType, User, StudentType } from './AppContext';
import { CourseAttempt } from '../lib/gpa-engine';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark');
  const [user, setUser] = useState<User | null>(null);
  const [studentType, setStudentType] = useState<StudentType>('ug'); 
  const [loading, setLoading] = useState<boolean>(false);
  const [courseRecords, setCourseRecords] = useState<CourseAttempt[]>([]);

  // Example effect
  useEffect(() => {
    console.log('App initialization...');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: AppContextType = {
    theme,
    setTheme,
    toggleTheme,
    user,
    setUser,
    loading,
    setLoading,
    studentType,
    setStudentType,
    courseRecords,
    setCourseRecords,
  };




  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
