import React from 'react';
import { CompetitionDetailContent } from '../CompetitionDetailContent';
import { GameDetailContent } from '../GameDetailContent';
import './index.scss';

interface SportMainContentProps {
  activeTab: 'live' | 'prematch';
}

export const SportMainContent: React.FC<SportMainContentProps> = ({ activeTab }) => {
  const isLive = activeTab === 'live';

  return (
    <div className="sport-main-content">
      {!isLive && <CompetitionDetailContent />}
      <GameDetailContent fullWidth={isLive} />
    </div>
  );
};

