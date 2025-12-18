import React, { useState, useEffect, useMemo } from 'react';
import {
  CompetitionTitle,
  CompetitionFilter,
  CompetitionList,
  type DateGroup,
  type CategoryGroup,
  type Match,
} from '@/theme1/components/common';
import './index.scss';
import { useWebSocket } from '@/theme1/contexts';


const bettingCategories: CategoryGroup[] = [
  {
    header: 'WINNING',
    options: [
      { label: '1', value: '1' },
      { label: 'X', value: 'X' },
      { label: '2', value: '2' },
    ],
  },
  {
    header: 'HANDICAP',
    options: [
      { label: 'HOME', value: 'HOME' },
      { label: 'AWAY', value: 'AWAY' },
    ],
  },
  {
    header: 'TOTALS',
    options: [
      { label: 'TOP', value: 'TOP' },
      { label: 'ALL', value: 'ALL' },
    ],
  },
];

// Helper function to extract winning odds from market data
const extractWinningOdds = (market: any): { home: string; draw: string; away: string } => {
  if (!market || typeof market !== 'object') {
    return { home: '-', draw: '-', away: '-' };
  }

  const marketValues = Object.values(market) as any[];
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

// Helper function to extract totals odds from market data
const extractTotalsOdds = (market: any): { total: string; over: string; under: string } | undefined => {
  if (!market || typeof market !== 'object') {
    return undefined;
  }

  const marketValues = Object.values(market) as any[];
  const totalsMarket = marketValues.find(
    (m: any) => m?.type === 'OverUnder' || m?.display_key === 'TOTALS'
  );

  if (!totalsMarket?.event) {
    return undefined;
  }

  const events = Object.values(totalsMarket.event) as any[];
  const result = { total: '2.5', over: '-', under: '-' };

  // Get base value from first event
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

// Helper function to extract handicap odds from market data
const extractHandicapOdds = (market: any): { handicap: string; home: string; away: string } | undefined => {
  if (!market || typeof market !== 'object') {
    return undefined;
  }

  const marketValues = Object.values(market) as any[];
  const handicapMarket = marketValues.find(
    (m: any) => m?.display_key === 'HANDICAP' || m?.type === 'Handicap'
  );

  if (!handicapMarket?.event) {
    return undefined;
  }

  const events = Object.values(handicapMarket.event) as any[];
  const result = { handicap: '0', home: '-', away: '-' };

  // Collect all unique base values from events
  const baseValues = new Set<number>();

  // First, check market base value
  if (handicapMarket.base !== undefined) {
    baseValues.add(handicapMarket.base);
  }

  // Then collect base values from all events
  events.forEach((event: any) => {
    if (event?.base !== undefined) {
      baseValues.add(event.base);
    }
  });

  // Format handicap value
  if (baseValues.size === 0) {
    result.handicap = '0';
  } else if (baseValues.size === 1) {
    // Single value - use as is
    result.handicap = Array.from(baseValues)[0].toString();
  } else {
    // Multiple values - check if one is positive and one is negative
    const baseArray = Array.from(baseValues).sort((a, b) => b - a); // Sort descending
    const positive = baseArray.find(v => v > 0);
    const negative = baseArray.find(v => v < 0);

    if (positive !== undefined && negative !== undefined) {
      // Format as "+0.75-"
      result.handicap = `+${Math.abs(positive)}-`;
    } else {
      // Multiple values but not positive/negative pair - join them
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

// Transform game data to Match format
const transformGameToMatch = (game: any): Match => {
  const winningOdds = extractWinningOdds(game.market);
  const totalsOdds = extractTotalsOdds(game.market);
  const handicapOdds = extractHandicapOdds(game.market);

  return {
    id: String(game.id),
    homeTeam: game.team1_name || 'Team 1',
    awayTeam: game.team2_name || 'Team 2',
    time: game.time || '00:00',
    isFavorite: false,
    winningOdds: {
      home: { value: winningOdds.home },
      draw: { value: winningOdds.draw },
      away: { value: winningOdds.away },
    },
    totalsOdds: totalsOdds ? {
      total: totalsOdds.total,
      over: { value: totalsOdds.over },
      under: { value: totalsOdds.under },
    } : undefined,
    handicapOdds: handicapOdds ? {
      handicap: handicapOdds.handicap,
      home: { value: handicapOdds.home },
      away: { value: handicapOdds.away },
    } : undefined,
    moreBetsCount: game.markets_count || 0,
  };
};

export const CompetitionDetailContent: React.FC = () => {
  const { competitionsData } = useWebSocket();
  const [matches, setMatches] = useState<DateGroup[]>([]);
  const [isMultiColumn, setIsMultiColumn] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'default'>('default');

  // Get the competition object (handle both Record and single object)
  const competition = useMemo(() => {
    if (!competitionsData) return null;

    // If it's a Record, get the first competition
    if (competitionsData && typeof competitionsData === 'object' && 'data' in competitionsData) {
      return competitionsData as any;
    }

    // If it's a Record<number, Competition>, get first value
    const values = Object.values(competitionsData);
    return values.length > 0 ? values[0] : null;
  }, [competitionsData]);

  // Transform competitionsData.data into DateGroup[] format
  useEffect(() => {
    if (!competition || !competition.data || typeof competition.data !== 'object') {
      setMatches([]);
      return;
    }

    const dateGroups: DateGroup[] = Object.entries(competition.data)
      .map(([date, games]: [string, any]) => {
        // Ensure games is an array
        const gamesArray = Array.isArray(games) ? games : [];
        const transformedMatches = gamesArray.map(transformGameToMatch);

        return {
          date,
          isExpanded: true, // Default to expanded
          matches: transformedMatches,
        };
      })
      .sort((a, b) => {
        // Sort dates chronologically (DD.MM.YYYY format)
        const dateA = a.date.split('.').reverse().join('-');
        const dateB = b.date.split('.').reverse().join('-');
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      });

    setMatches(dateGroups);
  }, [competition]);

  const toggleDateGroup = (date: string) => {
    setMatches((prev) =>
      prev.map((group) =>
        group.date === date ? { ...group, isExpanded: !group.isExpanded } : group
      )
    );
  };

  const toggleFavorite = (matchId: string) => {
    setMatches((prev) =>
      prev.map((group) => ({
        ...group,
        matches: group.matches.map((match) =>
          match.id === matchId ? { ...match, isFavorite: !match.isFavorite } : match
        ),
      }))
    );
  };

  const handleListViewClick = () => {
    if (viewMode === 'grid') {
      // If in grid mode, clicking list resets to default
      setViewMode('default');
    } else {
      // If in default mode, clicking list sets to list mode
      setViewMode('list');
    }
  };

  const handleGridViewClick = () => {
    if (viewMode === 'list') {
      // If in list mode, clicking grid resets to default
      setViewMode('default');
    } else if (viewMode === 'default') {
      // If in default mode, clicking grid sets to grid mode
      setViewMode('grid');
    }
  };

  // Determine which categories exist in the matches
  const availableCategories = useMemo(() => {
    const hasWinning = matches.some(group =>
      group.matches.some(match => match.winningOdds)
    );
    const hasHandicap = matches.some(group =>
      group.matches.some(match => match.handicapOdds)
    );
    const hasTotals = matches.some(group =>
      group.matches.some(match => match.totalsOdds)
    );

    const filtered: CategoryGroup[] = [];
    if (hasWinning) {
      filtered.push(bettingCategories.find(cat => cat.header === 'WINNING')!);
    }
    if (hasHandicap) {
      filtered.push(bettingCategories.find(cat => cat.header === 'HANDICAP')!);
    }
    if (hasTotals) {
      filtered.push(bettingCategories.find(cat => cat.header === 'TOTALS')!);
    }
    return filtered.filter(Boolean);
  }, [matches]);

  // Calculate width based on view mode and isMultiColumn
  const getWidth = () => {
    // If checkbox is unchecked, always 50%
    if (!isMultiColumn) return '0 0 50%';

    // If checkbox is checked, use viewMode-based widths
    if (viewMode === 'list') return '0 0 35%';
    if (viewMode === 'grid') return '0 0 100%';
    // viewMode === 'default'
    return '0 0 57%';
  };
  return (
    <div
      className="competition-detail-content"
      style={{ flex: getWidth() }}
    >
      {/* Header Section */}
      <div className="competition-header">
        <CompetitionTitle
          leagueName={competition?.name || "UEFA Champions League"}
          isMultiColumn={isMultiColumn}
          onMultiColumnChange={setIsMultiColumn}
          onListViewClick={handleListViewClick}
          onGridViewClick={handleGridViewClick}
          viewMode={viewMode}
        />

        {/* Betting Categories */}
        <CompetitionFilter
          categories={availableCategories}
          viewMode={viewMode}
        />
      </div>

      {/* Matches List */}
      <CompetitionList
        dateGroups={matches}
        onToggleDateGroup={toggleDateGroup}
        onToggleFavorite={toggleFavorite}
        viewMode={viewMode}
      />
    </div>
  );
};
