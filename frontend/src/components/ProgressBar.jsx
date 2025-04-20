// src/components/ProgressBar.jsx
import React from 'react';

function ProgressBar({ percentage, color = 'bg-purple-500', height = 'h-2.5' }) {
  // Generate labelColor based on score for accessibility
  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Great';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="w-full bg-gray-100 rounded-full">
      <div 
        className={`${color} ${height} rounded-full transition-all duration-500 ease-out`} 
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        role="progressbar"
        aria-label={`${percentage}% - ${getScoreLabel(percentage)}`}
      >
        <span className="sr-only">{percentage}% - {getScoreLabel(percentage)}</span>
      </div>
    </div>
  );
}

export default ProgressBar;