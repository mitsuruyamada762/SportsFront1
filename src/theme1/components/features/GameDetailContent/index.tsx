import React, { useState, useMemo } from 'react';
import './index.scss';
import { GameHeader, CategoryTabs, MarketsList } from '@/theme1/components/common';
import type { TeamInfo, CategoryTab } from '@/theme1/components/common';
import type { MarketItem, BettingOption, MarketRow } from '@/theme1/components/common';
import gameImg from '../../../assets/images/soccer.png';
import { useWebSocket } from '@/theme1/contexts';


const convertToMarketItems = (categoryMarkets: Record<string, any>): MarketItem[] => {
  if (!categoryMarkets || typeof categoryMarkets !== 'object') {
    return [];
  }

  const marketItems: MarketItem[] = [];
  let marketIdCounter = 1;


  Object.entries(categoryMarkets).forEach(([marketName, marketData]: [string, any]) => {
    if (!marketData || !marketData.event || !Array.isArray(marketData.event)) {
      return;
    }
    const colCount = marketData.col_count || 1;
    const linkCount = marketData.express_id;
    const hasCashOut = marketData.cashout === 1;
    const displayName = marketData.name || marketData.name_template || marketName;

    if (marketData.event.length === 1) {
      // Case 1: event.length === 1
      const eventObj = marketData.event[0];
      if (!eventObj || typeof eventObj !== 'object') return;

      const eventEntries = Object.entries(eventObj);
      if (eventEntries.length === 0) return;

      // Sort elements by order
      const sortedEntries = eventEntries
        .map(([key, data]: [string, any]) => ({
          key,
          data,
          order: data?.order ?? 999,
        }))
        .sort((a, b) => a.order - b.order);

      const elementCount = sortedEntries.length;
      const hasMoreThanThreeElements = elementCount > 3;

      const rows: MarketRow[] = [];
      const columnNames: string[] = [];

      if (hasMoreThanThreeElements) {
        // If elements.length > 3: name and price in same cell with justify-content: space-between
        // Create rows with colCount cells per row
        for (let i = 0; i < sortedEntries.length; i += colCount) {
          const rowEntries = sortedEntries.slice(i, i + colCount);
          const cells: BettingOption[] = [];

          rowEntries.forEach(({ key, data }) => {
            if (!data) return;
            const eventName = data.name || data.type_1 || key;
            const eventPrice = data.price || data.odds || '0';
            const baseValue = data.base;

            cells.push({
              id: `${marketIdCounter}-${key}`,
              label: eventName, // Name goes in label
              odds: eventPrice.toString(),
              base: baseValue,
              isSelected: false,
            });
          });

          // Fill remaining cells if needed
          while (cells.length < colCount) {
            cells.push({
              id: `${marketIdCounter}-empty-${Math.floor(i / colCount)}-${cells.length}`,
              label: '',
              odds: '',
              isSelected: false,
            });
          }

          rows.push({
            id: `${marketIdCounter}-row-${Math.floor(i / colCount)}`,
            cells: cells,
          });
        }
      } else {
        // If elements.length <= 3:
        // - Show element names in the market table header
        // - Render all data in a single row

        // Header columns: element names
        sortedEntries.forEach(({ key, data }) => {
          if (!data) return;
          const eventName = data.name || data.type_1 || key;
          columnNames.push(eventName);
        });

        // Single row with one cell per element (only odds / base+odds)
        const cells: BettingOption[] = [];
        sortedEntries.forEach(({ key, data }) => {
          if (!data) return;
          const eventPrice = data.price || data.odds || '0';
          const baseValue = data.base;

          cells.push({
            id: `${marketIdCounter}-${key}`,
            label: '', // No label inside cell; names are in header
            odds: eventPrice.toString(),
            base: baseValue,
            isSelected: false,
          });
        });

        if (cells.length > 0) {
          rows.push({
            id: `${marketIdCounter}-row-0`,
            cells,
          });
        }
      }

      if (rows.length > 0) {
        marketItems.push({
          id: marketIdCounter.toString(),
          name: displayName,
          linkCount: linkCount,
          hasCashOut: hasCashOut,
          // For <=3 elements we want everything in a single row,
          // so the effective column count is the number of elements.
          colCount: hasMoreThanThreeElements ? colCount : elementCount,
          rows: rows,
          columns: hasMoreThanThreeElements ? [] : columnNames.slice(0, elementCount),
        });
        marketIdCounter++;
      }
    } else {
      // Case 2: event.length > 1
      const rows: MarketRow[] = [];
      let columnNames: string[] = [];

      marketData.event.forEach((eventObj: any, eventIndex: number) => {
        if (!eventObj || typeof eventObj !== 'object') return;

        const eventEntries = Object.entries(eventObj);
        if (eventEntries.length === 0) return;

        // Sort elements by order
        const sortedEntries = eventEntries
          .map(([key, data]: [string, any]) => ({
            key,
            data,
            order: data?.order ?? 999,
          }))
          .sort((a, b) => a.order - b.order);

        // Get the name from first element for row label
        const firstElementData = sortedEntries[0]?.data;
        const rowLabelName = firstElementData?.name || firstElementData?.type_1 || '';
        
        // Use name as row label (show name in row-label once)
        const rowLabel = rowLabelName || undefined;

        // Set column names from first event
        if (eventIndex === 0) {
          columnNames = sortedEntries.map(({ data }) => data?.name || data?.type_1 || '').slice(0, colCount);
        }

        // Create cells with prices
        const cells: BettingOption[] = [];
        sortedEntries.forEach(({ key, data }) => {
          if (!data) return;
          const eventPrice = data.price || data.odds || '0';
          const baseValue = data.base;

          cells.push({
            id: `${marketIdCounter}-${eventIndex}-${key}`,
            label: '', // No label in cell
            odds: eventPrice.toString(),
            base: baseValue,
            isSelected: false,
          });
        });

        // Fill remaining cells if needed
        while (cells.length < colCount) {
          cells.push({
            id: `${marketIdCounter}-empty-${eventIndex}-${cells.length}`,
            label: '',
            odds: '',
            isSelected: false,
          });
        }

        rows.push({
          id: `${marketIdCounter}-row-${eventIndex}`,
          label: rowLabel,
          cells: cells.slice(0, colCount),
        });
      });

      if (rows.length > 0) {
        marketItems.push({
          id: marketIdCounter.toString(),
          name: displayName,
          linkCount: linkCount,
          hasCashOut: hasCashOut,
          colCount: colCount,
          rows: rows,
          columns: columnNames,
        });
        marketIdCounter++;
      }
    }
  });

  return marketItems;
};

