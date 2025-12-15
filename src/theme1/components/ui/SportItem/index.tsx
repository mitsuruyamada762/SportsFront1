import React from 'react';
import { Sport } from '@/theme1/types/sportGames';
import './index.scss';

interface SportItemProps {
  sport: Sport;
  isExpanded: boolean;
  onClick: () => void;
}

export const SportItem: React.FC<SportItemProps> = ({
  sport,
  isExpanded,
  onClick,
}) => {
  return (
    <div
      className={`sport-item-wrapper list-item ${isExpanded ? 'expanded' : ''}`}
      onClick={onClick}
    >
      <div className="item-content">
        <i className={`sport-icon bc-i-${sport.alias} `} />
        <span className="item-name">{sport.name}</span>
        <span className="item-count">{sport.subTotal || 0}</span>
        <i className={`bc-i-small-arrow-down ${isExpanded ? 'open' : ''} `} aria-hidden="true" />
      </div>
    </div>
  );
};
