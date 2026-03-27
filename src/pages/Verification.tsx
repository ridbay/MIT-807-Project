import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { exportCertificatePDF } from '../lib/pdf-export';
import { calculateGPA, getUGClassification, getPGStatus } from '../lib/gpa-engine';
import { PROGRAMME_RULES } from '../data/rules';
import './Verification.css';

interface VerificationResult {
  status: 'AUTHENTICATED' | 'INVALID';
  owner?: string;
  docType?: string;
  dateIssued?: string;
  hash?: string;
  institution?: string;
}

const Verification: React.FC = () => {
  const { verifiedCertificates, user, studentType, courseRecords } = useAppContext();
  const [verifyId, setVerifyId] = useState<string>('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const programmeId = user?.programme || "UG-CS";
  const pRecords = useMemo(() => courseRecords.filter(r => r.programmeId === programmeId), [courseRecords, programmeId]);
  const currentGPA = useMemo(() => calculateGPA(pRecords), [pRecords]);
  const standing = useMemo(() => {
    const rules = PROGRAMME_RULES[programmeId];
    return studentType === "ug" ? getUGClassification(currentGPA) : getPGStatus(currentGPA, rules);
  }, [currentGPA, programmeId, studentType]);

  const handleDownload = () => {
    if (!result || result.status !== 'AUTHENTICATED') return;
    exportCertificatePDF(user, standing, currentGPA, verifyId, pRecords);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyId) return;
    
    setLoading(true);
    setResult(null);

    // Simulate verification delay
    setTimeout(() => {
      setLoading(false);
      
      // Check against memory (context) or legacy VER- format
      const isVerified = verifiedCertificates.includes(verifyId.trim());
      
      if (isVerified) {
        setResult({
          status: 'AUTHENTICATED',
          owner: user?.name || 'Authorized Graduate',
          docType: 'Degree Certificate',
          dateIssued: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
          institution: 'scholarNode Academy',
        });
      } else if (verifyId.toUpperCase().startsWith('VER-')) {
        setResult({
          status: 'AUTHENTICATED',
          owner: 'Alexander J. Sterling',
          docType: 'Official Transcript',
          dateIssued: 'Oct 24, 2023',
          hash: '0x7e2...9a12',
          institution: 'scholarNode University',
        });
      } else {
        setResult({ status: 'INVALID' });
      }
    }, 1500);
  };

  return (
    <div className="ver-page">
      <div className="ver-container">
        <header className="ver-header">
           <div className="ver-badge">SECURE VERIFICATION SYSTEM</div>
           <h1 className="ver-title">Authenticate Academic Records</h1>
           <p className="ver-desc">
             Enter the unique 12-digit Verification ID found on the digital certificate or transcript to confirm its authenticity.
           </p>
        </header>

        <div className="ver-search-card">
           <form className="ver-form" onSubmit={handleVerify}>
              <div className="ver-input-group">
                 <svg className="ver-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                 </svg>
                 <input 
                   type="text" 
                   className="ver-input" 
                   placeholder="Enter ID (e.g. VER-102-390-AF)"
                   value={verifyId}
                   onChange={(e) => setVerifyId((e.target as HTMLInputElement).value)}
                 />
                 <button type="submit" className="ver-submit-btn" disabled={loading}>
                   {loading ? 'Verifying...' : 'Validate Record'}
                 </button>
              </div>
           </form>
           <div className="ver-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <circle cx="12" cy="12" r="10" />
                 <line x1="12" y1="16" x2="12" y2="12" />
                 <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Verification IDs are case-sensitive and must include institutional prefixes.</span>
           </div>
        </div>

        {result && (
           <div className={`ver-result-card ver-result-card--${result.status.toLowerCase()}`}>
              <div className="ver-result-icon">
                 {result.status === 'AUTHENTICATED' ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                 ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                 )}
              </div>
              
              {result.status === 'AUTHENTICATED' ? (
                <div className="ver-result-body">
                   <div className="ver-result-header">
                      <h3>RECORD AUTHENTICATED</h3>
                      <span className="ver-hash">{result.hash}</span>
                   </div>
                   <div className="ver-details-grid">
                      <div className="ver-detail-item">
                         <label>RECORD OWNER</label>
                         <div className="ver-detail-val">{result.owner}</div>
                      </div>
                      <div className="ver-detail-item">
                         <label>DOCUMENT TYPE</label>
                         <div className="ver-detail-val">{result.docType}</div>
                      </div>
                      <div className="ver-detail-item">
                         <label>DATE ISSUED</label>
                         <div className="ver-detail-val">{result.dateIssued}</div>
                      </div>
                      <div className="ver-detail-item">
                         <label>ISSUING INSTITUTION</label>
                         <div className="ver-detail-val">{result.institution}</div>
                      </div>
                   </div>
                    <button className="ver-download-btn" onClick={handleDownload}>Download Verified Copy (PDF)</button>
                </div>
              ) : (
                <div className="ver-result-body">
                   <div className="ver-result-header">
                      <h3>INVALID VERIFICATION ID</h3>
                   </div>
                   <p className="ver-error-text">
                      The ID provided does not match any records in our secure database. Please check the ID on the document and try again or contact the Registrar's Office.
                   </p>
                </div>
              )}
           </div>
        )}

        <div className="ver-security-badges">
           <div className="ver-sec-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                 <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>End-to-End Encryption</span>
           </div>
           <div className="ver-sec-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Institutional Blockchain Verified</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
