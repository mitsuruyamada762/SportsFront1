import React from 'react';
import { Competition } from '@/theme1/types/sportGames';
import { useWebSocket } from '@/theme1/contexts/WebSocketContext';
import './index.scss';

interface CompetitionItemProps {
  competition: Competition;
  count: any;
  sportAlias?: string;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const CompetitionItem: React.FC<CompetitionItemProps> = ({
  competition,
  count,
  sportAlias,
  isSelected = false,
  onClick,
}) => {
  const { sendMessage, resetCompetitionData } = useWebSocket();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If already selected, don't send messages
    if (isSelected) {
      // Still call custom onClick if provided
      if (onClick) {
        onClick(e);
      }
      return;
    }
    
    resetCompetitionData();
    if (competition.id) {
      sendMessage({
        id: competition.id,
        alias: sportAlias || '',
        type: 'CompetitionData',
      });
      sendMessage({
        id: competition.id,
        alias: sportAlias || '',
        type: 'ShowMarketData',
      });
    }

    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  // Ensure count is always a number for display
  const displayCount = typeof count === 'number'
    ? count
    : (typeof count === 'object' && count !== null
      ? Object.keys(count).length
      : 0);

  return (
    <div
      className="competition-item-wrapper"
      onClick={handleClick}
    >
      <div className={`list-item competition ${isSelected ? 'selected' : ''}`}>
        <div className="item-content">
          <span className="item-name">{competition.name}</span>
          {displayCount > 0 && (
            <span className="item-count">{displayCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};
