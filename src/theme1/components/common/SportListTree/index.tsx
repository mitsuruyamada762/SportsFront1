import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useWebSocket } from '@/theme1/contexts/WebSocketContext';
import { Sport, Region, Competition } from '@/theme1/types/sportGames';
import { SPECIAL_ITEMS } from '@/theme1/utils/const';
import { SpecialItem, SportItem, RegionItem, CompetitionItem } from '@/theme1/components/ui';
import './index.scss';

interface SportListTreeProps {
  searchQuery: string;
  activeTab: 'live' | 'prematch';
  selectedSport: Sport | null;
  selectedRegion: { sportId: number; regionId: number } | null;
  onSportSelect: (sport: Sport | null) => void;
  onRegionSelect: (sport: Sport, region: Region) => void;
}

export const SportListTree: React.FC<SportListTreeProps> = ({
  searchQuery,
  activeTab,
  selectedSport,
  selectedRegion,
  onSportSelect,
  onRegionSelect,
}) => {
  
  const { sportsData, competitionsData, sendMessage, resetCompetitionData } = useWebSocket();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | null>(null);
  const hasInitialized = useRef(false);

  // Get sorted sports list
  const sportsList = useMemo(() => {
    const sports = Object.values(sportsData)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return sports.filter(sport =>
        sport.name?.toLowerCase().includes(query) ||
        sport.alias?.toLowerCase().includes(query)
      );
    }
    return sports;
  }, [sportsData, searchQuery]);

  const isLoading = sportsList.length === 0;

  // Auto-expand first sport, first region, and open first competition on initial render
  useEffect(() => {
    if (!hasInitialized.current && !isLoading && sportsList.length > 0) {
      hasInitialized.current = true;
      const firstSport = sportsList[0];
      if (firstSport && firstSport.id) {
        // Expand first sport
        setExpandedItems(new Set([`sport-${firstSport.id}`]));
        
        // Select first sport
        onSportSelect(firstSport);
        
        // Expand first region if available
        if (firstSport.region) {
          const regions = Object.values(firstSport.region);
          if (regions.length > 0) {
            const firstRegion = regions[0];
            setExpandedRegions(new Set([`region-${firstSport.id}-${firstRegion.id}`]));
            
            // Select first region
            onRegionSelect(firstSport, firstRegion);
            
            // Get first competition and trigger its click
            const regionCompetitions: Competition[] = firstRegion.competition
              ? Object.values(firstRegion.competition).filter((c): c is Competition =>
                  !!c && typeof c === 'object' && 'id' in c
                )
              : [];
            
            const dataCompetitions = Object.values(competitionsData)
              .filter((comp): comp is Competition => {
                return !!comp && typeof comp === 'object' && 'id' in comp;
              });
            
            const allCompetitions: Competition[] = [...regionCompetitions];
            const competitionIds = new Set(regionCompetitions.map(c => c.id));
            
            dataCompetitions.forEach(comp => {
              if (comp.id && !competitionIds.has(comp.id)) {
                allCompetitions.push(comp);
                competitionIds.add(comp.id);
              }
            });
            
            const sortedCompetitions = allCompetitions
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            
            // Select first competition
            if (sortedCompetitions.length > 0 && sortedCompetitions[0].id) {
              setSelectedCompetitionId(sortedCompetitions[0].id);
              
              // Trigger the competition click to load data
              const firstCompetition = sortedCompetitions[0];
              if (firstCompetition.id && firstSport.alias) {
                resetCompetitionData();
                sendMessage({
                  id: firstCompetition.id,
                  alias: firstSport.alias,
                  type: 'CompetitionData',
                });
                sendMessage({
                  id: firstCompetition.id,
                  alias: firstSport.alias,
                  type: 'ShowMarketData',
                });
              }
            }
          }
        }
      }
    }
  }, [isLoading, sportsList, competitionsData, onSportSelect, onRegionSelect, sendMessage, resetCompetitionData]);

  const handleItemClick = (itemId: string) => {
    if (itemId === 'popular-tournaments') {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    }
  };

  const handleSportClick = (sport: Sport) => {
    onSportSelect(sport);
    setExpandedItems(prev => {
      const sportKey = `sport-${sport.id}`;
      const newSet = new Set(prev);
      
      // Toggle: if already open, close it; otherwise, open it
      if (newSet.has(sportKey)) {
        newSet.delete(sportKey);
        // Also close all regions for this sport when closing the sport
        setExpandedRegions(prevRegions => {
          const newRegions = new Set(prevRegions);
          // Remove all regions for this sport
          Array.from(newRegions).forEach(key => {
            if (key.startsWith(`region-${sport.id}-`)) {
              newRegions.delete(key);
            }
          });
          return newRegions;
        });
      } else {
        newSet.add(sportKey);
      }
      return newSet;
    });
  };

  const handleRegionClick = (sport: Sport, region: Region) => {
    onRegionSelect(sport, region);
    setExpandedRegions(prev => {
      const regionKey = `region-${sport.id}-${region.id}`;
      const newSet = new Set(prev);
      
      // Toggle: if already open, close it; otherwise, open it
      if (newSet.has(regionKey)) {
        newSet.delete(regionKey);
      } else {
        newSet.add(regionKey);
      }
      return newSet;
    });
  };

  const getRegionCount = (region: Region): number => {
    return region.regionTotal || 0;
  };

  const isSportExpanded = (sportId: number) => expandedItems.has(`sport-${sportId}`);
  const isRegionExpanded = (sportId: number, regionId: number) => expandedRegions.has(`region-${sportId}-${regionId}`);

  return (
    <div className="sport-list-tree">
      <div className="list-container">
        <ul className="sport-list">
          {isLoading ? (
            Array.from({ length: 15 }).map((_, index) => (
              <li key={index} className="list-item list-item--skeleton">
                <div className="list-item--skeleton-bar" />
              </li>
            ))
          ) : (
            <>
              {/* Special Items - Only show for prematch */}
              {activeTab !== 'live' && SPECIAL_ITEMS.map((item) => (
                <SpecialItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  icon={item.icon}
                  hasChildren={item.hasChildren}
                  isExpanded={expandedItems.has(item.id)}
                  onClick={() => handleItemClick(item.id)}
                />
              ))}

              {/* Sports List */}
              {sportsList.map((sport) => {
                const isExpanded = isSportExpanded(sport.id!);

                return (
                  <li key={sport.id} className="sport-item">
                    <SportItem
                      sport={sport}
                      isExpanded={isExpanded}
                      onClick={() => handleSportClick(sport)}
                    />

                    {/* Regions (Countries/Areas) */}
                    {isExpanded && sport.region && (
                      <div className="region-list">
                        {Object.values(sport.region)
                          .map((region) => {
                            const isRegionExp = isRegionExpanded(sport.id!, region.id);

                            // Get competitions for this region
                            const regionCompetitions: Competition[] = region.competition
                              ? Object.values(region.competition).filter((c): c is Competition =>
                                !!c && typeof c === 'object' && 'id' in c
                              )
                              : [];

                            const dataCompetitions = Object.values(competitionsData)
                              .filter((comp): comp is Competition => {
                                return !!comp && typeof comp === 'object' && 'id' in comp;
                              });

                            const allCompetitions: Competition[] = [...regionCompetitions];
                            const competitionIds = new Set(regionCompetitions.map(c => c.id));

                            dataCompetitions.forEach(comp => {
                              if (comp.id && !competitionIds.has(comp.id)) {
                                allCompetitions.push(comp);
                                competitionIds.add(comp.id);
                              }
                            });

                            const sortedCompetitions = allCompetitions
                              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

                            return (
                              <RegionItem
                                key={region.id}
                                region={region}
                                isExpanded={isRegionExp}
                                count={getRegionCount(region)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRegionClick(sport, region);
                                }}
                              >
                                <div className="competition-list-mini">
                                  {sortedCompetitions.map((competition) => {
                                    const gameCount = competition.game 
                                      ? (typeof competition.game === 'object' 
                                          ? Object.keys(competition.game).length 
                                          : competition.game)
                                      : 0;
                                    const isCompetitionSelected = selectedCompetitionId === competition.id;
                                    return (
                                      <CompetitionItem
                                        key={competition.id}
                                        competition={competition}
                                        count={gameCount}
                                        sportAlias={sport.alias}
                                        isSelected={isCompetitionSelected}
                                        onClick={(_e) => {
                                          if (competition.id) {
                                            setSelectedCompetitionId(competition.id);
                                          }
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              </RegionItem>
                            );
                          })}
                      </div>
                    )}
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

