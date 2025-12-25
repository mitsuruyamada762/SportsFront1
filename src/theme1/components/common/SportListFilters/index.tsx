import React from 'react';
import { Dropdown } from '@/theme1/components/ui/Dropdown';
import './index.scss';
import { timeFilterItems } from '@/theme1/utils';
import { useWebSocket } from '@/theme1/contexts';

interface SportListFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: 'live' | 'prematch';
  onTabChange: (tab: 'live' | 'prematch') => void;
  liveCount: number;
  prematchCount: number;
  selectedTimeFilter: string | number;
  onTimeFilterChange: (filter: string | number) => void;
}

export const SportListFilters: React.FC<SportListFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  liveCount,
  prematchCount,
  selectedTimeFilter,
  onTimeFilterChange,
}) => {
  const { resetTotalData, sendMessage } = useWebSocket()
  const liveGames = (data: any) => {
    switch (data) {
      case 'live':
        sendMessage({ type: "LiveGamesList" })
        break;
      case 'prematch':
        sendMessage({ type: "SportData" })
        break;
      default:
        break;
    }
    onTabChange(data)
    resetTotalData()

  }
  return (
    <div className="sport-list-filters">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a league or team"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Live/PreMatch Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'live' ? 'active' : ''} border-radius-left`}
          onClick={() => {
            liveGames('live')
          }}
        >
          LIVE ({liveCount})
        </button>
        <button
          className={`tab ${activeTab === 'prematch' ? 'active' : ''} border-radius-right`}
          onClick={() => liveGames('prematch')}
        >
          PreMatch ({prematchCount})
        </button>
      </div>

      {/* Time Filter */}
      <div className="time-filter-wrapper">
        <Dropdown
          items={timeFilterItems}
          selectedValue={selectedTimeFilter}
          width={130}
          onSelect={onTimeFilterChange}
          color={"#434445"}
        />
      </div>
    </div>
  );
};

