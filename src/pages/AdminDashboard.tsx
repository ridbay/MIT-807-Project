import React, { useState } from 'react';
import './AdminDashboard.css';

interface AdminRequest {
  id: string;
  name: string;
  initial: string;
  date: string;
  dept: string;
  level: 'UG' | 'PG';
  status: string;
  statusColor: string;
  action: string;
}

interface AdminAction {
  id: number;
  text: string;
  time: string;
  icon: 'check' | 'alert' | 'mail';
}

const INITIAL_REQUESTS: AdminRequest[] = [
  { id: '#STU-88291', name: 'Oluwaseun Adeyemi', initial: 'OA', date: 'Mar 27, 2026', dept: 'Computer Science', level: 'UG', status: 'IN REVIEW', statusColor: 'gray', action: 'Approve' },
  { id: '#STU-92014', name: 'Chidi Okafor', initial: 'CO', date: 'Mar 26, 2026', dept: 'Architecture', level: 'PG', status: 'URGENT', statusColor: 'red', action: 'Approve (incl. Thesis)' },
  { id: '#STU-87720', name: 'Amaka Nwachukwu', initial: 'AN', date: 'Mar 25, 2026', dept: 'Economics', level: 'UG', status: 'PENDING', statusColor: 'gray', action: 'Approve' },
  { id: '#STU-91003', name: 'Babatunde Raji', initial: 'BR', date: 'Mar 24, 2026', dept: 'Biotechnology', level: 'PG', status: 'PENDING', statusColor: 'gray', action: 'Approve (incl. Thesis)' },
];

