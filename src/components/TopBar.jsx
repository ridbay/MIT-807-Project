import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './DashboardLayout.css';

function TopBar() {
  const [searchVal, setSearchVal] = useState('');
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/dashboard/admin');

  return (
    <header className="sd-topbar">
      <div className="sd-search-wrapper">
        <svg className="sd-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="search-input"
          className="sd-search"
          type="search"
          placeholder={isAdmin ? "Search students, transcript IDs or certificates..." : "Search academic records, courses or results..."}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
      <div className="sd-topbar-actions">
        <button className="sd-icon-btn" id="notifications-btn" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button className="sd-icon-btn" id="apps-btn" aria-label="Apps">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="5" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="12" cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
          </svg>
        </button>
        <div className="sd-user-profile">
          <div className="sd-user-info">
            <div className="sd-user-name">{isAdmin ? "Admin Dean" : "Alex Mercer"}</div>
            <div className="sd-user-meta-row">
              <span className="sd-user-type-badge">{isAdmin ? "STAFF" : "PG"}</span>
              <span className="sd-user-matric">{isAdmin ? "DIR-001" : "2024/ENG/042"}</span>
            </div>
            <div className="sd-user-role">{isAdmin ? "Registrar Office" : "Postgraduate Student"}</div>
          </div>
          <button className="sd-avatar-btn" id="avatar-btn" aria-label="Profile">
            <div className="sd-avatar">{isAdmin ? "AD" : "AM"}</div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
