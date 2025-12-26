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
      { label: 'OVER', value: 'OVER' },
      { label: 'UNDER', value: 'UNDER' },
    ],
  },
];

const transformGameToMatch = (game: any): Match => {
  return {
    id: String(game.id),
    homeTeam: game.team1_name || '',
    awayTeam: game.team2_name || '',
    time: game.time || '00:00',
    isFavorite: false,
    moreBetsCount: game.markets_count || 0,
  };
};

export const CompetitionDetailContent: React.FC = () => {
  const { competitionsData, showMarketData } = useWebSocket();
  const [matches, setMatches] = useState<DateGroup[]>([]);
  const [isMultiColumn, setIsMultiColumn] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'default'>('default');

  const competition = useMemo(() => {
    if (!competitionsData) return null;

    if (competitionsData && typeof competitionsData === 'object' && 'data' in competitionsData) {
      return competitionsData as any;
    }

    const values = Object.values(competitionsData);
    return values.length > 0 ? values[0] : null;
  }, [competitionsData]);

  // Extract region_alias from games data
  const leagueAlias = useMemo(() => {
    if (!competition || !competition.data || typeof competition.data !== 'object') return undefined;
    
    // Get first game from any date group
    const firstDateGames = Object.values(competition.data)[0] as any;
    if (Array.isArray(firstDateGames) && firstDateGames.length > 0) {
      return firstDateGames[0]?.region_alias;
    }
    
    return undefined;
  }, [competition]);

  useEffect(() => {
    if (!competition || !competition.data || typeof competition.data !== 'object') {
      setMatches([]);
      return;
    }

    const dateGroups: DateGroup[] = Object.entries(competition.data)
      .map(([date, games]: [string, any]) => {

        const gamesArray = Array.isArray(games) ? games : [];
        const transformedMatches = gamesArray.map(transformGameToMatch);

        return {
          date,
          isExpanded: true,
          matches: transformedMatches,
        };
      })
      .sort((a, b) => {

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
      setViewMode('default');
    } else {
      setViewMode('list');
    }
  };

  const handleGridViewClick = () => {
    if (viewMode === 'list') {
      setViewMode('default');
    } else if (viewMode === 'default') {
      setViewMode('grid');
    }
  };

  const availableCategories = useMemo(() => {
    let hasWinning = false;
    let hasHandicap = false;
    let hasTotals = false;

    if (showMarketData) {

      const marketDataArray = Array.isArray(showMarketData)
        ? showMarketData
        : Object.values(showMarketData || {});

      marketDataArray.forEach((item: any) => {
        if (item?.market && typeof item.market === 'object') {
          const marketValues = Object.values(item.market) as any[];

          marketValues.forEach((market: any) => {
            const displayKey = market?.display_key;
            const type = market?.type;

            if (!hasWinning && (displayKey === 'WINNER' || type === 'P1XP2' || type === 'MatchResult')) {
              hasWinning = true;
            }
            if (!hasHandicap && (displayKey === 'HANDICAP' || type === 'Handicap' || type === 'AsianHandicap')) {
              hasHandicap = true;
            }
            if (!hasTotals && (displayKey === 'TOTALS' || type === 'OverUnder')) {
              hasTotals = true;
            }
          });
        }
      });
    }

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
  }, [showMarketData]);

  const getWidth = () => {
    if (!isMultiColumn) return '0 0 50%';
    if (viewMode === 'list') return '0 0 35%';
    if (viewMode === 'grid') return '0 0 100%';
    return '0 0 57%';
  };
  
  const flexValue = getWidth();
  const isFullWidth = flexValue === '0 0 100%';
  
  return (
    <div
      className={`competition-detail-content ${isFullWidth ? 'full-width' : ''}`}
      style={{ flex: flexValue }}
    >
      {/* Header Section */}
      <div className="competition-header">
        <CompetitionTitle
          leagueName={competition?.name}
          leagueAlias={leagueAlias}
          isMultiColumn={isMultiColumn}
          onMultiColumnChange={setIsMultiColumn}
          onListViewClick={handleListViewClick}
          onGridViewClick={handleGridViewClick}
          viewMode={viewMode}
        />
        <CompetitionFilter
          categories={availableCategories}
          viewMode={viewMode}
        />
      </div>
      <CompetitionList
        dateGroups={matches}
        categories={availableCategories}
        onToggleDateGroup={toggleDateGroup}
        onToggleFavorite={toggleFavorite}
        viewMode={viewMode}
      />
    </div>
  );
};
