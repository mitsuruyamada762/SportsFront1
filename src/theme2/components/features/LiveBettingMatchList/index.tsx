import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import './index.scss';
import { ImgList } from '@/theme2/utils/const';
import { useWebSocket } from '@/theme2/contexts/WebSocketContext';
import { Competition, Game } from '@/theme2/types';
import Team1Img from '@/theme2/assets/images/team1.png';
import Team2Img from '@/theme2/assets/images/team2.png';
import LiveImg from '@/theme2/assets/images/stream.svg';
import StatImg from '@/theme2/assets/images/stats.svg';
import { OddItem } from '@/theme2/components/common/MatchTable';

// Game item component
const GameItem: React.FC<{ game: Game, sendMessage: any }> = ({ game, sendMessage }) => {
    const { gamesData } = useWebSocket();
    const filteredGamesData = Object.fromEntries(
        Object.entries(gamesData).filter(([, value]) => value?.id)
    );

    const team1 = game.team1_name || 'Team 1';
    const team2 = game.team2_name || 'Team 2';

    // Get info from first info object (info is Record<string, Info>)
    const gameInfo: any = game.info;
    const score1 = gameInfo?.score1 || '0';
    const score2 = gameInfo?.score2 || '0';
    const matchTime = gameInfo?.current_game_time || '0:00';

    // Extract 1X2 odds
    const odds1X2 = { home: '-', draw: '-', away: '-' };

    if (game?.market) {
        const market = Object.values(game.market).find(
            (m: any) => m?.type === 'P1XP2' || m?.type === 'P1P2'
        );

        if (market?.event) {
            Object.values(market.event).forEach((e: any) => {
                const name = e?.name?.trim(); // safe access and trim spaces
                if (name === 'W1') odds1X2.home = String(e.price ?? '-');
                else if (name === 'W2') odds1X2.away = String(e.price ?? '-');
                else if (name === 'Draw' || name === 'X') odds1X2.draw = String(e.price ?? '-');
            });
        }
    }

    const sendData = () => {
        sendMessage({ id: game.id, alias: game.sport_alias, type: "GamesData" })
    }

    const gamesArray = Object.values(filteredGamesData);
    const firstGame = gamesArray.length > 0 ? gamesArray[0] : null;
    const isSelected = firstGame?.id === game.id;

    return (
        <div className={`flex flex-col acc-item items-start gap-2 w-full p-3 transition-colors ${isSelected ? "bg-gray-700" : "bg-[#ffffff14] hover:bg-gray-700"}`}>
            <div className='hover:cursor-pointer' onClick={sendData}>

                <div className='grid grid-cols-[6fr_1fr_2fr] w-full '>
                    <div className='text-[12px] text-white flex gap-1 items-center font-bold'>
                        <img src={Team1Img} alt="Team 1" className='w-4 h-4' />
                        {team1}
                    </div>
                    <div className='text-[12px] text-white'>
                        {score1}
                    </div>
                    <div className='text-[12px] text-white flex gap-1 items-center'>
                        <img src={LiveImg} alt="Live" className='w-4 h-4' style={{ filter: 'brightness(0) invert(1)' }} />
                        <img src={StatImg} alt="Stats" className='w-4 h-4' style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                </div>
                <div className='grid grid-cols-[6fr_1fr_2fr] w-full'>
                    <div className='text-[12px] text-white flex gap-1 items-center font-bold'>
                        <img src={Team2Img} alt="Team 2" className='w-4 h-4' />
                        {team2}
                    </div>
                    <div className='text-[12px] text-white'>
                        {score2}
                    </div>
                    <div className='text-[12px] text-white'>
                        {matchTime}
                    </div>
                </div>
            </div>
            <div className='w-full grid gap-0.5 grid-cols-3' >
                <OddItem label="1" value={odds1X2.home} />
                <OddItem label="X" value={odds1X2.draw} />
                <OddItem label="2" value={odds1X2.away} />
            </div>
        </div>
    );
};