interface GameDetailContentProps {
  fullWidth?: boolean;
}

export const GameDetailContent: React.FC<GameDetailContentProps> = ({ fullWidth = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { sortedMarketsData } = useWebSocket();


  const categoryTabs: CategoryTab[] = useMemo(() => {
    if (!sortedMarketsData || typeof sortedMarketsData !== 'object') {
      return [{ label: 'All', count: null }];
    }

    const tabs: CategoryTab[] = [{ label: 'All', count: null }];
    Object.entries(sortedMarketsData).forEach(([categoryName, markets]: [string, any]) => {
      if (categoryName === 'All') return;
      let marketCount = 0;
      if (markets && typeof markets === 'object') {
        marketCount = Object.keys(markets).length;
      }
      tabs.push({
        label: categoryName,
        count: marketCount > 0 ? marketCount : null,
      });
    });
    return tabs;
  }, [sortedMarketsData]);


  const filteredMarketItems = useMemo(() => {
    if (!sortedMarketsData || typeof sortedMarketsData !== 'object') {
      return [];
    }
    if (activeCategory === 'All') {
      const allMarkets: Record<string, any> = {};
      Object.values(sortedMarketsData).forEach((categoryMarkets: any) => {
        if (categoryMarkets && typeof categoryMarkets === 'object') {
          Object.assign(allMarkets, categoryMarkets);
        }
      });
      return convertToMarketItems(allMarkets);
    }


    const categoryMarkets = sortedMarketsData[activeCategory];
    if (!categoryMarkets || typeof categoryMarkets !== 'object') {
      return [];
    }

    return convertToMarketItems(categoryMarkets);
  }, [activeCategory, sortedMarketsData]);

  const teams: TeamInfo[] = [
    {
      name: 'FC Kairat Almaty',
      status: '36',
      points: '1',
      indicators: ['M', 'M', 'M', 'B', 'M'],
    },
    {
      name: 'Club Brugge',
      status: '30',
      points: '4',
      indicators: ['M', 'M', 'B', 'M', 'M'],
    },
  ];

  return (
    <div
      className="game-detail-content"
      style={fullWidth ? { flex: '0 0 100%' } : undefined}
    >
      <div className="game-detail-header">

        <GameHeader
          backgroundImage={gameImg}
          leagueIcon="bc-i-Soccer"
          leagueName="UEFA Champions League"
          matchDate="21.01.2026, 00:30"
          teams={teams}
        />

      </div>
      <CategoryTabs
        tabs={categoryTabs}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      <MarketsList markets={filteredMarketItems} />

    </div>
  );
};

