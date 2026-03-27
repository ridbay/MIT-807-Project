import React, { useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { calculateGPA, getUGClassification, getPGStatus, CourseAttempt, getUnitProgress } from '../lib/gpa-engine';
import { PROGRAMME_RULES, ProgrammeType } from '../data/rules';
import UnitProgress from '../components/UnitProgress';
import { exportTranscriptPDF } from '../lib/pdf-export';
import './Results.css';

const Results: React.FC = () => {
  const { studentType, courseRecords, user } = useAppContext();

  const selectedProgramme = (user?.programme || (studentType === 'pg' ? 'MIT' : 'UG-CS')) as ProgrammeType;
  const rules = PROGRAMME_RULES[selectedProgramme];

  // Filter records to only show those belonging to the current programme
  const records = useMemo(() => {
    return courseRecords.filter(r => !r.programmeId || r.programmeId === selectedProgramme);
  }, [courseRecords, selectedProgramme]);
  
  const currentGPA = useMemo(() => calculateGPA(records), [records]);
  const totalUnits = useMemo(() => records.reduce((acc: number, r: CourseAttempt) => acc + r.units, 0), [records]);

  const classification = selectedProgramme === 'UG-CS'
    ? getUGClassification(currentGPA)
    : getPGStatus(currentGPA, rules);

  return (
    <div className="res-page">
      <div className="res-header">
        <div className="res-title-block">
          <div className="res-subtitle">ACADEMIC PORTFOLIO</div>
          <h1 className="res-title">Result Transcripts</h1>
          <p className="res-desc">
            {studentType === 'pg' 
              ? `Tracking ${selectedProgramme} modules and validated academic standing.`
              : 'View your historical performance and verified departmental records.'
            }
          </p>
        </div>
        <div className="res-top-stats">
          <div className="res-stat-card res-stat-card--dark">
            <div className="res-stat-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="res-stat-content">
              <div className="res-stat-label">CUMULATIVE GPA</div>
              <div className="res-stat-value">{currentGPA.toFixed(2)} / 5.0</div>
            </div>
          </div>
          <div className="res-stat-card">
            <div className="res-stat-icon-wrapper res-stat-icon-wrapper--white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="res-stat-content">
              <div className="res-stat-label">UNITS EARNED</div>
              <div className="res-stat-value">{totalUnits}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="res-table-container">
        <table className="res-table">
          <thead>
            <tr>
              <th>COURSE CODE</th>
              <th>UNITS</th>
              <th>GRADE</th>
              <th>SCORE</th>
              <th>GP</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r: CourseAttempt, i: number) => (
              <tr key={i}>
                <td className="res-td-code">{r.courseCode}</td>
                <td>{r.units}.0</td>
                <td>
                  <span className={`res-grade-badge res-grade-badge--${r.grade?.toLowerCase() || 'f'}`}>
                    {r.grade || 'F'}
                  </span>
                </td>
                <td>{r.score || '-'}</td>
                <td className="res-td-points">{(r.units * (r.point || 0)).toFixed(1)}</td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={5} className="res-td-empty">No academic records found. Use the Calculator to projection or update your profile.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="res-summary-footer">
          <div className="res-summary-item">
            <span className="res-summary-val">{totalUnits}.0</span>
            <span className="res-summary-lab">Total Units</span>
          </div>
          <div className="res-summary-sep" />
          <div className="res-summary-item">
            <span className="res-summary-lab">CGPA</span>
            <span className="res-summary-val">{currentGPA.toFixed(2)}</span>
          </div>
          <div className="res-summary-sep" />
          <div className="res-summary-item">
            <span className="res-summary-lab">CLASSIFICATION</span>
            <span className="res-summary-val">{classification}</span>
          </div>
        </div>
      </div>

      <div className="res-bottom-grid">
        <UnitProgress 
          progress={getUnitProgress(records, rules)}
          programmeName={selectedProgramme}
        />
        <div className="res-info-card">
          <div className="res-info-icon res-info-icon--blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <h3 className="res-info-title">Programme Standing</h3>
          <p className="res-info-text">
            Based on {selectedProgramme} rules, your status is currently <strong>{classification}</strong>.
          </p>
        </div>
        <div className="res-info-card">
          <div className="res-info-icon res-info-icon--teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="res-info-title">Graduation Requirement</h3>
          <p className="res-info-text">
            Minimum required: {rules.minUnits || 124} Units. Current: {totalUnits} Units.
          </p>
        </div>
      </div>

      <button 
        className="res-fab" 
        onClick={() => exportTranscriptPDF(user, records, currentGPA)}
        disabled={records.length === 0}
        title={records.length === 0 ? "No records to export" : ""}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
        </svg>
        Export PDF
      </button>
    </div>
  );
};

export default Results;
