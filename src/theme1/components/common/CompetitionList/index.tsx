import React from 'react';
import { DateCompetitionTitle, CompetitionMarketItem } from '@/theme1/components/ui';
import './index.scss';

interface OddsChange {
  direction: 'up' | 'down' | null;
}

interface Odds {
  value: string;
  change?: OddsChange;
}

interface HandicapOdds {
  handicap: string;
  home: Odds;
  away: Odds;
}

interface TotalsOdds {
  total: string;
  over: Odds;
  under: Odds;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  isFavorite: boolean;
  winningOdds: {
    home: Odds;
    draw: Odds;
    away: Odds;
  };
  handicapOdds?: HandicapOdds;
  totalsOdds?: TotalsOdds;
  moreBetsCount: number;
}

export interface DateGroup {
  date: string;
  isExpanded: boolean;
  matches: Match[];
}

interface CompetitionListProps {
  dateGroups: DateGroup[];
  onToggleDateGroup: (date: string) => void;
  onToggleFavorite: (matchId: string) => void;
  viewMode?: 'list' | 'grid' | 'default';
}

export const CompetitionList: React.FC<CompetitionListProps> = ({
  dateGroups,
  onToggleDateGroup,
  onToggleFavorite,
  viewMode = 'default',
}) => {
  const isLoading = !dateGroups || dateGroups.length === 0;

  return (
    <div className="competition-list">
      <div className="matches-list">
        {isLoading
          ? Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="date-group date-group--skeleton">
                <div className="date-group--skeleton-header" />
                <div className="matches-container">
                  {Array.from({ length: 4 }).map((__, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="match-row--skeleton"
                    />
                  ))}
                </div>
              </div>
            ))
          : dateGroups.map((dateGroup) => (
              <div key={dateGroup.date} className="date-group">
                <DateCompetitionTitle
                  date={dateGroup.date}
                  isExpanded={dateGroup.isExpanded}
                  onClick={() => onToggleDateGroup(dateGroup.date)}
                />

                {dateGroup.isExpanded && (
                  <div className="matches-container">
                    {dateGroup.matches.map((match) => (
                      <CompetitionMarketItem key={match.id} match={match} viewMode={viewMode} />
                    ))}
                  </div>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

