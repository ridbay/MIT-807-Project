import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './DashboardLayout.css';

const studentNav = [
  { icon: 'dashboard', label: 'Dashboard', to: '/dashboard/student' },
  { icon: 'results', label: 'Results', to: '/dashboard/student/results' },
  { icon: 'cgpa', label: 'CGPA Calculator', to: '/dashboard/student/cgpa' },
  { icon: 'certificates', label: 'Certificates', to: '/dashboard/student/certificates' },
  { icon: 'transcripts', label: 'Transcripts', to: '/dashboard/student/transcripts' },
  { icon: 'profile', label: 'Profile', to: '/dashboard/student/profile' },
];

const adminNav = [
  { icon: 'dashboard', label: 'Dashboard', to: '/dashboard/admin' },
  { icon: 'results', label: 'Results', to: '/dashboard/admin/results' },
  { icon: 'cgpa', label: 'CGPA Calculator', to: '/dashboard/admin/cgpa' },
  { icon: 'certificates', label: 'Certificates', to: '/dashboard/admin/certificates' },
  { icon: 'transcripts', label: 'Transcripts', to: '/dashboard/admin/transcripts' },
  { icon: 'profile', label: 'Profile', to: '/dashboard/admin/profile' },
];

function NavIcon({ icon }) {
  if (icon === 'dashboard')
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  if (icon === 'results')
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  if (icon === 'cgpa')
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="12" y1="9" x2="12" y2="15" />
      </svg>
    );
  if (icon === 'certificates')
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    );
  if (icon === 'transcripts')
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    );
  if (icon === 'profile')
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  if (icon === 'research')
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    );
  return null;
}

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentType } = useAppContext();
  const isAdmin = location.pathname.startsWith('/dashboard/admin');
  
  let navItems = isAdmin ? [...adminNav] : [...studentNav];

  // Add Research for PG students
  if (!isAdmin && studentType === 'pg') {
    // Insert after results
    const resultsIdx = navItems.findIndex(item => item.icon === 'results');
    navItems.splice(resultsIdx + 1, 0, { icon: 'research', label: 'Research', to: '/dashboard/student/research' });
  }

  return (
    <aside className="sd-sidebar">
      <div className="sd-brand">
        <div className="sd-brand-logo">
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
          </svg>
        </div>
        <div>
          <div className="sd-brand-name">The Digital<br />Dean</div>
          <div className="sd-brand-sub">UNIVERSITY RECORDS</div>
        </div>
      </div>

      <nav className="sd-nav" aria-label="Dashboard navigation">
        {navItems.map(({ icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            end={icon === 'dashboard'}
            className={({ isActive }) =>
              `sd-nav-item${isActive ? ' sd-nav-item--active' : ''}`
            }
          >
            <NavIcon icon={icon} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sd-sidebar-bottom">
        <button 
          className="sd-verify-btn" 
          id="verify-record-btn"
          onClick={() => navigate(isAdmin ? '/dashboard/admin/verify' : '/dashboard/student/verify')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
          Verify Record
        </button>
        <button className="sd-settings-btn" id="settings-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </button>
        <button className="sd-logout-btn" id="logout-btn" onClick={() => navigate('/login')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
