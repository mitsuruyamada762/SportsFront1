import React from 'react';
import { Competition } from '@/theme1/types/sportGames';
import './index.scss';

interface CompetitionItemProps {
  competition: Competition;
  count: any;
  onClick?: (e: React.MouseEvent) => void;
}

export const CompetitionItem: React.FC<CompetitionItemProps> = ({
  competition,
  count,
  onClick,
}) => {
  return (
    <div
      className="competition-item-wrapper"
      onClick={onClick || ((e) => e.stopPropagation())}
    >
      <div className="list-item competition">
        <div className="item-content">
          <span className="item-name">{competition.name}</span>
          <span className="item-count">{count}</span>
        </div>
      </div>
    </div>
  );
};
