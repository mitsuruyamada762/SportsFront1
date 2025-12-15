import React from 'react';
import { Region } from '@/theme1/types/sportGames';
import './index.scss';

interface RegionItemProps {
  region: Region;
  isExpanded: boolean;
  count: number;
  onClick: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export const RegionItem: React.FC<RegionItemProps> = ({
  region,
  isExpanded,
  count,
  onClick,
  children,
}) => {
  return (
    <div className="region-item-wrapper">
      <div
        className={`list-item region ${isExpanded ? 'expanded' : ''}`}
        onClick={onClick}
      >
        <div className="item-content">
          <span className="region-icon">🌍</span>
          <span className="item-name">{region.name}</span>
          <span className="item-count">{count}</span>
          <i className={`bc-i-small-arrow-down ${isExpanded ? 'open' : ''} `} aria-hidden="true" />
        </div>
      </div>
      {isExpanded && children && (
        <div className="competition-list">
          {children}
        </div>
      )}
    </div>
  );
};
