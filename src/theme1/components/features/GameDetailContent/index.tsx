import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import gameImg from '../../../assets/images/soccer.png'

// Use FootballImg from ImgList as background image

interface BettingOption {
  id: string;
  label: string;
  odds: string;
  isSelected?: boolean;
}

interface MarketRow {
  id: string;
  cells: BettingOption[]; // One option per column
}

interface MarketItem {
  id: string;
  name: string;
  linkCount?: number;
  hasCashOut?: boolean;
  hasInfo?: boolean;
  hasList?: boolean;
  options?: BettingOption[]; // For simple grid layout
  rows?: MarketRow[]; // For table layout
  columns?: string[]; // For table headers like "Top", "All", or team names
}

const categoryTabs = [
  { label: 'ALL', count: null },
  { label: 'Match', count: 57 },
  { label: 'Totals', count: 52 },
  { label: 'Handicapped', count: 27 },
  { label: 'Halves', count: 119 },

];

const marketItems: MarketItem[] = [
  {
    id: '1',
    name: 'Match Result',
    linkCount: 1,
    hasCashOut: true,
    options: [
      { id: '1-1', label: 'Ukraine', odds: '2.48' },
      { id: '1-2', label: 'Tie', odds: '3.02' },
      { id: '1-3', label: 'Swedish', odds: '2.60' },
    ]
  },
  { 
    id: '2', 
    name: 'Double Chance', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '2-1', label: '1X', odds: '1.45' },
      { id: '2-2', label: '12', odds: '1.30' },
      { id: '2-3', label: 'X2', odds: '1.55' },
    ]
  },
  { 
    id: '3', 
    name: 'Match Result (Early Payment)', 
    hasInfo: true, 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '3-1', label: 'Home', odds: '2.20' },
      { id: '3-2', label: 'Draw', odds: '3.10' },
      { id: '3-3', label: 'Away', odds: '2.80' },
    ]
  },
  { 
    id: '4', 
    name: 'Total Goals', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '4-1', label: 'Over 2.5', odds: '1.85' },
      { id: '4-2', label: 'Under 2.5', odds: '1.95' },
      { id: '4-3', label: 'Over 3.5', odds: '2.50' },
    ]
  },
  {
    id: '5',
    name: 'Team 1: Total Goals',
    linkCount: 1,
    hasCashOut: true,
    columns: ['Top', 'All'],
    rows: [
      {
        id: '5-r1', cells: [
          { id: '5-1', label: '0.5', odds: '1.31', isSelected: false },
          { id: '5-2', label: '0.5', odds: '3.15', isSelected: false }
        ]
      },
      {
        id: '5-r2', cells: [
          { id: '5-3', label: '1', odds: '1.50', isSelected: false },
          { id: '5-4', label: '1', odds: '2.50', isSelected: false }
        ]
      },
      {
        id: '5-r3', cells: [
          { id: '5-5', label: '1.5', odds: '1.75', isSelected: false },
          { id: '5-6', label: '1.5', odds: '2.00', isSelected: false }
        ]
      },
      {
        id: '5-r4', cells: [
          { id: '5-7', label: '2', odds: '2.10', isSelected: false },
          { id: '5-8', label: '2', odds: '1.80', isSelected: false }
        ]
      },
    ]
  },
  { 
    id: '6', 
    name: 'Club Brugge : Toplam Gol', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '6-1', label: 'Over 1.5', odds: '1.60' },
      { id: '6-2', label: 'Under 1.5', odds: '2.30' },
      { id: '6-3', label: 'Over 2.5', odds: '2.10' },
    ]
  },
  { 
    id: '7', 
    name: 'Both teams will score.', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '7-1', label: 'Yes', odds: '1.75' },
      { id: '7-2', label: 'No', odds: '2.05' },
    ]
  },
  { 
    id: '8', 
    name: 'Draw Refund', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '8-1', label: 'Home', odds: '2.15' },
      { id: '8-2', label: 'Away', odds: '2.25' },
    ]
  },
  { 
    id: '9', 
    name: 'Goal Handicap', 
    hasList: true,
    options: [
      { id: '9-1', label: '-1', odds: '2.40' },
      { id: '9-2', label: '0', odds: '3.20' },
      { id: '9-3', label: '+1', odds: '1.90' },
    ]
  },
  {
    id: '10',
    name: 'Goals Asian Handicap',
    hasList: true,
    columns: ['Ukraine', 'Swedish'],
    rows: [
      {
        id: '10-r1', cells: [
          { id: '10-1', label: '-2.25', odds: '9.00', isSelected: false },
          { id: '10-2', label: '+2.25', odds: '1.03', isSelected: false }
        ]
      },
      {
        id: '10-r2', cells: [
          { id: '10-3', label: '-1.75', odds: '6.50', isSelected: false },
          { id: '10-4', label: '+1.75', odds: '1.08', isSelected: false }
        ]
      },
      {
        id: '10-r3', cells: [
          { id: '10-5', label: '-1.25', odds: '4.75', isSelected: false },
          { id: '10-6', label: '+1.25', odds: '1.15', isSelected: false }
        ]
      },
      {
        id: '10-r4', cells: [
          { id: '10-7', label: '-0.75', odds: '3.05', isSelected: false },
          { id: '10-8', label: '+0.75', odds: '1.33', isSelected: true }
        ]
      },
      {
        id: '10-r5', cells: [
          { id: '10-9', label: '-0.25', odds: '2.15', isSelected: false },
          { id: '10-10', label: '+0.25', odds: '1.62', isSelected: false }
        ]
      },
      {
        id: '10-r6', cells: [
          { id: '10-11', label: '+0.25', odds: '1.57', isSelected: false },
          { id: '10-12', label: '-0.25', odds: '2.25', isSelected: false }
        ]
      },
      {
        id: '10-r7', cells: [
          { id: '10-13', label: '+0.75', odds: '1.30', isSelected: false },
          { id: '10-14', label: '-0.75', odds: '3.20', isSelected: false }
        ]
      },
      {
        id: '10-r8', cells: [
          { id: '10-15', label: '+1.25', odds: '1.14', isSelected: false },
          { id: '10-16', label: '-1.25', odds: '4.90', isSelected: false }
        ]
      },
      {
        id: '10-r9', cells: [
          { id: '10-17', label: '+1.75', odds: '1.07', isSelected: false },
          { id: '10-18', label: '-1.75', odds: '6.90', isSelected: false }
        ]
      },
      {
        id: '10-r10', cells: [
          { id: '10-19', label: '+2.25', odds: '1.025', isSelected: false },
          { id: '10-20', label: '-2.25', odds: '9.50', isSelected: false }
        ]
      },
    ]
  },
  { 
    id: '11', 
    name: 'Goal Handicap (3-Possible)', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '11-1', label: '-1', odds: '2.60' },
      { id: '11-2', label: '0', odds: '3.50' },
      { id: '11-3', label: '+1', odds: '2.00' },
    ]
  },
  { 
    id: '12', 
    name: 'Total Goals Asia', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '12-1', label: 'Over 2.5', odds: '1.90' },
      { id: '12-2', label: 'Under 2.5', odds: '1.90' },
    ]
  },
  { 
    id: '13', 
    name: 'Total Goals (3-Possible)', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '13-1', label: 'Over', odds: '1.80' },
      { id: '13-2', label: 'Exactly', odds: '3.40' },
      { id: '13-3', label: 'Under', odds: '2.10' },
    ]
  },
  { 
    id: '14', 
    name: 'FC Kairat Almaty Total Goals Asia', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '14-1', label: 'Over 1.5', odds: '1.70' },
      { id: '14-2', label: 'Under 1.5', odds: '2.10' },
    ]
  },
  { 
    id: '15', 
    name: 'Club Brugge Total Goals Asia', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '15-1', label: 'Over 1.5', odds: '1.65' },
      { id: '15-2', label: 'Under 1.5', odds: '2.20' },
    ]
  },
  { 
    id: '16', 
    name: 'Total Goals Odd/Even', 
    linkCount: 1, 
    hasCashOut: true,
    options: [
      { id: '16-1', label: 'Odd', odds: '1.95' },
      { id: '16-2', label: 'Even', odds: '1.95' },
    ]
  },
];

