import React from 'react';
import './index.scss';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 40, 
  className = '' 
}) => {
  return (
    <div className={`loading-spinner ${className}`} style={{ width: size, height: size }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100"
        className="loading-spinner-svg"
      >
        {/* White circle in center */}
        <circle 
          cx="50" 
          cy="50" 
          r="20" 
          fill="#ffffff"
        />
        {/* Reddish-brown arc on top-right */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="#bc5244"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="55 133"
          strokeDashoffset="10"
          className="loading-spinner-arc"
        />
      </svg>
    </div>
  );
};
