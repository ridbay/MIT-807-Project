import React, { useState } from 'react';
import './AdminPages.css';

const VerificationLogs: React.FC = () => {
  const [logs, setLogs] = useState([
    { id: 1, time: "10:45 AM, Today", by: "WES (Canada)", doc: "#VC-99120485", student: "Segun Adeniyi", res: "SUCCESS", loc: "Toronto, CA" },
    { id: 2, time: "09:12 AM, Today", by: "Interswitch Group", doc: "#VC-99120411", student: "Ridwan Balogun", res: "SUCCESS", loc: "Lagos, NG" },
    { id: 3, time: "08:30 AM, Today", by: "Paystack / Stripe", doc: "#VC-77210942", student: "Amaka Nwachukwu", res: "SUCCESS", loc: "Lagos, NG" },
    { id: 4, time: "Yesterday", by: "GTBank PLC", doc: "#VC-88120300", student: "Chidi Okafor", res: "SUCCESS", loc: "Abuja, NG" },
    { id: 5, time: "Yesterday", by: "Unknown IP / VPN", doc: "#VC-INVALID", student: "N/A", res: "FAILED", loc: "London, UK" }
  ]);
  const [filter, setFilter] = useState('');

  const filteredLogs = logs.filter(l => 
    l.student.toLowerCase().includes(filter.toLowerCase()) || 
    l.by.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Verification Logs</h1>
          <p className="admin-subtitle">Audit trail for external academic credential verifications via Nigerian institutions.</p>
        </div>
        <div className="admin-search">
          <input 
            type="text" 
            placeholder="Search logs by verifier or student..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', minWidth: '300px'}}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>TIMESTAMP</th>
                <th>VERIFIED BY</th>
                <th>DOCUMENT ID</th>
                <th>STUDENT</th>
                <th>RESULT</th>
                <th>LOCATION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(l => (
                <tr key={l.id}>
                  <td>{l.time}</td>
                  <td><strong>{l.by}</strong></td>
                  <td className="admin-td-id">{l.doc}</td>
                  <td>{l.student}</td>
                  <td>
                    <span className={`admin-status-badge admin-status--${l.res === 'SUCCESS' ? 'active' : 'pending'}`} style={l.res === 'FAILED' ? {background: '#fee2e2', color: '#b91c1c'} : {}}>
                      {l.res}
                    </span>
                  </td>
                  <td>{l.loc}</td>
                  <td>
                    <button className="admin-text-btn">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerificationLogs;
