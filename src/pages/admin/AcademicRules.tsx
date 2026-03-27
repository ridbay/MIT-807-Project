import React, { useState } from 'react';
import { PROGRAMME_RULES } from '../../data/rules';
import './AdminPages.css';

const AcademicRules: React.FC = () => {
  const [localRules, setLocalRules] = useState(Object.values(PROGRAMME_RULES));
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateRule = (programme: string, field: string, value: string) => {
    setLocalRules(localRules.map(r => r.programme === programme ? { ...r, [field]: Number(value) } : r));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate senate approval and synchronization
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("Nigerian Academic Senate rules updated and synchronized.");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Academic Rules</h1>
          <p className="admin-subtitle">Govern grading scales, credit requirements, and Nigerian graduation criteria.</p>
        </div>
        <button className="admin-primary-btn" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Synchronizing..." : "Save Rules"}
        </button>
      </div>

      <div className="admin-rules-grid">
        <div className="admin-card">
          <h3 className="admin-card-title">Institutional Grading Scales</h3>
          <div className="admin-rule-item">
             <div className="admin-rule-header">
                <div>Nigerian UG Scale (NUC Standard)</div>
                <div className="admin-rule-tag">ACTIVE</div>
             </div>
             <div className="admin-scale-preview">
                A (5.0), B (4.0), C (3.0), D (2.0), E (1.0), F (0.0)
                <button className="admin-text-btn">Modify</button>
             </div>
          </div>
          <div className="admin-rule-item">
             <div className="admin-rule-header">
                <div>Nigerian PG Scale (UNILAG/scholarNode)</div>
                <div className="admin-rule-tag">ACTIVE</div>
             </div>
             <div className="admin-scale-preview">
                A (5.0), B (4.0), C (3.0), D (2.0), F (0.0) - No E Grade
                <button className="admin-text-btn">Modify</button>
             </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title">Programme Graduation Criteria</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>PROG</th>
                  <th>MIN UNITS</th>
                  <th>PASS MARK</th>
                  <th>WD CGPA</th>
                </tr>
              </thead>
              <tbody>
                {localRules.slice(0, 5).map((rule, idx) => (
                  <tr key={idx}>
                    <td><strong>{rule.programme}</strong></td>
                    <td>
                      <input 
                        className="admin-inline-input"
                        type="number" 
                        value={rule.minUnits} 
                        onChange={(e) => handleUpdateRule(rule.programme, 'minUnits', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        className="admin-inline-input"
                        type="number" 
                        value={rule.minPassMark} 
                        onChange={(e) => handleUpdateRule(rule.programme, 'minPassMark', e.target.value)}
                      />%
                    </td>
                    <td>
                      <input 
                        className="admin-inline-input"
                        type="number" 
                        value={rule.withdrawCgpa} 
                        onChange={(e) => handleUpdateRule(rule.programme, 'withdrawCgpa', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicRules;
