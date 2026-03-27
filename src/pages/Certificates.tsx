import React, { useMemo, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { useAppContext } from "../hooks/useAppContext";
import {
  calculateGPA,
  getUGClassification,
  getPGStatus,
} from "../lib/gpa-engine";
import { PROGRAMME_RULES } from "../data/rules";
import { exportCertificatePDF } from "../lib/pdf-export";
import "./Certificates.css";

const Certificates: React.FC = () => {
  const { user, studentType, courseRecords, setVerifiedCertificates } =
    useAppContext();
  const [exportType, setExportType] = useState<'pdf' | 'img'>('pdf');
  const certificateRef = useRef<HTMLDivElement>(null);

  const programmeId =
    user?.programme || (studentType === "pg" ? "MIT" : "UG-CS");

  const pRecords = useMemo(() => courseRecords.filter(r => r.programmeId === programmeId), [courseRecords, programmeId]);
  const currentGPA = useMemo(() => calculateGPA(pRecords), [pRecords]);
  const officialGPA = user?.cgpa || 0;
  const effectiveGPA = pRecords.length > 0 ? currentGPA : officialGPA;
  
  const rules = PROGRAMME_RULES[programmeId];
  
  const classification = studentType === "pg"
    ? getPGStatus(effectiveGPA, rules)
    : getUGClassification(effectiveGPA);

  const programmeName =
    user?.programmeName ||
    (studentType === "pg"
      ? "Master of Information Technology (MIT)"
      : "B.Sc. Computer Science");

  const handleExport = async () => {
    const verificationId = Math.floor(
      Math.random() * 900000000000 + 100000000000,
    ).toString();
    setVerifiedCertificates((prev) => [...prev, verificationId]);

    if (exportType === 'pdf') {
       exportCertificatePDF(user, classification, currentGPA, verificationId, pRecords);
    } else {
       if (certificateRef.current) {
          const canvas = await html2canvas(certificateRef.current, {
            useCORS: true,
            backgroundColor: '#ffffff'
          } as any);
          const link = document.createElement('a');
          link.download = `Certificate_${user?.matric || 'scholarNode'}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
       }
    }
  };

  return (
    <div className="cert-page">
      {/* Breadcrumbs & Header */}
      <div className="cert-header">
        <div className="cert-nav-crumbs">
          Academic <span>›</span> Certificates
        </div>
        <div className="cert-header-main">
          <div className="cert-title-block">
            <h1 className="cert-title">Digital Credentials</h1>
            <p className="cert-desc">
              Generate and manage your blockchain-verified graduation
              certificates and diplomas.
            </p>
          </div>
          <div className="cert-header-actions">
            <button className="cert-btn-secondary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 8v4l3 3" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              View Log
            </button>
            <button
              className="cert-btn-primary"
              onClick={handleExport}
              disabled={
                courseRecords.filter((r) => r.programmeId === programmeId)
                  .length === 0
              }
              title={
                courseRecords.filter((r) => r.programmeId === programmeId)
                  .length === 0
                  ? "No courses completed yet"
                  : ""
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              Generate Certificate
            </button>
          </div>
        </div>
      </div>

      <div className="cert-main-grid">
        {/* Left Column: Details & Export */}
        <div className="cert-left-col">
          <div className="cert-details-card">
            <h3 className="cert-card-label">VERIFICATION DETAILS</h3>

            <div className="cert-detail-item">
              <div className="cert-label-row">
                <span className="cert-item-label">Full Name</span>
                <span className="cert-verified-badge">Verified</span>
              </div>
              <div className="cert-item-value">
                {user?.name || "Guest Student"}
              </div>
            </div>
            {/* 
            <div className="cert-detail-item">
              <span className="cert-item-label">Programme of Study</span>
              <div className="cert-item-value">{programmeName}</div>
            </div> */}

            <div className="cert-detail-row">
              <div className="cert-detail-item">
                <span className="cert-item-label">Graduation Year</span>
                <div className="cert-item-value">
                  {user?.gradYear
                    ? `Class of ${user.gradYear}`
                    : "Class of 2026"}
                </div>
              </div>
              <div className="cert-detail-item">
                <span className="cert-item-label">Final CGPA</span>
                <div className="cert-item-value cert-text-highlight">
                  {(pRecords.length > 0 ? currentGPA : user?.cgpa || 0).toFixed(
                    2,
                  )}{" "}
                  / 5.0
                </div>
              </div>
            </div>
          </div>
          <div className="cert-export-card">
            <h3 className="cert-card-label">EXPORT OPTIONS</h3>

            <div 
              className={`cert-export-option ${exportType === 'pdf' ? 'cert-export-option--active' : ''}`}
              onClick={() => setExportType('pdf')}
            >
              <div className="cert-export-icon cert-export-icon--pdf">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="cert-export-text">
                <div className="cert-export-title">PDF Document</div>
                <div className="cert-export-desc">Standard for digital sharing</div>
              </div>
              <div className={`cert-radio ${exportType === 'pdf' ? 'cert-radio--checked' : ''}`} />
            </div>

            <div 
              className={`cert-export-option ${exportType === 'img' ? 'cert-export-option--active' : ''}`}
              onClick={() => setExportType('img')}
            >
              <div className="cert-export-icon cert-export-icon--img">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="cert-export-text">
                <div className="cert-export-title">High-Res Image</div>
                <div className="cert-export-desc">PNG format @ 300 DPI</div>
              </div>
              <div className={`cert-radio ${exportType === 'img' ? 'cert-radio--checked' : ''}`} />
            </div>

            <button 
              className="cert-download-btn" 
              onClick={handleExport}
              disabled={pRecords.length === 0}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Certificate
            </button>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="cert-preview-col">
          <div className="cert-preview-card">
            <div className="cert-visual" ref={certificateRef}>
              {/* Mock Certificate Content */}
              <div className="cert-visual-inner">
                <div className="cert-visual-header">
                  THIS IS TO CERTIFY THAT
                </div>
                <div className="cert-visual-name">
                  {user?.name || "Guest Student"}
                </div>
                <div className="cert-visual-sub">
                  has successfully completed the prescribed course of study
                  <br />
                  and is hereby awarded the degree of
                </div>
                <div className="cert-visual-degree">{programmeName}</div>
                <div className="cert-visual-meta">
                  {classification} • CGPA{" "}
                  {(pRecords.length > 0 ? currentGPA : user?.cgpa || 0).toFixed(
                    2,
                  )}{" "}
                  / 5.0
                </div>

                <div className="cert-visual-bottom-img">
                  <div className="cert-qr-placeholder" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="cert-footer-grid">
        <div className="cert-footer-card">
          <div className="cert-footer-icon cert-footer-icon--blue">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h4 className="cert-footer-title">Tamper-Proof</h4>
            <p className="cert-footer-text">
              Each document is anchored to the institution's private ledger to
              ensure authenticity.
            </p>
          </div>
        </div>
        <div className="cert-footer-card">
          <div className="cert-footer-icon cert-footer-icon--teal">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </div>
          <div>
            <h4 className="cert-footer-title">Direct Sharing</h4>
            <p className="cert-footer-text">
              Share your digital credentials directly with employers and
              academic institutions via secure links.
            </p>
          </div>
        </div>
        <div className="cert-footer-card">
          <div className="cert-footer-icon cert-footer-icon--purple">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 6a6 6 0 1 0 6 6A6 6 0 0 0 12 6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
            </svg>
          </div>
          <div>
            <h4 className="cert-footer-title">Lifetime Access</h4>
            <p className="cert-footer-text">
              Your certificates are stored indefinitely and can be re-generated
              at any time without fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
