import React, { useState, useEffect } from 'react';
import './index.scss';

export interface BettingOption {
  id: string;
  label: string;
  odds: string;
  base?: number | string;
  isSelected?: boolean;
}

export interface MarketRow {
  id: string;
  label?: string;
  cells: BettingOption[];
}

export interface MarketItem {
  id: string;
  name: string;
  linkCount?: number;
  hasCashOut?: boolean;
  hasInfo?: boolean;
  hasList?: boolean;
  colCount?: number;
  options?: BettingOption[];
  rows?: MarketRow[];
  columns?: string[];
}

export interface MarketsListProps {
  markets: MarketItem[];
}

export const MarketsList: React.FC<MarketsListProps> = ({
  markets,
}) => {
  const allMarketIds = markets.map(market => market.id);

  const [expandedMarkets, setExpandedMarkets] = useState<Set<string>>(
    () => new Set(allMarketIds)
  );

  const [headerExpandedState, setHeaderExpandedState] = useState<boolean>(true);

  useEffect(() => {
    const allIds = markets.map(market => market.id);
    setExpandedMarkets(new Set(allIds));
    setHeaderExpandedState(true);
  }, [markets]);

  const handleToggleMarketExpand = (marketId: string) => {
    const newExpanded = new Set(expandedMarkets);
    if (newExpanded.has(marketId)) {
      newExpanded.delete(marketId);
    } else {
      newExpanded.add(marketId);
    }
    setExpandedMarkets(newExpanded);

  };

  const handleToggleAllMarkets = () => {
    if (headerExpandedState) {
      setExpandedMarkets(new Set());
      setHeaderExpandedState(false);
    } else {
      setExpandedMarkets(new Set(allMarketIds));
      setHeaderExpandedState(true);
    }
  };

  return (
    <div className="markets-section">
      <div className="markets-header" onClick={handleToggleAllMarkets}>
        <span className="markets-title">Markets</span>
        <i className={`bc-i-small-arrow-down markets-chevron ${headerExpandedState ? 'expanded' : ''}`}></i>
      </div>

      <div className="markets-list">
        {markets.map((market) => {
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
                {/* {market.hasInfo && (
                  <i className="bc-i-info"></i>
                )} */}
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
                      {market.columns && market.columns.some(col => col.trim() !== '') && (
                        <div
                          className="market-table-header"
                          style={{
                            gridTemplateColumns: `repeat(${market.colCount}, 1fr)`,
                            width: '100%'
                          }}
                        >
                          {/* {market.rows.some(r => r.label) && <div className="table-header-cell"></div>} */}
                          {market.columns.map((column, idx) => (
                            <div key={idx} className="table-header-cell">{column}</div>
                          ))}
                        </div>
                      )}
                      <div className="market-table-body">
                        {market.rows.map((row) => (
                          <div
                            key={row.id}
                            className="table-row"
                            style={{
                              gridTemplateColumns: `repeat(${market.colCount || row.cells.length}, 1fr)`
                            }}
                          >
                            {/* {row.label && (
                              <div className="table-row-label">{row.label}</div>
                            )} */}
                            {row.cells.map((cell) => (
                              <div
                                key={cell.id}
                                className={`table-cell ${cell.isSelected ? 'selected' : ''}`}
                                style={{ width: `100%` }}

                              >
                                {cell.label && cell.odds ? (

                                  <div className="cell-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <span className="cell-label">{cell.label}</span>
                                    {cell.base !== undefined ? (
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className="cell-base">{cell.base}</span>
                                        <span className="cell-odds">{cell.odds}</span>
                                      </div>
                                    ) : (
                                      <span className="cell-odds">{cell.odds}</span>
                                    )}
                                  </div>
                                ) : cell.base !== undefined && cell.odds ? (

                                  <div className="cell-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <span className="cell-base">{cell.base}</span>
                                    <span className="cell-odds">{cell.odds}</span>
                                  </div>
                                ) : cell.odds ? (

                                  <div className="cell-odds">{cell.odds}</div>
                                ) : null}
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
    </div>
  );
};
