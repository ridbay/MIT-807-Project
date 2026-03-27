import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroBg from '../assets/hero-bg.png';

const Home: React.FC = () => {
  return (
    <div className="lp-container">
      {/* Navigation */}
      <nav className="lp-nav">
        <div className="lp-logo">
          <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
          </svg>
          <span className="lp-logo-text">University Portal</span>
        </div>
        <div className="lp-nav-links">
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <Link to="/login/student" className="lp-login-btn">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="lp-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="lp-hero-overlay" />
        <div className="lp-hero-content">
          <div className="lp-badge">ESTABLISHED 1984</div>
          <h1 className="lp-title">
            Transcending <span className="lp-title-alt">Academic</span><br />
            Boundaries.
          </h1>
          <p className="lp-subtitle">
            Experience the future of university records management. High-integrity transcripts, 
            blockchain-verified credentials, and real-time academic standing in one unified portal.
          </p>
          <div className="lp-hero-actions">
            <Link to="/login/student" className="lp-btn-primary">
              Student Dashboard
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/login/admin" className="lp-btn-secondary">
              Administrator Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="lp-features">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Integrated Academic Modules</h2>
          <p className="lp-section-desc">Everything you need to manage your academic lifecycle with precision.</p>
        </div>
        
        <div className="lp-feature-grid">
          <div className="lp-feature-card">
            <div className="lp-feature-icon lp-icon--blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3>Smart Transcripts</h3>
            <p>Request official academic records instantly for graduate school applications or professional licensing.</p>
          </div>

          <div className="lp-feature-card">
            <div className="lp-feature-icon lp-icon--teal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <h3>Digital Degrees</h3>
            <p>Blockchain-secured diplomas and certificates that are globally verifiable and tamper-proof.</p>
          </div>

          <div className="lp-feature-card">
            <div className="lp-feature-icon lp-icon--purple">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <line x1="18" y1="20" x2="18" y2="10" />
                 <line x1="12" y1="20" x2="12" y2="4" />
                 <line x1="6" y1="20" x2="6" y2="14" />
               </svg>
            </div>
            <h3>CGPA Insights</h3>
            <p>Analyze your academic performance with real-time grade breakdowns and cumulative projections.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="lp-stats">
        <div className="lp-stat-item">
          <div className="lp-stat-val">99.8%</div>
          <div className="lp-stat-lab">DATA ACCURACY</div>
        </div>
        <div className="lp-stat-item">
          <div className="lp-stat-val">12K+</div>
          <div className="lp-stat-lab">ACTIVE STUDENTS</div>
        </div>
        <div className="lp-stat-item">
          <div className="lp-stat-val">24/7</div>
          <div className="lp-stat-lab">PORTAL ACCESS</div>
        </div>
        <div className="lp-stat-item">
          <div className="lp-stat-val">SECURE</div>
          <div className="lp-stat-lab">LEDGER VERIFIED</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="lp-footer-content">
          <div className="lp-footer-info">
            <div className="lp-logo">
               <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                 <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
               </svg>
               <span className="lp-logo-text">University Portal</span>
            </div>
            <p className="lp-footer-desc">
              Empowering students and administrators with cutting-edge academic records management.
            </p>
          </div>
          <div className="lp-footer-links">
             <div className="lp-link-group">
                <h4>Portal</h4>
                <Link to="/dashboard/student">Student View</Link>
                <Link to="/dashboard/admin">Admin View</Link>
                <Link to="/login/student">Authentication</Link>
             </div>
             <div className="lp-link-group">
                <h4>Resources</h4>
                <a href="#">Guidelines</a>
                <a href="#">Support</a>
                <a href="#">Privacy Policy</a>
             </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
           &copy; 2026 The Digital Dean. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
