import React, { useState, useMemo } from 'react';
import { useWebSocket } from '@/theme1/contexts/WebSocketContext';
import { Sport, Region } from '@/theme1/types/sportGames';
import { SportListFilters } from '@/theme1/components/common/SportListFilters';
import { SportListTree } from '@/theme1/components/common/SportListTree';
import './index.scss';

export const SportListSidebar: React.FC = () => {
  const { sportsData, liveGamesList } = useWebSocket();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'live' | 'prematch'>('prematch');
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<{ sportId: number; regionId: number } | null>(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string | number>('all');

  // Calculate counts
  const liveCount = useMemo<number>(() => {
    return (Object.values(liveGamesList || {}) as Sport[]).reduce(
      (sum, sportItem) => sum + (sportItem?.subTotal || 0),
      0
    );
  }, [liveGamesList]);

  const prematchCount = useMemo<number>(() => {
    return (Object.values(sportsData || {}) as Sport[]).reduce((sum, sportItem) => {
      if (sportItem?.region) {
        return sum + (sportItem.subTotal || 0);
      }
      return sum;
    }, 0);
  }, [sportsData]);

  const handleRegionSelect = (sport: Sport, region: Region) => {
    setSelectedRegion({ sportId: sport.id!, regionId: region.id });
  };

  return (
    <div className="sport-list-sidebar">
      <SportListFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        liveCount={liveCount}
        prematchCount={prematchCount}
        selectedTimeFilter={selectedTimeFilter}
        onTimeFilterChange={setSelectedTimeFilter}
      />
      <SportListTree
        searchQuery={searchQuery}
        activeTab={activeTab}
        selectedSport={selectedSport}
        selectedRegion={selectedRegion}
        onSportSelect={setSelectedSport}
        onRegionSelect={handleRegionSelect}
      />
    </div>
  );
};

