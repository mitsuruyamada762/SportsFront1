import React, { useMemo } from 'react';
import { Match } from '@/theme1/components/common';
import { useWebSocket } from '@/theme1/contexts';
import './index.scss';

interface CompetitionMarketItemProps {
  match: Match;
  viewMode?: 'list' | 'grid' | 'default';
  categories: any;
  isSelected?: boolean;
  onClick?: () => void;
}

const extractWinningOdds = (showMarketData: any): { home: string; draw: string; away: string } => {
  if (!showMarketData || typeof showMarketData !== 'object') {
    return { home: '-', draw: '-', away: '-' };
  }

  const marketValues = Object.values(showMarketData) as any[];
  const winnerMarket = marketValues.find(
    (m: any) => m?.type === 'P1XP2' || m?.type === 'MatchResult' || m?.display_key === 'WINNER'
  );

  if (!winnerMarket?.event) {
    return { home: '-', draw: '-', away: '-' };
  }

  const events = Object.values(winnerMarket.event) as any[];
  const odds = { home: '-', draw: '-', away: '-' };

  events.forEach((event: any) => {
    const type1 = event?.type_1 || '';
    const name = event?.name || '';
    const price = event?.price || 0;

    if (type1 === 'W1' || name === 'W1') {
      odds.home = price.toString();
    } else if (type1 === 'W2' || name === 'W2') {
      odds.away = price.toString();
    } else if (type1 === 'X' || name === 'Draw' || name === 'X') {
      odds.draw = price.toString();
    }
  });

  return odds;
};

const extractTotalsOdds = (showMarketData: any): { total: string; over: string; under: string } | undefined => {
  if (!showMarketData || typeof showMarketData !== 'object') {
    return { total: '-', over: '-', under: '-' };

  }

  const marketValues = Object.values(showMarketData) as any[];
  const totalsMarket = marketValues.find(
    (m: any) => m?.type === 'OverUnder' || m?.display_key === 'TOTALS'
  );

  if (!totalsMarket?.event) {
    return { total: '-', over: '-', under: '-' };
  }

  const events = Object.values(totalsMarket.event) as any[];
  const result = { total: '-', over: '-', under: '-' };

  if (events.length > 0 && events[0].base !== undefined) {
    result.total = events[0].base.toString();
  }

  events.forEach((event: any) => {
    const name = (event?.name || '').trim();
    const price = event?.price || 0;

    if (name === 'Over') {
      result.over = price.toString();
    } else if (name === 'Under') {
      result.under = price.toString();
    }
  });

  return result.over !== '-' || result.under !== '-' ? result : undefined;
};

const extractHandicapOdds = (showMarketData: any): { handicap: string; home: string; away: string } | undefined => {
  if (!showMarketData || typeof showMarketData !== 'object') {
    return { handicap: '-', home: '-', away: '-' };
  }

  const marketValues = Object.values(showMarketData) as any[];
  const handicapMarket = marketValues.find(
    (m: any) => m?.display_key === 'HANDICAP' || m?.type === 'Handicap'
  );

  if (!handicapMarket?.event) {
    return { handicap: '-', home: '-', away: '-' };
  }
  const events = Object.values(handicapMarket.event) as any[];
  const result = { handicap: '-', home: '-', away: '-' };

  const baseValues = new Set<number>();

  if (handicapMarket.base !== undefined) {
    baseValues.add(handicapMarket.base);
  }
  events.forEach((event: any) => {
    if (event?.base !== undefined) {
      baseValues.add(event.base);
    }
  });

  if (baseValues.size === 0) {
    result.handicap = '0';
  } else if (baseValues.size === 1) {
    result.handicap = Array.from(baseValues)[0].toString();
  } else {
    const baseArray = Array.from(baseValues).sort((a, b) => b - a); // Sort descending
    const positive = baseArray.find(v => v > 0);
    const negative = baseArray.find(v => v < 0);

    if (positive !== undefined && negative !== undefined) {
      result.handicap = `+${Math.abs(positive)}-`;
    } else {
      result.handicap = baseArray.map(v => v >= 0 ? `+${v}` : v.toString()).join('/');
    }
  }

  events.forEach((event: any) => {
    const type1 = (event?.type_1 || '').trim();
    const price = event?.price || 0;

    if (type1 === 'Home') {
      result.home = price.toString();
    } else if (type1 === 'Away') {
      result.away = price.toString();
    }
  });

  return result.home !== '-' || result.away !== '-' ? result : undefined;
};

