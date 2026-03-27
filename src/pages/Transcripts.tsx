import React, { useMemo, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import {
  calculateGPA,
  CourseAttempt,
  getUGClassification,
  getPGStatus,
} from "../lib/gpa-engine";
import { PROGRAMME_RULES } from "../data/rules";
import { exportTranscriptPDF } from "../lib/pdf-export";
import "./Transcripts.css";

interface TranscriptHistory {
  id: string;
  date: string;
  programme: string;
  destination: string;
  sub: string;
  type: string;
  status: string;
  statusColor: string;
}

const historyData: TranscriptHistory[] = [
  {
    id: "#TR-8821",
    date: "Oct 24, 2023",
    programme: "UG",
    destination: "University of Lagos",
    sub: "transcripts@unilag.edu.ng",
    type: "DIGITAL",
    status: "SENT",
    statusColor: "teal",
  },
  {
    id: "#TR-9042",
    date: "Nov 02, 2023",
    programme: "PG",
    destination: "Covenant University",
    sub: "registrar@covenantuniversity.edu.ng",
    type: "HARD COPY",
    status: "APPROVED",
    statusColor: "blue",
  },
  {
    id: "#TR-9115",
    date: "Nov 15, 2023",
    programme: "UG",
    destination: "Federal Ministry of Education",
    sub: "evaluations@education.gov.ng",
    type: "DIGITAL",
    status: "PENDING",
    statusColor: "red",
  },
];

const Transcripts: React.FC = () => {
  const { user, studentType, courseRecords } = useAppContext();
  const [localHistory, setLocalHistory] = useState<TranscriptHistory[]>(historyData);
  const [institution, setInstitution] = useState("");
  const [destinationEmail, setDestinationEmail] = useState("");
  const [deliveryType, setDeliveryType] = useState<"DIGITAL" | "HARD COPY">("DIGITAL");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const programmeId = user?.programme || "UG-CS";
  const records = useMemo(() => {
    return courseRecords.filter((r) => r.programmeId === programmeId);
  }, [courseRecords, programmeId]);

  const currentGPA = useMemo(() => calculateGPA(records), [records]);
  const officialGPA = user?.cgpa || 0;
  const effectiveGPA = records.length > 0 ? currentGPA : officialGPA;
  
  const totalUnits = useMemo(
    () => records.reduce((acc: number, r: CourseAttempt) => acc + r.units, 0),
    [records],
  );

  const standing = useMemo(() => {
    const rules = PROGRAMME_RULES[programmeId];
    return studentType === "ug"
      ? getUGClassification(effectiveGPA)
      : getPGStatus(effectiveGPA, rules);
  }, [effectiveGPA, programmeId, studentType]);

  const handleExport = () => {
    exportTranscriptPDF(user, records, effectiveGPA);
  };

  const handleSend = async () => {
    if (!institution || !destinationEmail) {
       alert("Please fill in all destination details.");
       return;
    }
    
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newRequest: TranscriptHistory = {
       id: `#TR-${Math.floor(Math.random() * 9000 + 1000)}`,
       date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
       programme: studentType.toUpperCase(),
       destination: institution,
       sub: destinationEmail,
       type: deliveryType,
       status: deliveryType === "DIGITAL" ? "SENT" : "PENDING",
       statusColor: deliveryType === "DIGITAL" ? "teal" : "red"
    };
    
    setLocalHistory([newRequest, ...localHistory]);
    setIsSending(false);
    setIsSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
    
    // Clear form
    setInstitution("");
    setDestinationEmail("");
  };

  return (
    <div className="tr-page">
      {/* ... header logic ... */}
      <div className="tr-header">
        <div className="tr-title-block">
          <div className="tr-subtitle">DOCUMENT SERVICES</div>
          <h1 className="tr-title">Official Transcripts</h1>
          <p className="tr-desc">
            Request high-integrity academic records for graduate school
            applications, professional licensing, or official institutional
            transfers.
          </p>
        </div>
        <button className="tr-new-btn">
          <span>+</span> New Request
        </button>
      </div>

      <div className="tr-main-grid">
        {/* ... form col ... */}
        <div className="tr-form-col">
          <div className="tr-card">
            <div className="tr-card-header">
              <div className="tr-card-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 className="tr-card-title">Destination Details</h3>
                <p className="tr-card-subtitle">
                  Specify where your academic history should be sent.
                </p>
              </div>
            </div>

            <div className="tr-form-grid">
              <div className="tr-form-group">
                <label>INSTITUTION NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g. University of Ibadan" 
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>
              <div className="tr-form-group">
                <label>DESTINATION EMAIL</label>
                <input 
                  type="email" 
                  placeholder="admissions@ui.edu.ng" 
                  value={destinationEmail}
                  onChange={(e) => setDestinationEmail(e.target.value)}
                />
              </div>
              <div className="tr-form-group full-width">
                <label>PROGRAMME LEVEL</label>
                <select
                  defaultValue={
                    studentType === "pg"
                      ? "Postgraduate (PG)"
                      : "Undergraduate (UG)"
                  }
                >
                  <option>Undergraduate (UG)</option>
                  <option>Postgraduate (PG)</option>
                </select>
              </div>
            </div>

            <div className="tr-delivery-section">
              <label className="tr-form-label">DELIVERY TYPE</label>
              <div className="tr-delivery-grid">
                <div 
                  className={`tr-delivery-option ${deliveryType === "DIGITAL" ? "tr-delivery-option--active" : ""}`}
                  onClick={() => setDeliveryType("DIGITAL")}
                >
                  <div className={`tr-radio ${deliveryType === "DIGITAL" ? "tr-radio--checked" : ""}`} />
                  <div className="tr-delivery-text">
                    <div className="tr-delivery-title">Digital Copy (PDF)</div>
                    <div className="tr-delivery-desc">
                      Sent instantly via secure portal link.
                    </div>
                  </div>
                </div>
                <div 
                  className={`tr-delivery-option ${deliveryType === "HARD COPY" ? "tr-delivery-option--active" : ""}`}
                  onClick={() => setDeliveryType("HARD COPY")}
                >
                  <div className={`tr-radio ${deliveryType === "HARD COPY" ? "tr-radio--checked" : ""}`} />
                  <div className="tr-delivery-text">
                    <div className="tr-delivery-title">Official Hard Copy</div>
                    <div className="tr-delivery-desc">
                      Signed, sealed, and shipped via courier.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tr-fee-alert">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>
                {isSuccess ? (
                  <strong style={{ color: "#0d9488" }}>Request submitted successfully!</strong>
                ) : (
                  <>
                    A processing fee of <strong> ₦15,000</strong> applies to each
                    official transcript request. Digital copies are typically
                    processed within 24 business hours.
                  </>
                )}
              </span>
            </div>

            <button
              className="tr-authorize-btn"
              onClick={handleSend}
              disabled={effectiveGPA === 0 || isSending}
              title={
                effectiveGPA === 0 ? "No academic records available" : ""
              }
            >
              {isSending ? "PROCESSING REQUEST..." : (deliveryType === "DIGITAL" ? "AUTHORIZE & SEND" : "AUTHORIZE & PAY")}
            </button>
          </div>
        </div>

        {/* Sidebar Column */}
        <aside className="tr-side-col">
          <div className="tr-standing-card">
            <h3 className="tr-side-title">Academic Standing</h3>
            <div className="tr-standing-value-main">
              {standing.toUpperCase()}
            </div>
            <div className="tr-standing-grid">
              <div className="tr-standing-item">
                <div className="tr-standing-val">{effectiveGPA.toFixed(2)}</div>
                <div className="tr-standing-lab">
                  CURRENT
                  <br />
                  CGPA
                </div>
              </div>
              <div className="tr-standing-item">
                <div className="tr-standing-val">{totalUnits}</div>
                <div className="tr-standing-lab">
                  UNITS
                  <br />
                  EARNED
                </div>
              </div>
            </div>
            {/* Background design element */}
            <div className="tr-standing-bg">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
          </div>

          <div className="tr-guidelines-card">
            <h3 className="tr-side-title">Transcript Guidelines</h3>
            <ul className="tr-guide-list">
              <li>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Final grades for the current semester appear 48 hours after
                faculty submission.
              </li>
              <li>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Holds on account (financial/admin) will block transcript
                release.
              </li>
              <li>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Local shipping is ₦5,000 via GIGM/FedEx.
              </li>
            </ul>
            <button 
              className="tr-new-btn"
              onClick={() => document.querySelector('.tr-form-col')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>+</span> New Request
            </button>
          </div>
        </aside>
      </div>

      {/* History Table */}
      <section className="tr-history">
        <div className="tr-history-header">
          <h2 className="tr-history-title">Request History (Nigeria)</h2>
          <div className="tr-history-filter">
            <span>Filter by Status:</span>
            <select onChange={(e) => {
              const val = e.target.value;
              if (val === "All Requests") {
                setLocalHistory(historyData);
              } else {
                setLocalHistory(historyData.filter(h => h.status === val));
              }
            }}>
              <option>All Requests</option>
              <option>SENT</option>
              <option>APPROVED</option>
              <option>PENDING</option>
            </select>
          </div>
        </div>

        <div className="tr-table-wrap">
          <table className="tr-table">
            <thead>
              <tr>
                <th>REQUEST ID</th>
                <th>DATE</th>
                <th>PROGRAMME</th>
                <th>DESTINATION</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {localHistory.map((h, i) => (
                <tr key={i}>
                  <td className="tr-td-id">{h.id}</td>
                  <td className="tr-td-date">{h.date}</td>
                  <td>{h.programme}</td>
                  <td className="tr-td-dest">
                    <div className="tr-dest-name">{h.destination}</div>
                    <div className="tr-dest-sub">{h.sub}</div>
                  </td>
                  <td>
                    <span className="tr-type-badge">{h.type}</span>
                  </td>
                  <td>
                    <span
                      className={`tr-status-badge tr-status--${h.statusColor}`}
                    >
                      <span className="tr-status-dot" />
                      {h.status}
                    </span>
                  </td>
                  <td className="tr-td-actions">
                    <button
                      className="tr-action-btn"
                      title={
                        records.length === 0
                          ? "No records to download"
                          : "Download Record"
                      }
                      onClick={handleExport}
                      disabled={records.length === 0}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </button>
                    {h.status === "PENDING" && (
                      <button className="tr-action-btn tr-action-btn--red">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Transcripts;
