import React from 'react';
import { UnitProgressResult } from '../lib/gpa-engine';
import './UnitProgress.css';

interface UnitProgressProps {
  progress: UnitProgressResult;
  programmeName: string;
}

const UnitProgress: React.FC<UnitProgressProps> = ({ progress, programmeName }) => {
  const { earned, required, remaining, percentage } = progress;

  return (
    <div className="unit-prog-card">
      <div className="unit-prog-header">
        <h3 className="unit-prog-title">Graduation Progress</h3>
        <span className="unit-prog-badge">{percentage.toFixed(0)}%</span>
      </div>
      
      <div className="unit-prog-track">
        <div 
          className="unit-prog-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="unit-prog-stats">
        <div className="unit-prog-stat">
          <span className="unit-prog-val">{earned}</span>
          <span className="unit-prog-lab">Earned</span>
        </div>
        <div className="unit-prog-sep" />
        <div className="unit-prog-stat">
          <span className="unit-prog-val">{required}</span>
          <span className="unit-prog-lab">Target</span>
        </div>
        <div className="unit-prog-sep" />
        <div className="unit-prog-stat">
          <span className="unit-prog-val">{remaining}</span>
          <span className="unit-prog-lab">Remaining</span>
        </div>
      </div>

      <p className="unit-prog-footer">
        Based on <strong>{programmeName}</strong> minimum requirements.
      </p>
    </div>
  );
};

export default UnitProgress;
