export type ProgrammeCategory = 'UG' | 'PG';
export type ProgrammeType = 'UG-CS' | 'PGC' | 'PGD' | 'MSC' | 'MIT' | 'MPHIL' | 'PHD';

export interface GradeMapping {
  scoreMin: number;
  scoreMax: number;
  grade: string;
  point: number;
}

export const UG_GRADE_MAPPING: GradeMapping[] = [
  { scoreMin: 70, scoreMax: 100, grade: 'A', point: 5.0 },
  { scoreMin: 60, scoreMax: 69, grade: 'B', point: 4.0 },
  { scoreMin: 50, scoreMax: 59, grade: 'C', point: 3.0 },
  { scoreMin: 45, scoreMax: 49, grade: 'D', point: 2.0 },
  { scoreMin: 40, scoreMax: 44, grade: 'E', point: 1.0 },
  { scoreMin: 0, scoreMax: 39, grade: 'F', point: 0.0 },
];

export interface ProgrammeRule {
  programme: ProgrammeType;
  category: ProgrammeCategory;
  minUnits?: number;
  maxUnits?: number;
  minPassPoint: number;
  minPassMark: number;
  withdrawCgpa: number;
  failedUnitLimit?: number; // Failing more than this means failed whole year/programme
}

export const PROGRAMME_RULES: Record<ProgrammeType, ProgrammeRule> = {
  'UG-CS': {
    programme: 'UG-CS',
    category: 'UG',
    minUnits: 128, // 4-year default
    minPassPoint: 1.0,
    minPassMark: 40,
    withdrawCgpa: 1.0,
  },
  'PGD': {
    programme: 'PGD',
    category: 'PG',
    minUnits: 16,
    maxUnits: 24,
    minPassPoint: 1.0,
    minPassMark: 40,
    withdrawCgpa: 1.5,
  },
  'MSC': {
    programme: 'MSC',
    category: 'PG',
    minUnits: 24,
    maxUnits: 30,
    minPassPoint: 1.0,
    minPassMark: 40,
    withdrawCgpa: 1.5,
    failedUnitLimit: 6,
  },
  'MIT': {
    programme: 'MIT',
    category: 'PG',
    minUnits: 36,
    maxUnits: 54,
    minPassPoint: 1.0,
    minPassMark: 40,
    withdrawCgpa: 1.5,
    failedUnitLimit: 9,
  },
  'MPHIL': {
    programme: 'MPHIL',
    category: 'PG',
    minUnits: 6,
    minPassPoint: 2.0,
    minPassMark: 45,
    withdrawCgpa: 2.0,
  },
  'PHD': {
    programme: 'PHD',
    category: 'PG',
    minUnits: 6,
    minPassPoint: 2.0,
    minPassMark: 45,
    withdrawCgpa: 2.0,
  },
  'PGC': {
    programme: 'PGC',
    category: 'PG',
    minUnits: 6,
    maxUnits: 12,
    minPassPoint: 1.0,
    minPassMark: 40,
    withdrawCgpa: 1.5,
  }
};
