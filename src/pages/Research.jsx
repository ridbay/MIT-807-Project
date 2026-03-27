import { useAppContext } from '../context/AppContext';
import './Research.css';

const milestones = [
  { id: 1, title: 'Thesis Proposal', date: 'Sept 12, 2023', status: 'COMPLETED', detail: 'Approved by PG Committee' },
  { id: 2, title: 'Literature Review', date: 'Oct 28, 2023', status: 'COMPLETED', detail: 'Verified by Supervisor' },
  { id: 3, title: 'Data Collection', date: 'Dec 15, 2023', status: 'IN_PROGRESS', detail: 'Field work underway' },
  { id: 4, title: 'Analysis & Discussion', date: 'TBD', status: 'PENDING', detail: 'Awaiting data completion' },
  { id: 5, title: 'Final Defense', date: 'May 2024', status: 'PENDING', detail: 'Scheduled for Summer Session' },
];

function Research() {
  const { user } = useAppContext();

  return (
    <div className="res-page researcher-view">
      <div className="res-header">
        <div className="res-title-block">
          <div className="res-subtitle">RESEARCH & DISSERTATION</div>
          <h1 className="res-title">Graduate Research Tracking</h1>
          <p className="res-desc">
            Monitor your research milestones, track supervisor feedback, and manage your dissertation progress for <strong>MSc Computer Science</strong>.
          </p>
        </div>
        <div className="res-top-stats">
          <div className="res-stat-card res-stat-card--dark">
             <div className="res-stat-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                   <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                   <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
             </div>
             <div className="res-stat-content">
                <div className="res-stat-label">RESEARCH CREDITS</div>
                <div className="res-stat-value">12 / 18</div>
             </div>
          </div>
          <div className="res-stat-card">
             <div className="res-stat-icon-wrapper res-stat-icon-wrapper--white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                   <polyline points="20 6 9 17 4 12" />
                </svg>
             </div>
             <div className="res-stat-content">
                <div className="res-stat-label">COMPLETION</div>
                <div className="res-stat-value">67%</div>
             </div>
          </div>
        </div>
      </div>

      <div className="res-research-grid">
        {/* Milestone Timeline */}
        <section className="res-timeline-card">
          <h2 className="res-card-title">Project Milestones</h2>
          <div className="res-timeline">
            {milestones.map((m) => (
              <div key={m.id} className={`res-timeline-item res-timeline-item--${m.status.toLowerCase()}`}>
                <div className="res-timeline-node">
                  {m.status === 'COMPLETED' && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="res-timeline-content">
                  <div className="res-timeline-header">
                    <h3>{m.title}</h3>
                    <span className="res-timeline-date">{m.date}</span>
                  </div>
                  <p className="res-timeline-detail">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supervisor Card */}
        <aside className="res-supervisor-card">
           <h2 className="res-card-title">Assigned Supervisor</h2>
           <div className="res-sup-info">
              <div className="res-sup-avatar">DR</div>
              <div>
                 <h3>Dr. Sarah Rodriguez</h3>
                 <p>Senior Lecturer, CS Dept.</p>
              </div>
           </div>
           <div className="res-sup-actions">
              <button className="res-sup-btn">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                 </svg>
                 Message Supervisor
              </button>
              <button className="res-sup-btn">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20v-6M9 17l3 3 3-3M9 7l3-3 3 3M12 4v6" />
                 </svg>
                 Upload Document
              </button>
           </div>
           <div className="res-recent-feedback">
              <h4>LATEST FEEDBACK</h4>
              <p>"Excellent progress on the literature review. Please ensure Chapter 3 aligns with the new requirements report."</p>
              <span className="res-feedback-time">2 DAYS AGO</span>
           </div>
        </aside>
      </div>
    </div>
  );
}

export default Research;
