import React from 'react';
import { CompetitionDetailContent } from '../CompetitionDetailContent';
import { GameDetailContent } from '../GameDetailContent';
import './index.scss';

export const SportMainContent: React.FC = () => {
  return (
    <div className="sport-main-content">
      <CompetitionDetailContent />
      <GameDetailContent />
    </div>
  );
};

