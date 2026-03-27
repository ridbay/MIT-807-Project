import { ProgrammeRule, GradeMapping, UG_GRADE_MAPPING, PROGRAMME_RULES } from '../data/rules';

export interface CourseAttempt {
  courseCode: string;
  courseTitle?: string;
  units: number;
  score?: number;
  grade?: string;
  point?: number;
  semesterId: string;
}

export interface CalculationResult {
  gpa: number;
  cgpa: number;
  totalUnits: number;
  totalPoints: number;
  academicStanding: string;
  classification?: string;
}

export const scoreToGrade = (score: number, mapping: GradeMapping[] = UG_GRADE_MAPPING): GradeMapping | undefined => {
  return mapping.find(m => score >= m.scoreMin && score <= m.scoreMax);
};

export const gradeToPoint = (grade: string, mapping: GradeMapping[] = UG_GRADE_MAPPING): number => {
  const found = mapping.find(m => m.grade === grade);
  return found ? found.point : 0;
};

export const calculateGPA = (attempts: CourseAttempt[]): number => {
  let totalUnits = 0;
  let totalPoints = 0;

  attempts.forEach(attempt => {
    if (attempt.point !== undefined) {
      totalUnits += attempt.units;
      totalPoints += (attempt.units * attempt.point);
    }
  });

  return totalUnits === 0 ? 0 : totalPoints / totalUnits;
};

export const getUGClassification = (cgpa: number): string => {
  if (cgpa >= 4.50) return 'First Class';
  if (cgpa >= 3.50) return 'Second Class Upper';
  if (cgpa >= 2.40) return 'Second Class Lower';
  if (cgpa >= 1.50) return 'Third Class';
  if (cgpa >= 1.00) return 'Pass';
  return 'Fail';
};

export const getPGStatus = (cgpa: number, rule: ProgrammeRule): string => {
  if (cgpa >= 4.50) return 'Pass with Distinction';
  if (cgpa >= rule.minPassPoint) return 'Pass'; // e.g. 2.40 for MSc relative to distinction, but MPhil/PhD use 2.0
  if (cgpa < rule.withdrawCgpa) return 'Withdraw';
  return 'Below Requirement';
};
export const calculateEarnedUnits = (attempts: CourseAttempt[]): number => {
  return attempts.reduce((acc, current) => {
    return current.grade !== 'F' && current.point !== undefined && current.point > 0 
      ? acc + current.units 
      : acc;
  }, 0);
};

export interface UnitProgressResult {
  earned: number;
  required: number;
  remaining: number;
  percentage: number;
}

export const getUnitProgress = (attempts: CourseAttempt[], rule: ProgrammeRule): UnitProgressResult => {
  const earned = calculateEarnedUnits(attempts);
  const required = rule.minUnits || 124; // Default to 124 for UG if not specified
  const remaining = Math.max(0, required - earned);
  const percentage = Math.min(100, (earned / required) * 100);

  return { earned, required, remaining, percentage };
};
