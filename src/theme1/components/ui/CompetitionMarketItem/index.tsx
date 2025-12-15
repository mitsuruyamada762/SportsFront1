import React from 'react';
import { Match } from '@/theme1/components/common';
import './index.scss';

interface CompetitionMarketItemProps {
  match: Match;
}

export const CompetitionMarketItem: React.FC<CompetitionMarketItemProps> = ({
  match,
}) => {
  return (
    <div className="competition-market-item">
      {/* Match Info */}
      <div className="match-info">
        <div className="team-row">
          <span className="team-name">{match.homeTeam}</span>
          <span className="match-time">{match.time}</span>
        </div>
        <div className="team-row">
          <span className="team-name">{match.awayTeam}</span>
          <i className="team-row-fav bc-i-favorite"></i>
        </div>
      </div>

      <div className="odds-group">
        <div className="odds-div">
          <span className="odds-value">{match.winningOdds.home.value}</span>
        </div>
        <div className="odds-div">
          <span className="odds-value">{match.winningOdds.draw.value}</span>
        </div>
        <div className="odds-div">
          <span className="odds-value">{match.winningOdds.away.value}</span>
        </div>
      </div>
      {match.totalsOdds && (
        <div className="odds-group">
          <div className="odds-div handicap-value">
            {match.totalsOdds.total}
          </div>
          <div className="odds-div">
            <span className="odds-value">{match.totalsOdds.over.value}</span>
          </div>
          <div className="odds-div">
            <span className="odds-value">{match.totalsOdds.under.value}</span>
          </div>
        </div>
      )}
      <div className="odds-group">
        <div className="odds-div-market">
          <span className="odds-value-market">+{match.moreBetsCount}</span>
          <i className="bc-i-small-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};
