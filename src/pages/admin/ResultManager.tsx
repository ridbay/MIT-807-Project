import React, { useState } from 'react';
import './AdminPages.css';

const ResultManager: React.FC = () => {
  const [results, setResults] = useState([
    { code: "CSC 401", dept: "Computer Science", session: "2023/24", count: 86, uploader: "Dr. Adeyemi", status: "PENDING" },
    { code: "MIT 807", dept: "Info. Tech", session: "2023/24", count: 42, uploader: "Prof. Nwachukwu", status: "APPROVED" },
    { code: "SWE 202", dept: "Software Eng.", session: "2023/24", count: 110, uploader: "Dr. Ojo", status: "PENDING" }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const newRes = { 
            code: "GNS 101", 
            dept: "General Studies", 
            session: "2024/25", 
            count: 240, 
            uploader: "Admin - scholarNode", 
            status: "PENDING" 
          };
          setResults([newRes, ...results]);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleApprove = (code: string) => {
    setResults(results.map(r => r.code === code ? { ...r, status: "APPROVED" } : r));
  };

  return (
    <div className="admin-page">
      {isUploading && (
        <div className="admin-progress-overlay">
          <div className="admin-progress-card">
            <h3>Uploading Nigerian Academic Records...</h3>
            <div className="admin-progress-bar">
               <div className="admin-progress-fill" style={{width: `${uploadProgress}%`}} />
            </div>
            <p>{uploadProgress}% Complete - Validating schemas</p>
          </div>
        </div>
      )}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Result Manager</h1>
          <p className="admin-subtitle">Upload, approve, and manage official semester results.</p>
        </div>
        <div className="admin-header-actions">
          <button className="admin-secondary-btn">Download Template</button>
          <button className="admin-primary-btn" onClick={handleUpload}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Result CSV
          </button>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Pending Approval</div>
          <div className="admin-stat-value">{results.filter(r => r.status === 'PENDING').length}</div>
          <div className="admin-stat-sub">Requires Registrar verification</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Submission Rate</div>
          <div className="admin-stat-value">92%</div>
          <div className="admin-stat-sub">Session 2023/24 Semester 1</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Verification Rate</div>
          <div className="admin-stat-value">100%</div>
          <div className="admin-stat-sub">All records signed</div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Recent Result Uploads</h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>COURSE</th>
                <th>DEPARTMENT</th>
                <th>SESSION</th>
                <th>RECORDS</th>
                <th>LECTURER</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, idx) => (
                <tr key={idx}>
                  <td><strong>{r.code}</strong></td>
                  <td>{r.dept}</td>
                  <td>{r.session}</td>
                  <td>{r.count}</td>
                  <td>{r.uploader}</td>
                  <td>
                    <span className={`admin-status-badge admin-status--${r.status === 'APPROVED' ? 'active' : 'pending'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    {r.status === 'PENDING' ? (
                      <button className="admin-text-btn" onClick={() => handleApprove(r.code)}>Approve</button>
                    ) : (
                      <button className="admin-text-btn" disabled>View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultManager;
