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
}

export const CompetitionList: React.FC<CompetitionListProps> = ({
  dateGroups,
  onToggleDateGroup,
  onToggleFavorite,
}) => {
  return (
    <div className="competition-list">
      <div className="matches-list">
        {dateGroups.map((dateGroup) => (
          <div key={dateGroup.date} className="date-group">
            <DateCompetitionTitle
              date={dateGroup.date}
              isExpanded={dateGroup.isExpanded}
              onClick={() => onToggleDateGroup(dateGroup.date)}
            />

            {dateGroup.isExpanded && (
              <div className="matches-container">
                {dateGroup.matches.map((match) => (
                  <CompetitionMarketItem key={match.id} match={match} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
