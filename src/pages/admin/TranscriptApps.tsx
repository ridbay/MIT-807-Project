import React, { useState } from 'react';
import './AdminPages.css';

const TranscriptApps: React.FC = () => {
  const [requests, setRequests] = useState([
    { id: "#TR-8821", student: "Segun Gbenga", dest: "University of Lagos (UNILAG)", type: "DIGITAL", fee: "₦15,000", status: "PAID" },
    { id: "#TR-9042", student: "Babatunde Ridwan", dest: "Covenant University", type: "HARD COPY", fee: "₦20,000", status: "PENDING" },
    { id: "#TR-7712", student: "Oluwapelumi Ayomikun", dest: "FUTA, Akure", type: "DIGITAL", fee: "₦15,000", status: "PAID" }
  ]);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleProcess = async (id: string) => {
    setProcessingId(id);
    // Simulate back-end verification delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRequests(requests.map(r => r.id === id ? { ...r, status: "SENT" } : r));
    setProcessingId(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Transcript Services</h1>
          <p className="admin-subtitle">Manage processing and dispatch for Nigerian institutional transcript requests.</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>REQUEST ID</th>
                <th>STUDENT</th>
                <th>DESTINATION INSTITUTION</th>
                <th>MODE</th>
                <th>FEE PAID</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, idx) => (
                <tr key={idx}>
                  <td className="admin-td-id">{r.id}</td>
                  <td><strong>{r.student}</strong></td>
                  <td>{r.dest}</td>
                  <td>{r.type}</td>
                  <td>{r.fee}</td>
                  <td>
                    <span className={`admin-status-badge admin-status--${r.status === 'SENT' ? 'active' : (r.status === 'PAID' ? 'active' : 'pending')}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    {r.status !== 'SENT' ? (
                      <button 
                        className="admin-primary-btn sm" 
                        onClick={() => handleProcess(r.id)}
                        disabled={processingId === r.id || r.status === 'PENDING'}
                        title={r.status === 'PENDING' ? "Wait for payment clearance" : "Authorize dispatch"}
                      >
                        {processingId === r.id ? "Processing..." : (r.status === 'PENDING' ? "Await Pay" : "Authorize")}
                      </button>
                    ) : (
                      <button className="admin-secondary-btn sm" disabled>Manifested</button>
                    )}
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

export default TranscriptApps;
