import { createContext, Dispatch, SetStateAction } from 'react';
import { ProgrammeType } from '../data/rules';
import { CourseAttempt } from '../lib/gpa-engine';

export type StudentType = 'ug' | 'pg';

export interface User {
  id?: string;
  name: string;
  email?: string;
  role: 'student' | 'admin';
  matric?: string;
  programmeName?: string;
  programme?: ProgrammeType;
  level?: string | number;
  department?: string;
  cgpa?: number;
  gradYear?: number;
  status?: string;
  needsResearch?: boolean;
}

export interface AppContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  toggleTheme: () => void;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  studentType: StudentType;
  setStudentType: Dispatch<SetStateAction<StudentType>>;
  courseRecords: CourseAttempt[];
  setCourseRecords: Dispatch<SetStateAction<CourseAttempt[]>>;
  verifiedCertificates: string[];
  setVerifiedCertificates: Dispatch<SetStateAction<string[]>>;
}




export const AppContext = createContext<AppContextType | undefined>(undefined);

