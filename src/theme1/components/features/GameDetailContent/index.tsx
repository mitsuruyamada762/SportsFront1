import React, { useState, useMemo } from 'react';
import './index.scss';
import { GameHeader, CategoryTabs, MarketsList } from '@/theme1/components/common';
import type { TeamInfo, CategoryTab } from '@/theme1/components/common';
import type { MarketItem, BettingOption, MarketRow } from '@/theme1/components/common';
import gameImg from '../../../assets/images/soccer.png';
import { useWebSocket } from '@/theme1/contexts';
import { Loader } from '../../ui';


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

      const eventObj = marketData.event[0];
      if (!eventObj || typeof eventObj !== 'object') return;

      const eventEntries = Object.entries(eventObj);
      if (eventEntries.length === 0) return;
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
              label: eventName,
              odds: eventPrice.toString(),
              base: baseValue,
              isSelected: false,
            });
          });

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
        sortedEntries.forEach(({ key, data }) => {
          if (!data) return;
          const eventName = data.name || data.type_1 || key;
          columnNames.push(eventName);
        });

        const cells: BettingOption[] = [];
        sortedEntries.forEach(({ key, data }) => {
          if (!data) return;
          const eventPrice = data.price || data.odds || '0';
          const baseValue = data.base;

          cells.push({
            id: `${marketIdCounter}-${key}`,
            label: '',
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


          colCount: hasMoreThanThreeElements ? colCount : elementCount,
          rows: rows,
          columns: hasMoreThanThreeElements ? [] : columnNames.slice(0, elementCount),
        });
        marketIdCounter++;
      }
    } else {

      const rows: MarketRow[] = [];
      let columnNames: string[] = [];

      marketData.event.forEach((eventObj: any, eventIndex: number) => {
        if (!eventObj || typeof eventObj !== 'object') return;

        const eventEntries = Object.entries(eventObj);
        if (eventEntries.length === 0) return;


        const sortedEntries = eventEntries
          .map(([key, data]: [string, any]) => ({
            key,
            data,
            order: data?.order ?? 999,
          }))
          .sort((a, b) => a.order - b.order);


        const firstElementData = sortedEntries[0]?.data;
        const rowLabelName = firstElementData?.name || firstElementData?.type_1 || '';


        const rowLabel = rowLabelName || undefined;


        if (eventIndex === 0) {
          columnNames = sortedEntries.map(({ data }) => data?.name || data?.type_1 || '').slice(0, colCount);
        }


        const cells: BettingOption[] = [];
        sortedEntries.forEach(({ key, data }) => {
          if (!data) return;
          const eventPrice = data.price || data.odds || '0';
          const baseValue = data.base;

          cells.push({
            id: `${marketIdCounter}-${eventIndex}-${key}`,
            label: '',
            odds: eventPrice.toString(),
            base: baseValue,
            isSelected: false,
          });
        });


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
  const { sortedMarketsData, gamesData, competitionsData } = useWebSocket();

  // Get selected competition
  const competition = useMemo(() => {
    if (!competitionsData) return null;

    if (competitionsData && typeof competitionsData === 'object' && 'data' in competitionsData) {
      return competitionsData as any;
    }

    const values = Object.values(competitionsData);
    return values.length > 0 ? values[0] : null;
  }, [competitionsData]);

  // Get selected game
  const game = useMemo(() => {
    if (!gamesData || Object.keys(gamesData).length === 0) return null;
    return Object.values(gamesData).find((game: any) => game.id) || null;
  }, [gamesData]);

  // Format date from timestamp
  const formatMatchDate = (timestamp?: number): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  // Get league icon from sport alias
  const leagueIcon = useMemo(() => {
    if (!game?.sport_alias) return 'bc-i-Soccer';
    return `bc-i-${game.sport_alias}`;
  }, [game?.sport_alias]);

  // Get teams from game data
  const teams: TeamInfo[] = useMemo(() => {
    if (!game) return [];
    
    const team1: TeamInfo = {
      name: game.team1_name || '',
      status: '',
      points: '',
      indicators: [],
    };
    
    const team2: TeamInfo = {
      name: game.team2_name || '',
      status: '',
      points: '',
      indicators: [],
    };

    return [team1, team2].filter(team => team.name);
  }, [game]);

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

  return (
    <div
      className="game-detail-content"
      style={fullWidth ? { flex: '0 0 100%' } : undefined}
    >
      {!gamesData || Object.keys(gamesData).length === 0 ? (
        <div style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <Loader />
        </div>
      ) : (<>
        <div className="game-detail-header">

          <GameHeader
            backgroundImage={gameImg}
            leagueIcon={leagueIcon}
            leagueName={competition?.name || ''}
            matchDate={formatMatchDate(game?.start_ts)}
            teams={teams}
            regionAlias={game?.region_alias}
          />

        </div>
        <CategoryTabs
          tabs={categoryTabs}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
        />

        <MarketsList markets={filteredMarketItems} />
      </>
      )}

    </div>
  );
};

