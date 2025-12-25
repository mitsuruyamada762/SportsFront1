import React from 'react';
import './index.scss';

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 68, 
  className = '' 
}) => {
  return (
    <div 
      className={`bc-loader-contain ${className}`} 
      style={{ width: size, height: size }}
    >
      <svg 
        className="bc-loader-animation" 
        viewBox="30 30 60 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle 
          className="path" 
          cx="60" 
          cy="60" 
          r="22" 
          fill="none" 
          strokeWidth="4" 
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};
