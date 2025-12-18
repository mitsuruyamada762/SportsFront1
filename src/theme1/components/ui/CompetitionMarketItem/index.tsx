import React from 'react';
import { Match } from '@/theme1/components/common';
import './index.scss';

interface CompetitionMarketItemProps {
  match: Match;
  viewMode?: 'list' | 'grid' | 'default';
}

export const CompetitionMarketItem: React.FC<CompetitionMarketItemProps> = ({
  match,
  viewMode = 'default',
}) => {
  // Determine which odds to show based on viewMode
  const showWinningOdds = true; // Always show winning odds
  const showTotalsOdds = 
    viewMode === 'default' || viewMode === 'grid'
      ? match.totalsOdds !== undefined // In default/grid mode, show totals if it exists
      : false; // In list mode, don't show totals
  const showHandicapOdds = 
    viewMode === 'grid' 
      ? match.handicapOdds !== undefined // In grid mode, show handicap if it exists
      : false; // In other modes, don't show handicap

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

      {showWinningOdds && (
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
      )}
      {/* In grid mode, show handicap before totals. In default mode, only totals is shown */}
      {showHandicapOdds && match.handicapOdds ? (
        <div className="odds-group">
          <div className="odds-div handicap-value">
            {match.handicapOdds.handicap}
          </div>
          <div className="odds-div">
            <span className="odds-value">{match.handicapOdds.home.value}</span>
          </div>
          <div className="odds-div">
            <span className="odds-value">{match.handicapOdds.away.value}</span>
          </div>
        </div>
      ) : null}
      {showTotalsOdds && match.totalsOdds ? (
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
      ) : null}
      <div className="odds-group">
        <div className="odds-div-market">
          <span className="odds-value-market">+{match.moreBetsCount}</span>
          <i className="bc-i-small-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};
