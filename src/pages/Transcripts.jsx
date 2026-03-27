import './Transcripts.css';

const history = [
  { id: '#TR-8821', date: 'Oct 24, 2023', programme: 'UG', destination: 'Harvard Graduate School', sub: 'admissions@gsas.harvard.edu', type: 'DIGITAL', status: 'SENT', statusColor: 'teal' },
  { id: '#TR-9042', date: 'Nov 02, 2023', programme: 'PG', destination: 'JP Morgan Chase & Co', sub: '100 Madison Ave, NY', type: 'HARD COPY', status: 'APPROVED', statusColor: 'blue' },
  { id: '#TR-9115', date: 'Nov 15, 2023', programme: 'UG', destination: 'General Medical Council', sub: 'verifications@gmc-uk.org', type: 'DIGITAL', status: 'PENDING', statusColor: 'red' },
];

function Transcripts() {
  return (
    <div className="tr-page">
      {/* Header */}
      <div className="tr-header">
        <div className="tr-title-block">
          <div className="tr-subtitle">DOCUMENT SERVICES</div>
          <h1 className="tr-title">Official Transcripts</h1>
          <p className="tr-desc">
            Request high-integrity academic records for graduate school applications, professional licensing, or official institutional transfers.
          </p>
        </div>
        <button className="tr-new-btn">
          <span>+</span> New Request
        </button>
      </div>

      <div className="tr-main-grid">
        {/* Form Column */}
        <div className="tr-form-col">
          <div className="tr-card">
            <div className="tr-card-header">
              <div className="tr-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                   <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 className="tr-card-title">Destination Details</h3>
                <p className="tr-card-subtitle">Specify where your academic history should be sent.</p>
              </div>
            </div>

            <div className="tr-form-grid">
              <div className="tr-form-group">
                <label>INSTITUTION NAME</label>
                <input type="text" placeholder="e.g. Stanford University" />
              </div>
              <div className="tr-form-group">
                <label>DESTINATION EMAIL</label>
                <input type="email" placeholder="admissions@institution.edu" />
              </div>
              <div className="tr-form-group full-width">
                <label>PROGRAMME LEVEL</label>
                <select>
                  <option>Undergraduate (UG)</option>
                  <option>Postgraduate (PG)</option>
                </select>
              </div>
            </div>

            <div className="tr-delivery-section">
              <label className="tr-form-label">DELIVERY TYPE</label>
              <div className="tr-delivery-grid">
                <div className="tr-delivery-option tr-delivery-option--active">
                  <div className="tr-radio tr-radio--checked" />
                  <div className="tr-delivery-text">
                    <div className="tr-delivery-title">Digital Copy (PDF)</div>
                    <div className="tr-delivery-desc">Sent instantly via secure portal link.</div>
                  </div>
                </div>
                <div className="tr-delivery-option">
                  <div className="tr-radio" />
                  <div className="tr-delivery-text">
                    <div className="tr-delivery-title">Official Hard Copy</div>
                    <div className="tr-delivery-desc">Signed, sealed, and shipped via courier.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tr-fee-alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>A processing fee of <strong>$15.00</strong> applies to each official transcript request. Digital copies are typically processed within 24 business hours.</span>
            </div>

            <button className="tr-authorize-btn">
              AUTHORIZE REQUEST
            </button>
          </div>
        </div>

        {/* Sidebar Column */}
        <aside className="tr-side-col">
          <div className="tr-standing-card">
            <h3 className="tr-side-title">Academic Standing</h3>
            <div className="tr-standing-grid">
              <div className="tr-standing-item">
                <div className="tr-standing-val">3.92</div>
                <div className="tr-standing-lab">CURRENT<br />CGPA</div>
              </div>
              <div className="tr-standing-item">
                <div className="tr-standing-val">128</div>
                <div className="tr-standing-lab">CREDITS<br />EARNED</div>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Final grades for the current semester appear 48 hours after faculty submission.
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Holds on account (financial/admin) will block transcript release.
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                International shipping may take 7-14 business days.
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* History Table */}
      <section className="tr-history">
        <div className="tr-history-header">
          <h2 className="tr-history-title">Request History</h2>
          <div className="tr-history-filter">
             <span>Filter by Status:</span>
             <select>
               <option>All Requests</option>
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
              {history.map((h, i) => (
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
                    <span className={`tr-status-badge tr-status--${h.statusColor}`}>
                      <span className="tr-status-dot" />
                      {h.status}
                    </span>
                  </td>
                  <td className="tr-td-actions">
                    <button className="tr-action-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    {h.status === 'PENDING' && (
                      <button className="tr-action-btn tr-action-btn--red">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

        <div className="tr-pagination">
          <span className="tr-pag-info">Showing 3 of 12 requests</span>
          <div className="tr-pag-controls">
            <button className="tr-pag-btn">‹</button>
            <button className="tr-pag-btn">›</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Transcripts;
