import React, { useState, useEffect } from 'react';
import './index.scss';
import { LiveBettingMatchList } from '@/theme2/components/features';
import { BackButton, Filter } from '@/theme2/components';
import WorldCupImg from '@/theme2/assets/images/worldcup.png';
import { NavigableSwiper } from '@/theme2/components/common';
import { FilterProvider } from '@/theme2/contexts';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '@/theme2/contexts/WebSocketContext';
import { MatchEventRow } from '@/theme2/components/common/MatchTable';
import { ProcessedMatch } from '@/theme2/types';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import InfoSVG from '@/theme2/assets/images/info_circle_empty.svg';

export interface SportsCompetitionProps {
    sportName?: string;
    competitionId?: string;
    onBack?: () => void;
}

export const SportsCompetition: React.FC<SportsCompetitionProps> = ({ sportName: propSportName, competitionId: propCompetitionId, onBack }) => {
    const { sportName: paramSportName, competitionId: paramCompetitionId } = useParams<{ sportName?: string; competitionId?: string }>();

    // Use props if provided (from HomePage), otherwise use URL params (from route)
    const sportName = propSportName || paramSportName;
    const competitionId = propCompetitionId || paramCompetitionId;
    const { competitionsData, sendMessage, sportsData } = useWebSocket();
    const [matches, setMatches] = useState<ProcessedMatch[]>([]);
    const [competition, setCompetition] = useState<any>(null);
    const tabs = ['Matches- Qualitying UEFA', 'Matches - Qualifying CONCACAF', 'Matches - Qualifying CAF', "Matches - Qualifying AFC", "Outrights", "Outrights UEFA"]
    const [activeTab, setActiveTab] = useState(tabs[0])

    useEffect(() => {
        if (!competitionId || !sportName) return;

        const compId = parseInt(competitionId);
        const foundCompetition = competitionsData[compId];

        if (foundCompetition) {
            setCompetition(foundCompetition);

            // Get sport alias from sportsData
            const sport = Object.values(sportsData).find((s: any) => s?.name === sportName);
            const sportAlias = sport?.alias || sportName;

            // Request competition data
            sendMessage({
                id: compId,
                alias: sportAlias,
                live: false,
                type: "CompetitionData"
            });
        }
    }, [competitionId, sportName, competitionsData, sportsData, sendMessage]);

    useEffect(() => {
        if (!competition || !competition.game) {
            setMatches([]);
            return;
        }

        const games: any[] = Object.values(competition.game);
        const mapped: ProcessedMatch[] = games.find((g: any) => g.id).map((g: any) => ({
            id: g.id,
            team1: g.team1_name ?? 'Team 1',
            team2: g.team2_name ?? 'Team 2',
            team1Id: g.team1_id,
            team2Id: g.team2_id,
            score1: g.info?.score1 ?? 0,
            score2: g.info?.score2 ?? 0,
            matchTime: g.info?.score1_time ?? '0:00',
            isLive: g.type === 1,
            sportAlias: g.sport_alias,
            competitionId: g.competition_id,
            startTs: g.start_ts,
            currentGameTime: g.info?.current_game_time || 0,
            market: g.market,
            marketsAvailable: (g.markets_count ?? 0) > 0 && !g.is_blocked,
        }));

        setMatches(mapped);
    }, [competition]);

    // Get sport alias for navigation
    const sport = Object.values(sportsData).find((s: any) => s?.name === sportName);
    const sportAlias = sport?.alias || sportName;

    return (
        <FilterProvider>
            <div className='sports-competition'>
                <div className="left-section">
                    <div className="left-section-content">
                        <div className='sports-competition-header flex flex-col gap-4'>
                            <div>
                                {onBack ? (
                                    <button
                                        type='button'
                                        className='btn-back pr-8'
                                        onClick={onBack}
                                    >
                                        <ChevronLeftIcon className='w-4 h-4' />
                                        <div className='flex items-center leading-4'>
                                            Return
                                        </div>
                                    </button>
                                ) : (
                                    <BackButton />
                                )}
                            </div>
                            <div className='flex items-center gap-3'>
                                <img src={WorldCupImg} alt="Competition" className='w-9 h-9' />
                                <div className='flex flex-col items-start'>
                                    <div className='text-[13px] text-white opacity-70'>
                                        {sportName}
                                    </div>
                                    <div className='text-[18px] font-bold text-white '>
                                        {competition?.name || 'Loading...'}
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center  gap-2'>
                                <NavigableSwiper
                                    items={tabs}
                                    variant='default'
                                    renderSlide={(tab) => (
                                        <button
                                            type='button'
                                            className={`tab-btn capitalize ${activeTab === tab ? 'active' : ''}`}
                                            onClick={() => { setActiveTab(tab) }}
                                        >
                                            {tab}
                                        </button>
                                    )}
                                    className='mr-1'
                                />
                                <Filter />
                            </div>

                            <div className='content'>
                                {matches.length === 0 ? (
                                    <div className="no-matches flex items-center justify-center py-4 text-sm text-[#999]">
                                        No matches available
                                    </div>
                                ) : (
                                    matches.map((match) => (
                                        <div key={match.id} className='w-full'>
                                            <MatchEventRow
                                                match={match}
                                                variant="white"
                                                comp="other"
                                                sportFilter={sportAlias}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <div className="right-section-content">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="home-caption">Live Matches</div>
                                <div className="flex items-center">
                                    <button type="button">
                                        <img
                                            src={InfoSVG}
                                            width={20}
                                            height={20}
                                            className="opacity-60 flex items-center justify-center "
                                            style={{ filter: 'brightness(0) invert(1)' }}
                                        />
                                    </button>
                                </div>
                            </div>
                            <LiveBettingMatchList />
                        </div>
                    </div>
                </div>
            </div>
        </FilterProvider>
    )
}
