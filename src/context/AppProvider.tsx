import React, { useState, useEffect } from 'react';
import { AppContext, AppContextType, User, StudentType } from './AppContext';
import { CourseAttempt } from '../lib/gpa-engine';
import { seedCourseRecords } from '../lib/data-seeding';
import { STUDENTS } from '../data/students';

const STORAGE_KEY = 'mit817_academic_records_v1';
const USER_STORAGE_KEY = 'mit817_user_session_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark');
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [studentType, setStudentType] = useState<StudentType>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.role === 'student' ? (parsed.programme === 'MIT' || parsed.programme === 'MSC' || parsed.programme === 'PHD' ? 'pg' : 'ug') : 'ug';
    }
    return 'ug';
  }); 
  const [loading, setLoading] = useState<boolean>(false);
  const [courseRecords, setCourseRecords] = useState<CourseAttempt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [verifiedCertificates, setVerifiedCertificates] = useState<string[]>(() => {
    const saved = localStorage.getItem('mit817_verified_certs_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      // Update studentType based on user programme
      if (user.role === 'student') {
        const isPg = user.programmeName?.includes('M.Sc') || 
                     user.programmeName?.includes('MIT') || 
                     user.programmeName?.includes('Ph.D') ||
                     user.programmeName?.includes('PGD');
        setStudentType(isPg ? 'pg' : 'ug');
      }
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  // Persist courseRecords to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courseRecords));
  }, [courseRecords]);

  // Seed data for new users
  useEffect(() => {
    if (user && user.role === 'student' && courseRecords.length === 0) {
      const studentData = STUDENTS.find(s => s.matric === user.matric);
      if (studentData) {
        const seeded = seedCourseRecords(studentData);
        setCourseRecords(seeded);
      }
    }
  }, [user]);

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
    verifiedCertificates,
    setVerifiedCertificates,
  };




  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
