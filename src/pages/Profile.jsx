import { useState } from 'react';
import './Profile.css';

const documents = [
  { id: 1, name: 'University ID Card', meta: 'VERIFIED • PDF (1.2 MB)', icon: 'id' },
  { id: 2, name: 'Admission Letter', meta: 'VERIFIED • PDF (0.8 MB)', icon: 'doc' },
  { id: 3, name: 'Tuition Receipt 2023', meta: 'ARCHIVED • JPG (2.4 MB)', icon: 'bill' },
];

function Profile() {
  const [tfaEnabled, setTfaEnabled] = useState(true);

  return (
    <div className="prof-page">
      {/* Profile Header */}
      <div className="prof-header-card">
        <div className="prof-header-left">
          <div className="prof-avatar-box">
             <div className="prof-avatar-img">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                   <circle cx="12" cy="7" r="4" />
                </svg>
             </div>
             <button className="prof-avatar-edit" aria-label="Edit Avatar">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                 <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
               </svg>
             </button>
          </div>
          <div className="prof-header-info">
             <div className="prof-name-row">
               <h1 className="prof-name">Alexander J. Sterling</h1>
               <span className="prof-verified-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                  VERIFIED
               </span>
             </div>
             <div className="prof-meta-row">
                <div className="prof-meta-item">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                      <path d="M12 6a6 6 0 1 0 6 6A6 6 0 0 0 12 6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
                   </svg>
                   MAT/ENG/20/4492
                </div>
                <div className="prof-meta-item">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                   </svg>
                   Main Campus, Block C
                </div>
             </div>
          </div>
        </div>
        <button className="prof-status-btn">Update Status</button>
      </div>

      <div className="prof-main-grid">
        {/* Left Column */}
        <div className="prof-left-col">
          {/* Personal Info Card */}
          <section className="prof-card">
            <div className="prof-card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                 <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              <h2 className="prof-card-title">Personal Information</h2>
            </div>
            <div className="prof-form-grid">
              <div className="prof-info-box">
                <label>FULL NAME</label>
                <div className="prof-info-val">Alexander Julian Sterling</div>
              </div>
              <div className="prof-info-box">
                <label>EMAIL ADDRESS</label>
                <div className="prof-info-val">a.sterling@university.edu</div>
              </div>
              <div className="prof-info-box">
                <label>PHONE NUMBER</label>
                <div className="prof-info-val">+1 (555) 234-8901</div>
              </div>
              <div className="prof-info-box">
                <label>DATE OF BIRTH</label>
                <div className="prof-info-val">March 14, 1999</div>
              </div>
              <div className="prof-info-box full-width">
                <label>RESIDENTIAL ADDRESS</label>
                <div className="prof-info-val">42 Academic Way, North Housing, University District</div>
              </div>
            </div>
          </section>

          {/* Security & Settings Card */}
          <section className="prof-card">
            <div className="prof-card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                 <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <h2 className="prof-card-title">Security & Account Settings</h2>
            </div>
            <div className="prof-settings-list">
              <div className="prof-setting-item">
                <div className="prof-setting-info">
                  <div className="prof-setting-name">Account Password</div>
                  <div className="prof-setting-desc">Last changed 3 months ago</div>
                </div>
                <button className="prof-link-btn">Change Password</button>
              </div>
              <div className="prof-setting-item">
                <div className="prof-setting-info">
                  <div className="prof-setting-name">Two-Factor Authentication</div>
                  <div className="prof-setting-desc">Added security via mobile app</div>
                </div>
                <label className="prof-switch">
                  <input type="checkbox" checked={tfaEnabled} onChange={() => setTfaEnabled(!tfaEnabled)} />
                  <span className="prof-slider" />
                </label>
              </div>
              <div className="prof-setting-item">
                <div className="prof-setting-info">
                  <div className="prof-setting-name">Active Sessions</div>
                  <div className="prof-setting-desc">3 devices currently logged in</div>
                </div>
                <button className="prof-action-btn">Manage Sessions</button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <aside className="prof-right-col">
          {/* Academic Profile Card */}
          <section className="prof-card prof-card--dark">
            <div className="prof-card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                 <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <h2 className="prof-card-title">Academic Profile</h2>
              <span className="prof-type-badge">POSTGRADUATE</span>
            </div>
            
            <div className="prof-acad-grid">
              <div className="prof-acad-item">
                <label>FACULTY</label>
                <div className="prof-acad-val">Engineering</div>
              </div>
              <div className="prof-acad-item right">
                <label>LEVEL</label>
                <div className="prof-acad-val">700L</div>
              </div>
              <div className="prof-acad-item full">
                <label>DEPARTMENT</label>
                <div className="prof-acad-val">Computer Engineering</div>
              </div>
            </div>

            <div className="prof-standing-card">
              <div className="prof-standing-left">
                <label>CURRENT STANDING</label>
                <div className="prof-standing-status">First Class</div>
              </div>
              <div className="prof-standing-ring">
                 4.82
              </div>
            </div>
          </section>

          {/* Document Vault Card */}
          <section className="prof-card">
            <div className="prof-card-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <cloud-upload strokeWidth="2" />
                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                 <polyline points="17 8 12 3 7 8" />
                 <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <h2 className="prof-card-title">Document Vault</h2>
              <button className="prof-upload-btn" aria-label="Upload">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </button>
            </div>
            
            <div className="prof-doc-list">
              {documents.map((doc) => (
                <div className="prof-doc-item" key={doc.id}>
                  <div className="prof-doc-icon">
                    {doc.icon === 'id' && (
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <rect x="3" y="4" width="18" height="16" rx="2" />
                         <circle cx="9" cy="10" r="2" />
                         <line x1="14" y1="9" x2="18" y2="9" />
                         <line x1="14" y1="13" x2="18" y2="13" />
                       </svg>
                    )}
                     {doc.icon === 'doc' && (
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                         <polyline points="14 2 14 8 20 8" />
                       </svg>
                    )}
                     {doc.icon === 'bill' && (
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <rect x="2" y="5" width="20" height="14" rx="2" />
                         <line x1="2" y1="10" x2="22" y2="10" />
                       </svg>
                    )}
                  </div>
                  <div className="prof-doc-info">
                    <div className="prof-doc-name">{doc.name}</div>
                    <div className="prof-doc-meta">{doc.meta}</div>
                  </div>
                  <div className="prof-doc-actions">
                    <button className="prof-doc-btn" aria-label="View">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button className="prof-doc-btn" aria-label="Download">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Profile;