export const CompetitionMarketItem: React.FC<CompetitionMarketItemProps> = ({
  match,
  categories,
  viewMode = 'default',
  isSelected = false,
  onClick,
}) => {

  const { showMarketData } = useWebSocket();

  const filteredCategories = React.useMemo(() => {
    if (viewMode === 'list') {
      const winning = categories.filter((cat: any) => cat.header === 'WINNING');
      return { hasWinning: winning }
    } else if (viewMode === 'default') {
      const winning = categories.find((cat: any) => cat.header === 'WINNING');
      const totals = categories.find((cat: any) => cat.header === 'TOTALS');
      return { hasWinning: winning, hasTotals: totals }
    } else {
      const winning = categories.find((cat: any) => cat.header === 'WINNING');
      const handicap = categories.find((cat: any) => cat.header === 'HANDICAP');
      const totals = categories.find((cat: any) => cat.header === 'TOTALS');
      return { hasWinning: winning, hasTotals: totals, hasHandicap: handicap }
    }
  }, [categories, viewMode]);

  const matchMarketData = useMemo(() => {
    if (!showMarketData || !match?.id) {
      return null;
    }
    const marketDataArray = Array.isArray(showMarketData)
      ? showMarketData
      : Object.values(showMarketData || {});
    const matchId = typeof match.id === 'string' ? parseInt(match.id, 10) : match.id;
    const matchedItem = marketDataArray.find((item: any) => {
      const itemId = typeof item?.id === 'string' ? parseInt(item.id, 10) : item?.id;
      return itemId === matchId;
    });
    return matchedItem?.market || null;
  }, [showMarketData, match?.id]);
  const winningOdds = useMemo(() => extractWinningOdds(matchMarketData), [matchMarketData]);
  const totalsOdds = useMemo(() => extractTotalsOdds(matchMarketData), [matchMarketData]);
  const handicapOdds = useMemo(() => extractHandicapOdds(matchMarketData), [matchMarketData]);
  const showWinningOdds = filteredCategories.hasWinning;
  const showTotalsOdds =
    viewMode === 'default' || viewMode === 'grid'
      ? filteredCategories.hasTotals  // Show totals if category exists and is valid
      : false; // In list mode, don't show totals
  const showHandicapOdds =
    viewMode === 'grid'
      ? filteredCategories.hasHandicap // Show handicap if category exists and is valid
      : false; // In other modes, don't show handicap

  return (
    <div 
      className={`competition-market-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
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

      {showWinningOdds && winningOdds && (
        <div className="odds-group">
          <div className="odds-div">
            <span className="odds-value">{winningOdds.home}</span>
          </div>
          <div className="odds-div">
            <span className="odds-value">{winningOdds.draw}</span>
          </div>
          <div className="odds-div">
            <span className="odds-value">{winningOdds.away}</span>
          </div>
        </div>
      )}
      {/* In grid mode, show handicap before totals. In default mode, only totals is shown */}
      {showHandicapOdds && handicapOdds && (
        <div className="odds-group">
          <div className="odds-div handicap-value">
            {handicapOdds.handicap}
          </div>
          <div className="odds-div">
            <span className="odds-value">{handicapOdds.home}</span>
          </div>
          <div className="odds-div">
            <span className="odds-value">{handicapOdds.away}</span>
          </div>
        </div>
      )}
      {showTotalsOdds && totalsOdds && (
        <div className="odds-group">
          <div className="odds-div handicap-value">
            {totalsOdds.total}
          </div>
          <div className="odds-div">
            <span className="odds-value">{totalsOdds.over}</span>
          </div>
          <div className="odds-div">
            <span className="odds-value">{totalsOdds.under}</span>
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
