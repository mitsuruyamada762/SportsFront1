import React, { useEffect, useState } from 'react';
import StatImg from '@/theme2/assets/images/statistics-bars.svg';
import BellImg from '@/theme2/assets/images/bell.svg';
import Team1Img from '@/theme2/assets/images/team1.png';
import Team2Img from '@/theme2/assets/images/team2.png';
import CornerImg from '@/theme2/assets/images/corner.svg';
import StatsImg from '@/theme2/assets/images/stats.svg';
import AllCollapseImg from '@/theme2/assets/images/all-collapse.svg';
import AllExpandImg from '@/theme2/assets/images/all-expand.svg';
import './index.scss';
import { SwitchComponent, MatchResultItem, NavigableSwiper } from '@/theme2/components/common';
import { BackButton } from '@/theme2/components';
import { useWebSocket } from '@/theme2/contexts/WebSocketContext';
import { Game } from '@/theme2/types';

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


const MatchStatItem: React.FC<{ xG: string, yellowCard: string, corner: string }> = ({ xG, yellowCard, corner }) => {
    return (
        <div className='flex items-center gap-2 justify-center'>
            <div className="text-[12px] ">
                xG {xG}
            </div>
            <div className='flex items-center gap-1 text-[12px]'>

                <div className='bg-yellow-400 rounded-sm w-3 h-4'>
                </div>
                {yellowCard}
            </div>
            <div className='flex items-center gap-1 text-[12px]'>
                <img src={CornerImg} className="w-4 h-4" />
                {corner}
            </div>
        </div>)
}

export const LiveBettingMainContent: React.FC = () => {
    const [allCollapse, setAllCollapse] = useState(false);
    const [accordionStates, setAccordionStates] = useState<boolean[]>([false, false, false])
    const [activeTab, setActiveTab] = useState('all');
    const [enabled, setEnabled] = useState(true);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [collapseKey, setCollapseKey] = useState(0);
    const { gamesData, sortedMarketsData } = useWebSocket();
    const filteredGamesData = Object.fromEntries(
        Object.entries(gamesData).filter(([, value]) => value?.id)
    );
    const game: Game[] = Object.values(filteredGamesData);
    const infos: any | undefined = game[0]?.info;
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

    let tabs: any = favorites.size > 0 ? ['favoriteMarkets', ...baseTabs] : baseTabs;
    if (tabs.length > 8) {
        tabs = tabs.slice(0, 8);
    }

    const handleToggleAllAccordions = () => {
        const newCollapseState = !allCollapse;
        setAllCollapse(newCollapseState);
        setAccordionStates(accordionStates.map(() => newCollapseState));
        setCollapseKey(prev => prev + 1);
    };

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
        <div className='live-betting-main-content'>
            <div className='header flex justify-between items-center'>
                <BackButton />
                <div className='flex items-center gap-2'>
                    {/* <img src={FraIcon} alt="Fra" className='w-6 h-6 rounded-full' /> */}
                    <div className='text-[var(--text-secondary)] text-md'>
                        {game[0]?.region_alias || 'N/A'} - {game[0]?.sport_alias || 'N/A'}

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
            <div className='content'>
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
                <div className="text-[16px] fond-bold flex  w-full text-center justify-center h-16">
                    {game[0]?.team1_name}
                </div>
                <div className="text-[32px] leading-8 font-extrabold flex items-start justify-center h-16">
                    {infos?.score1} - {infos?.score2}
                </div>
                <div className='text-[16px] font-bold flex  w-full justify-center h-16'>
                    {game[0]?.team2_name}
                </div>
                <MatchStatItem xG="1.24" yellowCard="3" corner="5" />
                <div className='text-[14px] font-bold flex justify-center text-[var(--text-secondary)]'>
                    HT 1-0
                </div>
                <MatchStatItem xG="1.24" yellowCard="3" corner="5" />
            </div>

            <div className='flex w-full justify-between mt-8'>
                <NavigableSwiper
                    variant="default"
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
                <div className='flex items-center gap-2'>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <SwitchComponent enabled={enabled} setEnabled={setEnabled} />
                        <div className='text-[10px] uppercase font-bold opacity-60 flex items-center'>
                            bet builder
                        </div>
                    </div>
                    <div onClick={handleToggleAllAccordions} className={`opacity-60  hover:opacity-100 cursor-pointer ${allCollapse ? 'active' : ''}`}>
                        <img src={allCollapse ? AllCollapseImg : AllExpandImg} alt="all collapse" />
                    </div>
                </div>
            </div>
            <div className="tab-content flex flex-col gap-2">
                {displayedItems.map((item: any) => (
                    <MatchResultItem
                        key={`${item.id}-${collapseKey}`}
                        id={item.id}
                        items={item.items}
                        flag={flag}
                        activeTab={activeTab}
                        isCollapsed={allCollapse}
                        isFavorite={favorites.has(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
            </div>
        </div>
    )
}