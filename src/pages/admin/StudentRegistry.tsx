import React, { useState } from 'react';
import { STUDENTS } from '../../data/students';
import './AdminPages.css';

const StudentRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(STUDENTS);
  const [showModal, setShowModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.matric.includes(searchTerm)
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newStu = {
      name: "Chukwudi Olabisi",
      matric: (Math.floor(Math.random() * 900000000) + 100000000).toString(),
      surname: "Olabisi",
      department: "Computer Science",
      programme: "B.Sc. Computer Science",
      level: 100,
      status: "active" as const,
      type: "ug" as const,
      cgpa: 0,
      needsResearch: false
    };
    
    setStudents([newStu, ...students]);
    setIsRegistering(false);
    setShowModal(false);
  };

  const handleDelete = (matric: string) => {
    if (window.confirm("Are you sure you want to de-register this student?")) {
      setStudents(students.filter(s => s.matric !== matric));
    }
  };

  return (
    <div className="admin-page">
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2 className="admin-modal-title">Register New Student</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. Adebayo Kunle" required />
              </div>
              <div className="form-group">
                <label>Programme</label>
                <select>
                  <option>B.Sc. Computer Science</option>
                  <option>M.Sc. Information Technology</option>
                  <option>Master of Info. Tech (MIT)</option>
                </select>
              </div>
              <div className="admin-modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="admin-secondary-btn">Cancel</button>
                <button type="submit" className="admin-primary-btn" disabled={isRegistering}>
                  {isRegistering ? "Registering..." : "Register Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-header">
        <div>
          <h1 className="admin-title">Student Registry</h1>
          <p className="admin-subtitle">Central management for all scholarNode enrolled students.</p>
        </div>
        <button className="admin-primary-btn" onClick={() => setShowModal(true)}>+ Register Student</button>
      </div>

      <div className="admin-card">
        <div className="admin-table-controls">
          <div className="admin-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by name or matric number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>STUDENT NAME</th>
                <th>MATRIC NO.</th>
                <th>PROGRAMME</th>
                <th>LEVEL</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, idx) => (
                <tr key={idx}>
                  <td className="admin-td-name">
                    <div className="admin-avatar">{s.name.charAt(0)}</div>
                    {s.name}
                  </td>
                  <td>{s.matric}</td>
                  <td>{s.programme}</td>
                  <td>{s.level}</td>
                  <td>
                    <span className={`admin-status-badge admin-status--${s.status}`}>
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="admin-td-actions">
                    <button className="admin-icon-btn" title="Edit Profile">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button 
                      className="admin-icon-btn admin-icon-btn--danger" 
                      title="De-register"
                      onClick={() => handleDelete(s.matric)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
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

export default StudentRegistry;
