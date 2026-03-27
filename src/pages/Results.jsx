import { useAppContext } from '../context/AppContext';
import './Results.css';

const courses = [
  { code: 'CSC 401', title: 'Advanced Distributed Computing Systems', unit: '4.0', grade: 'A', points: '20.0' },
  { code: 'MAT 415', title: 'Numerical Analysis and Optimization', unit: '3.0', grade: 'A', points: '15.0' },
  { code: 'CSC 405', title: 'Human Computer Interaction Design', unit: '3.0', grade: 'B', points: '12.0' },
  { code: 'SEN 402', title: 'Software Architecture & Cloud Patterns', unit: '4.0', grade: 'A', points: '20.0' },
  { code: 'GNS 401', title: 'Entrepreneurship & Ethical Leadership', unit: '2.0', grade: 'A', points: '10.0' },
];

function Results() {
  const { studentType } = useAppContext();

  const currentCourses = studentType === 'pg' 
    ? [
        { code: 'CSC 801', title: 'Advanced Machine Learning & Neural Networks', unit: '4.0', grade: 'A', points: '20.0' },
        { code: 'MIT 805', title: 'Enterprise Architecture & Cloud Strategy', unit: '3.0', grade: 'A', points: '15.0' },
        { code: 'CSC 812', title: 'Big Data Analytics & Data Mining', unit: '3.0', grade: 'B', points: '12.0' },
        { code: 'RES 901', title: 'Research Methodology & Technical Writing', unit: '4.0', grade: 'A', points: '20.0' },
      ]
    : [
        { code: 'CSC 401', title: 'Advanced Distributed Computing Systems', unit: '4.0', grade: 'A', points: '20.0' },
        { code: 'MAT 415', title: 'Numerical Analysis and Optimization', unit: '3.0', grade: 'A', points: '15.0' },
        { code: 'CSC 405', title: 'Human Computer Interaction Design', unit: '3.0', grade: 'B', points: '12.0' },
        { code: 'SEN 402', title: 'Software Architecture & Cloud Patterns', unit: '4.0', grade: 'A', points: '20.0' },
        { code: 'GNS 401', title: 'Entrepreneurship & Ethical Leadership', unit: '2.0', grade: 'A', points: '10.0' },
      ];
  return (
    <div className="res-page">
      {/* Header Section */}
      <div className="res-header">
        <div className="res-title-block">
          <div className="res-subtitle">ACADEMIC PORTFOLIO</div>
          <h1 className="res-title">Result Transcripts</h1>
          <p className="res-desc">
            {studentType === 'pg' 
              ? 'Track your programme-based progress, coursework modules, and research milestones in real-time.'
              : 'View your historical performance, analyze semester trends, and export verified records for external processing.'
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
              <div className="res-stat-value">{studentType === 'pg' ? '4.88' : '3.82'}</div>
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
              <div className="res-stat-value">124</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="res-filters-card">
        <div className="res-filter-group">
          <label className="res-filter-label">{studentType === 'pg' ? 'PROGRAMME TYPE' : 'ACADEMIC SESSION'}</label>
          <select className="res-filter-select">
            <option>{studentType === 'pg' ? 'MSc Computer Science' : '2023 / 2024 Academic Year'}</option>
          </select>
        </div>
        <div className="res-filter-divider" />
        <div className="res-filter-group">
          <label className="res-filter-label">{studentType === 'pg' ? 'COURSEWORK MODULE' : 'CURRENT SEMESTER'}</label>
          <select className="res-filter-select">
            <option>{studentType === 'pg' ? 'Core Coursework - Tier 1' : 'First Semester'}</option>
          </select>
        </div>
        <div className="res-filter-actions">
          <button className="res-apply-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="2" y1="14" x2="6" y2="14" />
              <line x1="10" y1="8" x2="14" y2="8" />
              <line x1="18" y1="16" x2="22" y2="16" />
            </svg>
            Apply View
          </button>
          <button className="res-pdf-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            PDF
          </button>
        </div>
      </div>

      {/* Results Table Section */}
      <div className="res-table-container">
        <table className="res-table">
          <thead>
            <tr>
              <th>COURSE CODE</th>
              <th>COURSE TITLE</th>
              <th>UNIT</th>
              <th>GRADE</th>
              <th>GPA POINTS</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((c, i) => (
              <tr key={i}>
                <td className="res-td-code">{c.code}</td>
                <td className="res-td-title">{c.title}</td>
                <td>{c.unit}</td>
                <td>
                  <span className={`res-grade-badge res-grade-badge--${c.grade.toLowerCase()}`}>
                    {c.grade}
                  </span>
                </td>
                <td className="res-td-points">{c.points}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Semester Summary Footer */}
        <div className="res-summary-footer">
          <div className="res-summary-item">
            <span className="res-summary-val">16.0</span>
            <span className="res-summary-lab">Units</span>
          </div>
          <div className="res-summary-sep" />
          <div className="res-summary-item">
            <span className="res-summary-lab">AVERAGE</span>
            <span className="res-summary-val">4.81</span>
          </div>
          <div className="res-summary-sep" />
          <div className="res-summary-item">
            <span className="res-summary-lab">CLASSIFICATION</span>
            <span className="res-summary-val">Pass with Distinction</span>
          </div>
          <div className="res-summary-sep" />
          <div className="res-summary-item">
            <span className="res-summary-lab">TOTAL POINTS</span>
            <span className="res-summary-val">77.0</span>
          </div>
        </div>

        {/* Pagination */}
        <div className="res-pagination">
          <span className="res-pag-info">Showing 1 to 5 of 18 courses</span>
          <div className="res-pag-controls">
            <button className="res-pag-btn">‹</button>
            <button className="res-pag-btn res-pag-btn--active">1</button>
            <button className="res-pag-btn">2</button>
            <button className="res-pag-btn">3</button>
            <button className="res-pag-btn">›</button>
          </div>
        </div>
      </div>

      {/* Bottom Info Cards */}
      <div className="res-bottom-grid">
        <div className="res-info-card">
          <div className="res-info-icon res-info-icon--blue">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <h3 className="res-info-title">Progress Velocity</h3>
          <p className="res-info-text">
            Your GPA has increased by 0.12 points since the last academic session. Keep up the technical focus.
          </p>
        </div>
        <div className="res-info-card">
          <div className="res-info-icon res-info-icon--teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          </div>
          <h3 className="res-info-title">Grade Distribution</h3>
          <div className="res-dist-row">
            <span>As</span>
            <span>78%</span>
          </div>
          <div className="res-dist-track">
            <div className="res-dist-fill" style={{ width: '78%' }} />
          </div>
        </div>
        <div className="res-info-card">
          <div className="res-info-icon res-info-icon--red">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <h3 className="res-info-title">Alerts</h3>
          <p className="res-info-text">
            Final project defense documentation is due in <span className="res-text-red">14 days</span>.
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="res-fab">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
        </svg>
        Print Record
      </button>
    </div>
  );
}

export default Results;