export const MatchItem: React.FC<{ league: Competition, openFlag: boolean, sendMessage: any }> = ({ league, openFlag, sendMessage }) => {
    const tmp: any = league.game
    const games: Game[] = Object.values(tmp);
    const gameCount = games.length;


    return (
        <Disclosure as="div" defaultOpen={true}>
            {({ open }) => {
                const isVisible = !openFlag ? false : open;

                return (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-transparent px-0 pl-2 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring ">
                            <div className="flex items-center gap-2">
                                <div className="text-white font-medium text-[13px]">{games[0].region_alias} - {league.name}</div>
                                {gameCount > 0 && (
                                    <div className='bg-[var(--border-dark)] rounded-full text-[11px] h-5 w-5 flex items-center justify-center'>{gameCount}</div>
                                )}
                            </div>

                            <div className="flex items-center gap-1">
                                <ChevronUpIcon
                                    className={`${!isVisible ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-white transition-transform`}
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className={`p-2 text-s ${!isVisible ? 'hidden' : ''}`}>
                            <div className='flex flex-col gap-0.5'>
                                {games.length > 0 ? (
                                    games.map((game: Game, index: number) => (
                                        <GameItem key={`${game.id}-${index}`} game={game} sendMessage={sendMessage} />
                                    ))

                                ) : (
                                    <div className='text-white text-xs p-2 opacity-60'>No live games</div>
                                )}
                            </div>
                        </Disclosure.Panel>
                    </>
                );
            }}
        </Disclosure>
    )
}

export const LiveBettingMatchAccordion: React.FC<{
    cat: string,
    competitionsData: any,
    sendMessage: any,
    activeCat: string,
    setActiveCat: (cat: string) => void
}> = ({ cat, competitionsData, sendMessage, activeCat, setActiveCat }) => {
    const competition: any = Object.values(competitionsData);

    const isOpen = activeCat === cat;

    const handleToggleCollapse = (e: React.MouseEvent) => {
        e.stopPropagation();

        // Toggle activeCat
        setActiveCat(isOpen ? '' : cat);

        // Send message when opening
        if (!isOpen) {
            sendMessage({
                alias: cat,
                live: true,
                type: "CompetitionData"
            });
        }
    }

    return (
        <div className="w-full" key={cat}>
            <button
                className="flex w-full justify-between rounded-lg bg-transparent pl-2 py-2 pb-0 text-left text-sm font-medium focus:outline-none focus-visible:ring"
                onClick={handleToggleCollapse}
            >
                <div className="flex items-center gap-2">
                    <img src={ImgList[cat] ?? ImgList["Default"]} alt={cat} className="w-4 h-4" />
                    <div className="text-white font-bold text-md capitalize">{cat}</div>
                </div>
                <ChevronUpIcon
                    className={`${!isOpen ? 'rotate-180 transform' : ''} h-5 w-5 text-white transition-transform`}
                />
            </button>

            {isOpen && (
                <div className="pl-2 pr-0 text-s">
                    {competition.map((com: any, index: number) => (
                        <MatchItem
                            key={`${com.id || "competition"}-${index}`}
                            league={com}
                            openFlag={isOpen}
                            sendMessage={sendMessage}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}



export const LiveBettingMatchList: React.FC = () => {
    const { gamesData, liveGamesList, competitionsData, sendMessage } = useWebSocket();

    const filteredCompetitionsData = Object.fromEntries(
        Object.entries(competitionsData).filter(([, value]) => value?.id)
    );
    const filteredGamesData = Object.fromEntries(
        Object.entries(gamesData).filter(([, value]) => value?.id)
    );
    const defaultAlias: string = Object.values(filteredGamesData)[0]?.sport_alias || '';
    const [activeCat, setActiveCat] = useState<string>(defaultAlias);

    useEffect(() => {
        setActiveCat(defaultAlias)
    }, [defaultAlias])
    return (
        <div className="w-full flex flex-col gap-2">
            {Object.values(liveGamesList).map((cat: any) => (
                <LiveBettingMatchAccordion
                    key={cat.id}
                    cat={cat.alias}
                    competitionsData={filteredCompetitionsData}
                    sendMessage={sendMessage}
                    activeCat={activeCat}
                    setActiveCat={setActiveCat}
                />
            ))}
        </div>
    )
}

