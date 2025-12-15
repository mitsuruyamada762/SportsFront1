import React, { useState } from 'react';
import {
  CompetitionTitle,
  CompetitionFilter,
  CompetitionList,
  type DateGroup,
  type CategoryGroup,
} from '@/theme1/components/common';
import './index.scss';

const initialMatches: DateGroup[] = [
  {
    date: '21.01.2026',
    isExpanded: true,
    matches: [
      {
        id: '1',
        homeTeam: 'FC Kairat Almaty',
        awayTeam: 'Club Brugge',
        time: '00:30',
        isFavorite: true,
        winningOdds: {
          home: { value: '4.33', change: { direction: 'down' } },
          draw: { value: '4.50', change: { direction: 'up' } },
          away: { value: '1.69', change: null },
        },
        handicapOdds: {
          handicap: '+0.75-',
          home: { value: '2.00', change: null },
          away: { value: '1.85', change: { direction: 'up' } },
        },
        totalsOdds: {
          total: '2.75',
          over: { value: '1.88', change: null },
          under: { value: '1.96', change: { direction: 'down' } },
        },
        moreBetsCount: 324,
      },
      {
        id: '2',
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        time: '02:00',
        isFavorite: false,
        winningOdds: {
          home: { value: '2.10', change: null },
          draw: { value: '3.20', change: { direction: 'up' } },
          away: { value: '3.50', change: { direction: 'down' } },
        },
        handicapOdds: {
          handicap: '+1.5-',
          home: { value: '1.90', change: null },
          away: { value: '1.95', change: null },
        },
        totalsOdds: {
          total: '3.5',
          over: { value: '2.10', change: { direction: 'up' } },
          under: { value: '1.75', change: null },
        },
        moreBetsCount: 287,
      },
      {
        id: '3',
        homeTeam: 'Team C',
        awayTeam: 'Team D',
        time: '18:45',
        isFavorite: true,
        winningOdds: {
          home: { value: '1.85', change: { direction: 'up' } },
          draw: { value: '3.60', change: null },
          away: { value: '4.20', change: { direction: 'down' } },
        },
        handicapOdds: {
          handicap: '0',
          home: { value: '1.95', change: null },
          away: { value: '1.90', change: null },
        },
        totalsOdds: {
          total: '2.5',
          over: { value: '1.80', change: null },
          under: { value: '2.05', change: { direction: 'up' } },
        },
        moreBetsCount: 312,
      },
    ],
  },
  {
    date: '1.01.2026',
    isExpanded: true,
    matches: [
      {
        id: '1',
        homeTeam: 'FC Kairat Almaty',
        awayTeam: 'Club Brugge',
        time: '00:30',
        isFavorite: true,
        winningOdds: {
          home: { value: '4.33', change: { direction: 'down' } },
          draw: { value: '4.50', change: { direction: 'up' } },
          away: { value: '1.69', change: null },
        },
        handicapOdds: {
          handicap: '+0.75-',
          home: { value: '2.00', change: null },
          away: { value: '1.85', change: { direction: 'up' } },
        },
        totalsOdds: {
          total: '2.75',
          over: { value: '1.88', change: null },
          under: { value: '1.96', change: { direction: 'down' } },
        },
        moreBetsCount: 324,
      },
      {
        id: '2',
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        time: '02:00',
        isFavorite: false,
        winningOdds: {
          home: { value: '2.10', change: null },
          draw: { value: '3.20', change: { direction: 'up' } },
          away: { value: '3.50', change: { direction: 'down' } },
        },
        handicapOdds: {
          handicap: '+1.5-',
          home: { value: '1.90', change: null },
          away: { value: '1.95', change: null },
        },
        totalsOdds: {
          total: '3.5',
          over: { value: '2.10', change: { direction: 'up' } },
          under: { value: '1.75', change: null },
        },
        moreBetsCount: 287,
      },
      {
        id: '3',
        homeTeam: 'Team C',
        awayTeam: 'Team D',
        time: '18:45',
        isFavorite: true,
        winningOdds: {
          home: { value: '1.85', change: { direction: 'up' } },
          draw: { value: '3.60', change: null },
          away: { value: '4.20', change: { direction: 'down' } },
        },
        handicapOdds: {
          handicap: '0',
          home: { value: '1.95', change: null },
          away: { value: '1.90', change: null },
        },
        totalsOdds: {
          total: '2.5',
          over: { value: '1.80', change: null },
          under: { value: '2.05', change: { direction: 'up' } },
        },
        moreBetsCount: 312,
      },
    ],
  },
  {
    date: '26.01.2026',
    isExpanded: true,
    matches: [
      {
        id: '1',
        homeTeam: 'FC Kairat Almaty',
        awayTeam: 'Club Brugge',
        time: '00:30',
        isFavorite: true,
        winningOdds: {
          home: { value: '4.33', change: { direction: 'down' } },
          draw: { value: '4.50', change: { direction: 'up' } },
          away: { value: '1.69', change: null },
        },
        handicapOdds: {
          handicap: '+0.75-',
          home: { value: '2.00', change: null },
          away: { value: '1.85', change: { direction: 'up' } },
        },
        totalsOdds: {
          total: '2.75',
          over: { value: '1.88', change: null },
          under: { value: '1.96', change: { direction: 'down' } },
        },
        moreBetsCount: 324,
      },
      {
        id: '2',
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        time: '02:00',
        isFavorite: false,
        winningOdds: {
          home: { value: '2.10', change: null },
          draw: { value: '3.20', change: { direction: 'up' } },
          away: { value: '3.50', change: { direction: 'down' } },
        },
        handicapOdds: {
          handicap: '+1.5-',
          home: { value: '1.90', change: null },
          away: { value: '1.95', change: null },
        },
        totalsOdds: {
          total: '3.5',
          over: { value: '2.10', change: { direction: 'up' } },
          under: { value: '1.75', change: null },
        },
        moreBetsCount: 287,
      },
      {
        id: '3',
        homeTeam: 'Team C',
        awayTeam: 'Team D',
        time: '18:45',
        isFavorite: true,
        winningOdds: {
          home: { value: '1.85', change: { direction: 'up' } },
          draw: { value: '3.60', change: null },
          away: { value: '4.20', change: { direction: 'down' } },
        },
        handicapOdds: {
          handicap: '0',
          home: { value: '1.95', change: null },
          away: { value: '1.90', change: null },
        },
        totalsOdds: {
          total: '2.5',
          over: { value: '1.80', change: null },
          under: { value: '2.05', change: { direction: 'up' } },
        },
        moreBetsCount: 312,
      },
    ],
  },
  {
    date: '24.01.2026',
    isExpanded: true,
    matches: [
      {
        id: '1',
        homeTeam: 'FC Kairat Almaty',
        awayTeam: 'Club Brugge',
        time: '00:30',
        isFavorite: true,
        winningOdds: {
          home: { value: '4.33', change: { direction: 'down' } },
          draw: { value: '4.50', change: { direction: 'up' } },
          away: { value: '1.69', change: null },
        },
        handicapOdds: {
          handicap: '+0.75-',
          home: { value: '2.00', change: null },
          away: { value: '1.85', change: { direction: 'up' } },
        },
        totalsOdds: {
          total: '2.75',
          over: { value: '1.88', change: null },
          under: { value: '1.96', change: { direction: 'down' } },
        },
        moreBetsCount: 324,
      },
      {
        id: '2',
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        time: '02:00',
        isFavorite: false,
        winningOdds: {
          home: { value: '2.10', change: null },
          draw: { value: '3.20', change: { direction: 'up' } },
          away: { value: '3.50', change: { direction: 'down' } },
        },
        handicapOdds: {
          handicap: '+1.5-',
          home: { value: '1.90', change: null },
          away: { value: '1.95', change: null },
        },
        totalsOdds: {
          total: '3.5',
          over: { value: '2.10', change: { direction: 'up' } },
          under: { value: '1.75', change: null },
        },
        moreBetsCount: 287,
      },
      {
        id: '3',
        homeTeam: 'Team C',
        awayTeam: 'Team D',
        time: '18:45',
        isFavorite: true,
        winningOdds: {
          home: { value: '1.85', change: { direction: 'up' } },
          draw: { value: '3.60', change: null },
          away: { value: '4.20', change: { direction: 'down' } },
        },
        handicapOdds: {
          handicap: '0',
          home: { value: '1.95', change: null },
          away: { value: '1.90', change: null },
        },
        totalsOdds: {
          total: '2.5',
          over: { value: '1.80', change: null },
          under: { value: '2.05', change: { direction: 'up' } },
        },
        moreBetsCount: 312,
      },
    ],
  },
  {
    date: '22.01.2026',
    isExpanded: false,
    matches: [
      {
        id: '4',
        homeTeam: 'Team E',
        awayTeam: 'Team F',
        time: '20:00',
        isFavorite: false,
        winningOdds: {
          home: { value: '2.50', change: null },
          draw: { value: '3.00', change: null },
          away: { value: '2.80', change: null },
        },
        handicapOdds: {
          handicap: '-1.75+',
          home: { value: '2.15', change: null },
          away: { value: '1.70', change: null },
        },
        totalsOdds: {
          total: '2.75',
          over: { value: '1.92', change: null },
          under: { value: '1.92', change: null },
        },
        moreBetsCount: 298,
      },
    ],
  },
];

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
    header: 'TOTALS',
    options: [
      { label: 'TOP', value: 'TOP' },
      { label: 'ALL', value: 'ALL' },
    ],
  },
];

export const CompetitionDetailContent: React.FC = () => {
  const [matches, setMatches] = useState<DateGroup[]>(initialMatches);
  const [isMultiColumn, setIsMultiColumn] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('WINNING');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'default'>('default');

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
          leagueName="UEFA Champions League"
          isMultiColumn={isMultiColumn}
          onMultiColumnChange={setIsMultiColumn}
          onListViewClick={handleListViewClick}
          onGridViewClick={handleGridViewClick}
          viewMode={viewMode}
        />

        {/* Betting Categories */}
        <CompetitionFilter
          categories={bettingCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Matches List */}
      <CompetitionList
        dateGroups={matches}
        onToggleDateGroup={toggleDateGroup}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};
