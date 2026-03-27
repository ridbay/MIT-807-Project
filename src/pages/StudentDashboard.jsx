import './StudentDashboard.css';

const records = [
  {
    id: 1,
    icon: 'doc',
    title: 'Thesis Proposal Approved: AI in Healthcare',
    description: 'Your research methodology has been vetted and approved by the PG Committee.',
    status: 'APPROVED',
    time: '3 HOURS AGO',
    statusColor: 'green',
  },
  {
    id: 2,
    icon: 'doc-teal',
    title: 'Grade Published: Advanced Machine Learning (CSC 801)',
    description: 'The Professional Elective certification is available for download.',
    status: null,
    time: 'YESTERDAY',
    badge: 'download',
  },
  {
    id: 3,
    icon: 'card',
    title: 'Transcript Processing Fee Received',
    description: 'Payment confirmed for Official Transcript request (Destination: MIT).',
    status: null,
    time: 'OCT 24',
    badge: 'check',
  },
];

function RecordIcon({ icon }) {
  if (icon === 'doc')
    return (
      <div className="sd-record-icon sd-record-icon--blue">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
    );
  if (icon === 'doc-teal')
    return (
      <div className="sd-record-icon sd-record-icon--teal">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
    );
  if (icon === 'card')
    return (
      <div className="sd-record-icon sd-record-icon--gray">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      </div>
    );
  return null;
}

function StudentDashboard() {
  return (
    <>
      {/* Welcome Row */}
      <div className="sd-welcome-row">
        <div>
          <h1 className="sd-welcome-title">Welcome, John Doe</h1>
          <div className="sd-welcome-meta">
            <span className="sd-matric-badge">MATRIC: 190405001</span>
            <span className="sd-meta-sep">•</span>
            <span>Faculty of Engineering</span>
            <span className="sd-meta-sep">•</span>
            <span>Postgraduate - MSc Computer Science</span>
          </div>
        </div>
        <div className="sd-session">
          <div className="sd-session-label">CURRENT ACADEMIC SESSION</div>
          <div className="sd-session-value">2023/2024 Autumn Semester</div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="sd-stats">
        {/* CGPA */}
        <div className="sd-stat-card">
          <div className="sd-stat-icon sd-stat-icon--blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6a6 6 0 1 0 6 6A6 6 0 0 0 12 6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
            </svg>
          </div>
          <div className="sd-stat-label">Current CGPA</div>
          <div className="sd-stat-value">4.25</div>
          <div className="sd-stat-sub">SCALE: 5.00 FIRST CLASS HONORS</div>
          <div className="sd-stat-badge sd-stat-badge--teal">+0.12 pts</div>
        </div>

        {/* Research Credits */}
        <div className="sd-stat-card">
          <div className="sd-stat-icon sd-stat-icon--gray">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="sd-stat-label">Research Credits</div>
          <div className="sd-stat-value">12 <span className="sd-stat-value-sub">/ 18</span></div>
          <div className="sd-progress-bar-track">
            <div className="sd-progress-bar-fill" style={{ width: `${(12 / 18) * 100}%` }} />
          </div>
        </div>

        {/* Certificates Issued */}
        <div className="sd-stat-card">
          <div className="sd-stat-icon sd-stat-icon--teal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
          <div className="sd-stat-label">Certificates Issued</div>
          <div className="sd-stat-value">06</div>
          <div className="sd-stat-sub">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="8 17 12 21 16 17" />
              <line x1="12" y1="12" x2="12" y2="21" />
            </svg>
            Last issued 12 days ago
          </div>
        </div>

        {/* Pending Requests */}
        <div className="sd-stat-card">
          <div className="sd-stat-icon sd-stat-icon--red">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          <div className="sd-stat-dot" aria-label="Alert" />
          <div className="sd-stat-label">Pending Requests</div>
          <div className="sd-stat-value">02</div>
          <div className="sd-stat-sub sd-stat-sub--red">
            <span className="sd-dot-inline" aria-hidden="true" />
            Awaiting Dean's Approval
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="sd-bottom-row">
        {/* Recent Academic Records */}
        <section className="sd-records" aria-label="Recent Academic Records">
          <div className="sd-section-header">
            <h2 className="sd-section-title">Recent Academic Records</h2>
            <button className="sd-link-btn" id="view-transcript-btn">View Transcript History</button>
          </div>
          <div className="sd-records-list">
            {records.map((r) => (
              <div className="sd-record-item" key={r.id}>
                <RecordIcon icon={r.icon} />
                <div className="sd-record-body">
                  <div className="sd-record-title">{r.title}</div>
                  <div className="sd-record-desc">{r.description}</div>
                </div>
                <div className="sd-record-right">
                  {r.status && (
                    <span className={`sd-record-status sd-record-status--${r.statusColor}`}>
                      {r.status}
                    </span>
                  )}
                  {r.badge === 'download' && (
                    <div className="sd-record-badge-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="8 17 12 21 16 17" />
                        <line x1="12" y1="12" x2="12" y2="21" />
                        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
                      </svg>
                    </div>
                  )}
                  {r.badge === 'check' && (
                    <div className="sd-record-badge-icon sd-record-badge-icon--green">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <div className="sd-record-time">{r.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fast Track */}
        <aside className="sd-fast-track" aria-label="Fast Track">
          <h2 className="sd-section-title">Fast Track</h2>
          <div className="sd-fast-track-card">
            <h3>Need an Official Document?</h3>
            <p>Request certified transcripts and degree statements directly to global institutions.</p>
            <button className="sd-new-request-btn" id="new-request-btn">
              New Request →
            </button>
          </div>
          <div className="sd-quick-links">
            {[
              {
                id: 'download-id-btn', label: 'Download ID Card',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" /></svg>
              },
              {
                id: 'contact-registrar-btn', label: 'Contact Registrar',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              },
              {
                id: 'support-portal-btn', label: 'Support Portal',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              },
            ].map(({ id, label, icon }) => (
              <button key={id} id={id} className="sd-quick-link">
                <span className="sd-quick-link-icon">{icon}</span>
                <span>{label}</span>
                <span className="sd-quick-link-arrow">›</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

export default StudentDashboard;
