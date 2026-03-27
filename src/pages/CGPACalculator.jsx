import { useState } from 'react';
import './CGPACalculator.css';

function CGPACalculator() {
  const [programmeType, setProgrammeType] = useState('Undergraduate');
  const [courses, setCourses] = useState([
    { name: '', unit: '', grade: '' },
    { name: '', unit: '', grade: '' },
    { name: '', unit: '', grade: '' },
  ]);

  const addRow = () => setCourses([...courses, { name: '', unit: '', grade: '' }]);
  const clearAll = () => setCourses([{ name: '', unit: '', grade: '' }]);

  return (
    <div className="cgpa-page">
      <div className="cgpa-main-content">
        {/* Header */}
        <div className="cgpa-header">
          <h1 className="cgpa-title">CGPA Calculator</h1>
          <p className="cgpa-desc">
            Project your academic future. Input your course units and estimated grades to calculate your semester GPA and overall cumulative standing.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="cgpa-card">
          <div className="cgpa-config-row">
            <div className="cgpa-config-item">
              <span className="cgpa-config-label">PROGRAMME TYPE:</span>
              <div className="cgpa-toggle-group">
                <button
                  className={`cgpa-toggle-btn ${programmeType === 'Undergraduate' ? 'active' : ''}`}
                  onClick={() => setProgrammeType('Undergraduate')}
                >
                  Undergraduate
                </button>
                <button
                  className={`cgpa-toggle-btn ${programmeType === 'Postgraduate' ? 'active' : ''}`}
                  onClick={() => setProgrammeType('Postgraduate')}
                >
                  Postgraduate
                </button>
              </div>
            </div>
            <div className="cgpa-config-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Grading scale: 5.0 (UG) / 7.0 or Distinction (PG)</span>
            </div>
          </div>

          <div className="cgpa-section-header">
            <div className="cgpa-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              Semester Performance
            </div>
            <button className="cgpa-load-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Load Previous Data
            </button>
          </div>

          <div className="cgpa-table-labels">
            <span>COURSE NAME</span>
            <span>UNIT LOAD</span>
            <span>GRADE / SCALE</span>
          </div>

          <div className="cgpa-course-list">
            {courses.map((course, idx) => (
              <div key={idx} className="cgpa-course-row">
                <input
                  type="text"
                  placeholder="e.g. Advanced Calculus (MTH 201)"
                  className="cgpa-input-name"
                />
                <select className="cgpa-select">
                  <option value="">Select Unit</option>
                  <option value="1">1 Unit</option>
                  <option value="2">2 Units</option>
                  <option value="3">3 Units</option>
                  <option value="4">4 Units</option>
                </select>
                <select className="cgpa-select">
                  <option value="">Select Grade</option>
                  <option value="5">A (5.0)</option>
                  <option value="4">B (4.0)</option>
                  <option value="3">C (3.0)</option>
                </select>
              </div>
            ))}
          </div>

          <div className="cgpa-actions">
            <button className="cgpa-add-btn" onClick={addRow}>
              <span>+</span> Add Course Row
            </button>
            <button className="cgpa-clear-btn" onClick={clearAll}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Clear All
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="cgpa-info-box">
          <div className="cgpa-info-icon">i</div>
          <div>
            <h4>How it's calculated</h4>
            <p>
              Our calculator uses the standard 5.0 scale. The Weighted Grade Point (WGP) is calculated by multiplying the unit load by the grade point. Your GPA is the sum of WGP divided by the total units for the semester. <strong>Postgraduate (PG)</strong> calculations may utilize alternative scales (e.g. 7.0 or Pass/Merit/Distinction) based on department guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <aside className="cgpa-side">
        <div className="cgpa-standing-card">
          <div className="cgpa-standing-label">CUMULATIVE STANDING</div>
          <div className="cgpa-standing-value">
            4.82<span className="cgpa-standing-max">/ 5.0</span>
          </div>
          <div className="cgpa-standing-badge">FIRST CLASS / DISTINCTION</div>
          <div className="cgpa-star-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        <div className="cgpa-breakdown-card">
          <h3 className="cgpa-breakdown-title">Result Breakdown</h3>
          
          <div className="cgpa-breakdown-item">
            <div className="cgpa-item-left">
              <span className="cgpa-item-label">SEMESTER GPA</span>
              <span className="cgpa-item-val-large">4.65</span>
            </div>
            <div className="cgpa-item-trend">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
          </div>

          <div className="cgpa-breakdown-item no-border">
            <div className="cgpa-item-row">
              <span className="cgpa-item-label">ACADEMIC LOAD</span>
              <span className="cgpa-item-val">18 / 22 Units</span>
            </div>
            <div className="cgpa-progress-track">
              <div className="cgpa-progress-fill" style={{ width: '82%' }} />
            </div>
          </div>

          <div className="cgpa-breakdown-footer">
            <div className="cgpa-footer-row">
              <span className="cgpa-footer-label">Total Quality Points</span>
              <span className="cgpa-footer-val">84.0</span>
            </div>
            <div className="cgpa-footer-row">
              <span className="cgpa-footer-label">Target GPA</span>
              <span className="cgpa-footer-val">4.90</span>
            </div>
          </div>
        </div>

        <div className="cgpa-side-actions">
          <button className="cgpa-download-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Estimate (PDF)
          </button>
          <button className="cgpa-share-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share Projection
          </button>
        </div>
      </aside>

      {/* Floating Help */}
      <button className="cgpa-help-fab">?</button>
    </div>
  );
}

export default CGPACalculator;