export const GameDetailContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isMarketsExpanded, setIsMarketsExpanded] = useState<boolean>(true);
  const [favoriteMarkets, setFavoriteMarkets] = useState<Set<string>>(new Set());
  const [isTabsScrolled, setIsTabsScrolled] = useState<boolean>(false);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const [expandedMarkets, setExpandedMarkets] = useState<Set<string>>(new Set());
  const navTabsRef = useRef<HTMLDivElement>(null);

  const checkOverflow = () => {
    if (navTabsRef.current) {
      const hasOverflowContent = navTabsRef.current.scrollWidth > navTabsRef.current.clientWidth;
      setHasOverflow(hasOverflowContent);
      const isScrolled = navTabsRef.current.scrollLeft > 0;
      setIsTabsScrolled(isScrolled);
    }
  };

  useEffect(() => {
    checkOverflow();
    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });
    if (navTabsRef.current) {
      resizeObserver.observe(navTabsRef.current);
    }
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
      resizeObserver.disconnect();
    };
  }, []);

  const handleScrollRight = () => {
    if (navTabsRef.current) {
      const scrollAmount = navTabsRef.current.clientWidth * 0.8;
      navTabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (navTabsRef.current) {
      const scrollAmount = navTabsRef.current.clientWidth * 0.8;
      navTabsRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (navTabsRef.current) {
      const scrollLeft = navTabsRef.current.scrollLeft;
      setIsTabsScrolled(scrollLeft > 0);
    }
  };

  const handleToggleFavorite = (marketId: string) => {
    const newFavorites = new Set(favoriteMarkets);
    if (newFavorites.has(marketId)) {
      newFavorites.delete(marketId);
    } else {
      newFavorites.add(marketId);
    }
    setFavoriteMarkets(newFavorites);
  };

  const handleToggleMarketExpand = (marketId: string) => {
    const newExpanded = new Set(expandedMarkets);
    if (newExpanded.has(marketId)) {
      newExpanded.delete(marketId);
    } else {
      newExpanded.add(marketId);
    }
    setExpandedMarkets(newExpanded);
  };

  return (
    <div className="game-detail-content">
      {/* Header Section */}
      <div className="game-header">
        <div className="header-background">
          <img src={gameImg} alt="Soccer field" className="background-image" />
          <div className="header-overlay"></div>
        </div>

        <div className="header-content">
          {/* League Info */}
          <div>

            <div className="league-info">
              <div className="league-icon-wrapper">
                <i className="bc-i-Soccer"></i>
              </div>
              <span className="league-name">UEFA Champions League</span>
            </div>

            {/* Date and Time */}
            <div className="match-date">21.01.2026, 00:30</div>
          </div>
          <div>


            {/* Teams Info */}
            <div className="teams-section">
              <div className="team-info">
                <div className="team-name">FC Kairat Almaty</div>
                <div className="team-status">
                  <span>Status: 36 | Points: 1</span>
                  <div className="status-indicators">
                    <span className="indicator m">M</span>
                    <span className="indicator m">M</span>
                    <span className="indicator m">M</span>
                    <span className="indicator b">B</span>
                    <span className="indicator m">M</span>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <div className="team-name">Club Brugge</div>
                <div className="team-status">
                  <span>Status: 30 | Points: 4</span>
                  <div className="status-indicators">
                    <span className="indicator m">M</span>
                    <span className="indicator m">M</span>
                    <span className="indicator b">B</span>
                    <span className="indicator m">M</span>
                    <span className="indicator m">M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="nav-left">
          <div>
            <i className="bc-i-search"></i>
          </div>
          <div>
            <i className="bc-i-favorite"></i>
          </div>
          {isTabsScrolled && (
            <i
              className="bc-i-small-arrow-right nav-scroll-icon nav-scroll-left"
              onClick={handleScrollLeft}
              style={{ cursor: 'pointer' }}
            ></i>
          )}
        </div>

        <div
          className="nav-tabs"
          ref={navTabsRef}
          onScroll={handleScroll}
        >
          {categoryTabs.map((tab) => (
            <div
              key={tab.label}
              className={`nav-tab ${activeCategory === tab.label ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.label)}
            >
              {tab.label}
              {tab.count !== null && <sup className="tab-count">{tab.count}</sup>}
            </div>
          ))}
        </div>

        {hasOverflow && (
          <div className="nav-right">
            {!isTabsScrolled && (
              <i
                className="bc-i-small-arrow-right nav-scroll-icon"
                onClick={handleScrollRight}
                style={{ cursor: 'pointer' }}
              ></i>
            )}
          </div>
        )}
      </div>

      {/* Markets List */}
      <div className="markets-section">
        <div className="markets-header" onClick={() => setIsMarketsExpanded(!isMarketsExpanded)}>
          <span className="markets-title">Markets</span>
          {/* className={``} */}
          <i className={`bc-i-small-arrow-down markets-chevron ${isMarketsExpanded ? 'expanded' : ''}`}></i>
        </div>

        {isMarketsExpanded && (
          <div className="markets-list">
            {marketItems.map((market) => {
              const isExpanded = expandedMarkets.has(market.id);
              return (
                <div key={market.id} className="market-item-container">
                  <div 
                    className="market-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleMarketExpand(market.id);
                    }}
                  >
                    <i className="bc-i-favorite"></i>
                    <span className="market-name">{market.name}</span>
                    {market.hasInfo && (
                      <i className="bc-i-info"></i>
                    )}
                    <div className="market-actions">
                      {market.linkCount !== undefined && (
                        <div className="action-item">
                          <i className="bc-i-link"></i>
                          <span className="action-count">{market.linkCount}</span>
                        </div>
                      )}
                      {market.hasCashOut && (
                        <i className="bc-i-cashed-out"></i>
                      )}

                      {market.hasList && (
                        <i className="bc-i-view-list"></i>
                      )}
                      <div
                        className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
                        title={isExpanded ? "Collapse" : "Expand"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleMarketExpand(market.id);
                        }}
                      >
                        <i className="bc-i-small-arrow-down"></i>
                      </div>
                    </div>
                  </div>
                  {isExpanded && (market.options || market.rows) && (
                    <div className="market-expanded-content">
                      {market.rows && market.columns ? (
                        <div className="market-table">
                          <div className="market-table-header">
                            {market.columns.map((column, idx) => (
                              <div key={idx} className="table-header-cell">{column}</div>
                            ))}
                          </div>
                          <div className="market-table-body">
                            {market.rows.map((row) => (
                              <div key={row.id} className="table-row">
                                {row.cells.map((cell) => (
                                  <div
                                    key={cell.id}
                                    className={`table-cell ${cell.isSelected ? 'selected' : ''}`}
                                  >
                                    <div className="cell-label">{cell.label}</div>
                                    <div className="cell-odds">{cell.odds}</div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="market-grid">
                          {market.options?.map((option) => (
                            <div key={option.id} className={`market-option ${option.isSelected ? 'selected' : ''}`}>
                              <div className="option-label">{option.label}</div>
                              <div className="option-odds">{option.odds}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

