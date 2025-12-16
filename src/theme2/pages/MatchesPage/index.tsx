import React, { useEffect, useState } from 'react';
import StatImg from '@/theme2/assets/images/statistics-bars.svg'
import BellImg from '@/theme2/assets/images/bell.svg'
import Team1Img from '@/theme2/assets/images/team1.png';
import Team2Img from '@/theme2/assets/images/team2.png';
import StatsImg from '@/theme2/assets/images/stats.svg';
import './index.scss';
import { MatchResultItem, NavigableSwiper } from '@/theme2/components/common';
import { BackButton } from '@/theme2/components';
import { useWebSocket } from '@/theme2/contexts/WebSocketContext';

const TeamItem: React.FC<{ logo: string }> = ({ logo }) => {
    return (
        <div className='flex flex-col items-center mb-4 h-14'>
            <div className='flex items-center gap-2  bg-white relative rounded-full p-2'>
                <img src={logo} alt={'logo'} className='w-10 h-10 rounded-full' />
                <div className='absolute bottom-0 right-0 bg-blue-400 rounded-full p-1'>
                    <img src={StatImg} className='w-2 h-2' style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
            </div>
        </div>
    )

}

export const MatchesPage: React.FC = () => {
    const [allCollapse, _setAllCollapse] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [collapseKey, _setCollapseKey] = useState(0);
    const { gamesData, sortedMarketsData } = useWebSocket();
    const game: any = Object.values(gamesData).find((game: any) => game.id);
    const infos: any | undefined = game?.info;
    const marketResult = sortedMarketsData.map((group: any) => {
        const updatedItems: any = {};

        Object.entries(group.items).forEach(([key, value]) => {
            const newKey = key + "@" + group.group_name;
            updatedItems[newKey] = value;
        });

        return {
            id: group.group_id,
            items: updatedItems
        };
    });

    const [flag, setFlag] = useState(marketResult.length === 0 ? false : true)
    React.useEffect(() => {
        setActiveTab('All');
    }, []);
    useEffect(() => {
        setFlag(marketResult.length === 0 ? false : true)
    }, [marketResult])

    const baseTabs = sortedMarketsData.reduce((acc: string[], s: any) => {
        return [...acc, s.group_name];
    }, ["All"]);

    const tabs = favorites.size > 0 ? ['favoriteMarkets', ...baseTabs] : baseTabs;

    const handleToggleFavorite = (id: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };


    const displayedItems: any = activeTab === 'favoriteMarkets'
        ? marketResult.filter((item: any) => favorites.has(item.id))
        : marketResult;

    return (
        <div className='matches-page'>
            <div className='header flex justify-between items-center text-black'>
                <BackButton />
                <div className='flex items-center gap-2'>
                    <div className='text-md'>
                        {game?.region_alias || 'N/A'} - {game?.sport_alias || 'N/A'}

                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <button type='button' className="btn rounded-full bg-[var(--bg-card)] p-2 hover:bg-[var(--bg-card-hover)]">
                        <img src={StatsImg} className='w-5 h-5 opacity-70' style={{ filter: 'brightness(0) invert(1)' }} />
                    </button>
                    <button type='button' className="btn rounded-full bg-[var(--bg-card)] p-2 hover:bg-[var(--bg-card-hover)]">
                        <img src={BellImg} className='w-5 h-5 opacity-70' style={{ filter: 'brightness(0) invert(1)' }} />
                    </button>
                </div>
            </div>
            <div className='content text-black'>
                <TeamItem logo={Team1Img} />
                <div>
                    <div className="text-sm bg-[var(--bg-card)] rounded px-3 py-2 font-bold flex items-center justify-center text-center">
                        {!infos?.current_game_time ? "-- -- --" : (
                            infos?.add_minutes == "" &&
                            infos?.current_game_time == "90") ? "Finished" : (
                            infos?.current_game_time == "90" ? ("90" +
                                infos?.add_minutes) :
                                infos?.current_game_time)}
                    </div>
                </div>
                <TeamItem logo={Team2Img} />
                <div className="text-[16px] font-bold flex  w-full text-center justify-center h-16">
                    {game?.team1_name}
                </div>
                <div className="text-[32px] leading-8 font-extrabold flex items-start justify-center h-16">
                    {infos?.score1} - {infos?.score2}
                </div>
                <div className='text-[16px] font-bold flex  w-full justify-center h-16'>
                    {game?.team2_name}
                </div>
            </div>

            <div className='flex w-full justify-between mt-8'>
                <NavigableSwiper
                    variant={"default"}
                    items={tabs}
                    keyExtractor={(tab: any) => tab}
                    renderSlide={(tab) => (
                        <button
                            type='button'
                            className={`tab-btn capitalize ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => { setActiveTab(tab) }}
                        >
                            {tab === 'favoriteMarkets' ? 'favorite markets' : tab}
                        </button>
                    )}
                    className='mr-1'
                />
            </div>
            <div className="tab-content flex flex-col gap-2">
                {displayedItems.map((item: any) => (
                    <MatchResultItem
                        key={`${item.id}-${collapseKey}`}
                        id={item.id}
                        items={item.items}
                        flag={flag}
                        activeTab={activeTab}
                        variant='white'
                        isCollapsed={allCollapse}
                        isFavorite={favorites.has(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
            </div>
        </div>
    )
}