const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  
  const handleApprove = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
    // In a real app, this would update a backend
  };

  const adminActions: AdminAction[] = [
    { id: 1, text: 'Registrar Funmi approved 14 transcripts for the Engineering Faculty.', time: '12 MINUTES AGO', icon: 'check' },
    { id: 2, text: 'System detected a mismatched ID for #STU-99011. Flagged for review.', time: '1 HOUR AGO', icon: 'alert' },
    { id: 3, text: 'Admin Dean broadcasted Semester Results to all departments.', time: '3 HOURS AGO', icon: 'mail' },
  ];
  return (
    <div className="adm-page">
      {/* Overview Header */}
      <div className="adm-header">
        <div className="adm-title-block">
          <h1 className="adm-title">Administrative Overview</h1>
          <p className="adm-desc">
            Manage university transcript requests, monitor student registrations, and authorize digital certifications with editorial precision.
          </p>
        </div>
        <div className="adm-header-actions">
           <div className="adm-filter-pills">
              <button className="adm-pill active">All Levels</button>
              <button className="adm-pill">Undergraduate</button>
              <button className="adm-pill">Postgraduate</button>
           </div>
           <button className="adm-btn-report">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Report
           </button>
           <button className="adm-btn-manual">
              <div className="adm-plus-circle">+</div>
              Manual Entry (UG/PG)
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="adm-stats-grid">
         <div className="adm-stat-card adm-stat-card--large">
            <div className="adm-stat-left">
               <div className="adm-stat-label">TOTAL REGISTERED STUDENTS</div>
               <div className="adm-stat-value">14,282</div>
               <div className="adm-stat-footer">
                  <div className="adm-avatar-stack">
                     <div className="adm-av-stack-item teal" />
                     <div className="adm-av-stack-item blue" />
                     <div className="adm-av-stack-item orange" />
                     <div className="adm-av-stack-plus">+12k</div>
                  </div>
                  <span className="adm-stat-trend">+14% increase this semester</span>
               </div>
            </div>
            <div className="adm-stat-icon-bg">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
               </svg>
            </div>
         </div>

         <div className="adm-stat-card adm-stat-card--alert">
            <div className="adm-stat-label">PENDING REQUESTS</div>
            <div className="adm-stat-value">184</div>
            <button className="adm-action-badge">REQUIRES ACTION</button>
         </div>

         <div className="adm-stat-card adm-stat-card--success">
            <div className="adm-stat-label">CERTIFICATES ISSUED</div>
            <div className="adm-stat-value">3,912</div>
            <div className="adm-stat-progress">
               <div className="adm-prog-track">
                  <div className="adm-prog-fill" style={{ width: '85%' }} />
               </div>
               <span className="adm-prog-text">85% of target reached</span>
            </div>
         </div>
      </div>

      {/* Requests Table */}
      <section className="adm-section">
         <div className="adm-section-header">
            <h2 className="adm-section-title">Transcript Requests</h2>
            <div className="adm-table-filters">
               <button className="adm-table-filt-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M4 19h16M4 12h16M4 5h16" />
                  </svg>
                  Programme Level
               </button>
               <button className="adm-table-filt-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                  </svg>
               </button>
               <button className="adm-table-filt-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
               </button>
            </div>
         </div>

         <div className="adm-table-wrap">
            <table className="adm-table">
               <thead>
                  <tr>
                     <th>STUDENT DETAILS</th>
                     <th>REQUEST DATE</th>
                     <th>DEPARTMENT</th>
                     <th>LEVEL</th>
                     <th>STATUS</th>
                     <th>ACTIONS</th>
                  </tr>
               </thead>
                <tbody>
                  {requests.map((req, i) => (
                     <tr key={i}>
                        <td className="adm-td-student">
                           <div className="adm-student-avatar">{req.initial}</div>
                           <div>
                              <div className="adm-student-name">{req.name}</div>
                              <div className="adm-student-id">ID: {req.id}</div>
                           </div>
                        </td>
                        <td className="adm-td-date">{req.date}</td>
                        <td className="adm-td-dept">{req.dept}</td>
                        <td>
                           <span className={`adm-level-badge ad-level--${req.level.toLowerCase()}`}>
                              {req.level}
                           </span>
                        </td>
                        <td>
                           <span className={`adm-status-tag ad-status--${req.statusColor}`}>
                              {req.status}
                           </span>
                        </td>
                        <td className="adm-td-actions">
                           <button className="adm-action-approve" onClick={() => handleApprove(req.id)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                 <polyline points="22 4 12 14.01 9 11.01" />
                               </svg>
                               {req.action}
                           </button>
                           <button className="adm-action-reject" onClick={() => handleApprove(req.id)}>Reject</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="adm-pagination">
            <span>Showing {requests.length} of 184 pending Nigerian institutional requests</span>
            <div className="adm-pag-controls">
               <button className="adm-pag-arrow">‹</button>
               <button className="adm-pag-arrow">›</button>
            </div>
         </div>
      </section>

      {/* Bottom Grid */}
      <div className="adm-bottom-grid">
         {/* Accuracy Chart */}
         <div className="adm-card adm-card--chart">
            <h3 className="adm-card-title">Annual Records Accuracy</h3>
            <div className="adm-chart-container">
               <div className="adm-donut">
                  <div className="adm-donut-center">
                     <span className="adm-donut-val">99.8%</span>
                  </div>
               </div>
               <div className="adm-chart-legend">
                  <div className="adm-legend-item">
                     <span className="adm-leg-dot teal" />
                     <div>
                        <div className="adm-leg-label">Verified Data Points</div>
                        <div className="adm-leg-sub">1.2M points checked this quarter</div>
                     </div>
                  </div>
                  <div className="adm-legend-item">
                     <span className="adm-leg-dot blue" />
                     <div>
                        <div className="adm-leg-label">Automation Rate</div>
                        <div className="adm-leg-sub">72% of records auto-validated</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Admin Actions */}
         <div className="adm-card adm-card--actions">
            <h3 className="adm-card-title">Recent Admin Actions</h3>
            <div className="adm-actions-list">
               {adminActions.map((act) => (
                  <div className="adm-action-row" key={act.id}>
                     <div className="adm-action-icon-wrap">
                        {act.icon === 'check' && (
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M20 6L9 17l-5-5" />
                           </svg>
                        )}
                        {act.icon === 'alert' && (
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                           </svg>
                        )}
                        {act.icon === 'mail' && (
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                           </svg>
                        )}
                     </div>
                     <div className="adm-action-body">
                        <div className="adm-action-text">{act.text}</div>
                        <div className="adm-action-time">{act.time}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
