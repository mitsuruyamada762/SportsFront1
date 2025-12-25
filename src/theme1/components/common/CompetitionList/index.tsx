import React, { useState, useEffect, useRef } from 'react';
import { DateCompetitionTitle, CompetitionMarketItem } from '@/theme1/components/ui';
import { useWebSocket } from '@/theme1/contexts/WebSocketContext';
import './index.scss';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  isFavorite: boolean;
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
  categories: any;
}

export const CompetitionList: React.FC<CompetitionListProps> = ({
  dateGroups,
  onToggleDateGroup,
  onToggleFavorite,
  categories,
  viewMode = 'default',
}) => {
  const { resetGameData, liveScreenData, subscribeToLiveMatch, sendMessage, isConnected } = useWebSocket();
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const hasInitialized = useRef<string>('');
  const isLoading = !dateGroups || dateGroups.length === 0;

  // Subscribe to live match data when matchId is provided and WebSocket is connected

  const handleMatchSelect = (matchId: string) => {
    // If already selected, don't do anything
    if (selectedMatchId === matchId) {
      return;
    }

    setSelectedMatchId(matchId);
    resetGameData();

    // Convert matchId to number for sendMessage
    const gameId = typeof matchId === 'string' ? parseInt(matchId, 10) : matchId;
    if (gameId && !isNaN(gameId)) {
      sendMessage({
        id: gameId,
        type: 'GamesData',
      });
    }
  };

  // Auto-select first CompetitionMarketItem on initial render
  useEffect(() => {
    if (!isLoading && dateGroups.length > 0) {
      // Create a unique key from dateGroups to detect when data actually changes
      const dateGroupsKey = dateGroups.map(g => `${g.date}-${g.matches?.length || 0}`).join('|');

      // Only initialize if this is a new set of dateGroups
      if (hasInitialized.current !== dateGroupsKey) {
        // Find first expanded dateGroup with matches, or first dateGroup if none are expanded
        const firstExpandedGroup = dateGroups.find(group => group.isExpanded && group.matches && group.matches.length > 0);
        const firstGroup = dateGroups.find(group => group.matches && group.matches.length > 0);
        const targetGroup = firstExpandedGroup || firstGroup;

        if (targetGroup && targetGroup.matches && targetGroup.matches.length > 0) {
          const firstMatchId = targetGroup.matches[0].id;
          handleMatchSelect(firstMatchId);
          hasInitialized.current = dateGroupsKey;
        }
      }
    }
  }, [isLoading, dateGroups]);

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
                    <CompetitionMarketItem
                      key={match.id}
                      match={match}
                      categories={categories}
                      viewMode={viewMode}
                      isSelected={selectedMatchId === match.id}
                      onClick={() => handleMatchSelect(match.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

