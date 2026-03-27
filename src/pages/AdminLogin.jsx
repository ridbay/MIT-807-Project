import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard/admin');
    }, 1000);
  };

  return (
    <div className="al-root">
      <div className="al-container">
        {/* Top Branding Section */}
        <header className="al-header">
          <div className="al-logo">
             <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
               <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
             </svg>
          </div>
          <h1 className="al-title">The Digital Dean</h1>
          <div className="al-subtitle">REGISTRAR SERVICES</div>
        </header>

        {/* Login Card */}
        <main className="al-card">
          <div className="al-lock-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
               <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
               <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="al-card-heading">Institutional Access</h2>
          <p className="al-card-subheading">
            Authenticate using your registrar credentials to manage student records and transcript authorizations.
          </p>

          <form className="al-form" onSubmit={handleLogin}>
            <div className="al-field">
              <label htmlFor="staff-id">STAFF IDENTIFICATION (ID)</label>
              <div className="al-input-group">
                <input
                  id="staff-id"
                  type="text"
                  placeholder="e.g. DIR-001"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="al-field">
              <div className="al-label-row">
                 <label htmlFor="admin-password">SECURE PASSWORD</label>
                 <button type="button" className="al-forgot">Reset</button>
              </div>
              <div className="al-input-group">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="al-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" className="al-submit-btn" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Authorize Access'}
              {!isLoading && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              )}
            </button>
          </form>

          <div className="al-extra-actions">
             <Link to="/" className="al-back-link">Return to Public Portal</Link>
          </div>
        </main>

        {/* Security Badges */}
        <section className="al-security">
           <div className="al-badge-list">
              <div className="al-badge-item">
                 <div className="al-badge-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                 </div>
                 <span>ISO 27001 COMPLIANT</span>
              </div>
              <div className="al-badge-item">
                 <div className="al-badge-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                       <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zM12 12L21 3" />
                    </svg>
                 </div>
                 <span>END-TO-END ENCRYPTION</span>
              </div>
           </div>
        </section>

        <footer className="al-footer">
          <button className="al-footer-link">Protocol 404: Report Incident</button>
          <span>•</span>
          <button className="al-footer-link">Emergency Registrar Support</button>
        </footer>
      </div>
    </div>
  );
}

export default AdminLogin;
