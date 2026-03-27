import React, { useState } from 'react';
import './AdminPages.css';

const Issuance: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isIssuing, setIsIssuing] = useState(false);
  const [progress, setProgress] = useState(0);

  const candidates = [
    { id: "1", name: "Kennedy Chinedu", prog: "MIT", year: 2026, cgpa: 3.95 },
    { id: "2", name: "Babatunde Ridwan", prog: "MIT", year: 2026, cgpa: 4.25 },
    { id: "3", name: "Chinanu Sonia", prog: "B.Sc CS", year: 2025, cgpa: 4.56 },
    { id: "4", name: "Joshua Boluwade", prog: "B.Sc IT", year: 2024, cgpa: 3.65 }
  ];

  const handleToggle = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleIssue = () => {
    if (selectedIds.length === 0) return;
    setIsIssuing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsIssuing(false);
          setSelectedIds([]);
          alert("Selected Nigerian certificates have been digitally signed & issued!");
          return 100;
        }
        return p + 5;
      });
    }, 80);
  };

  return (
    <div className="admin-page">
      {isIssuing && (
        <div className="admin-progress-overlay">
          <div className="admin-progress-card">
            <h3>Digitally Signing Certificates...</h3>
            <div className="admin-progress-bar">
               <div className="admin-progress-fill" style={{width: `${progress}%`}} />
            </div>
            <p>{progress}% - Generating Nigerian Verification IDs</p>
          </div>
        </div>
      )}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Certificate Issuance</h1>
          <p className="admin-subtitle">Process graduation credentials for confirmed Nigerian students.</p>
        </div>
        <button className="admin-primary-btn" onClick={handleIssue} disabled={selectedIds.length === 0}>
           Batch Authorize
        </button>
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <h3 className="admin-card-title">Eligible Candidates</h3>
          <p className="admin-card-desc">Students who have fulfilled all graduation requirements but haven't received certificates.</p>
          <div className="admin-selection-list">
             {candidates.map(c => (
               <div className="admin-selection-item" key={c.id}>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(c.id)}
                    onChange={() => handleToggle(c.id)}
                  />
                  <div className="admin-selection-info">
                     <div className="admin-selection-name">{c.name}</div>
                     <div className="admin-selection-meta">{c.prog} • {c.year} Graduating Class</div>
                  </div>
                  <div className="admin-selection-stat">CGPA {c.cgpa}</div>
               </div>
             ))}
          </div>
          <button 
            className="admin-primary-btn full-width" 
            style={{marginTop: '1rem'}}
            disabled={selectedIds.length === 0}
            onClick={handleIssue}
          >
            Issue {selectedIds.length} Certificates
          </button>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title">Recent Issuance</h3>
          <div className="admin-mini-list">
             <div className="admin-mini-item">
                <div className="admin-mini-icon cert">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                   </svg>
                </div>
                <div className="admin-mini-info">
                   <div className="admin-mini-name">Adenuga Oluwapelumi</div>
                   <div className="admin-mini-date">Issued Today at 11:24 AM</div>
                </div>
                <div className="admin-status-badge admin-status--active">SIGNED</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issuance;
