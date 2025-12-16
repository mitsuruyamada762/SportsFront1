import React, { useState, useEffect } from 'react';
import { SearchCompetitions } from '../SearchCompetitions';
import { Leagues } from '../Leagues';
import "./index.scss";
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useWebSocket } from '@/theme2/contexts/WebSocketContext';
import { MatchEventRow } from '@/theme2/components/common/MatchTable';
import { ProcessedMatch } from '@/theme2/types';
import { MatchesPage } from '@/theme2/pages/MatchesPage';

interface CompetitionsProps {
    data: any,
    type: string,
    sportName: string,
    sportType?: (name: string) => void;
}

export const Competitions: React.FC<CompetitionsProps> = ({
    data,
    sportName,
    type: initialType,
    sportType
}) => {

    const [currentType, setCurrentType] = useState<string>(initialType);
    const [selectedCompetition, setSelectedCompetition] = useState<any>(null);
    const [selectedMatch, setSelectedMatch] = useState<any>(null);
    const [matches, setMatches] = useState<ProcessedMatch[]>([]);

    const { competitionsData, gamesData, sportsData, sendMessage } = useWebSocket();

    const sport: any = Object.values(data).find((s: any) => s?.name === sportName);

    useEffect(() => {
        setCurrentType(initialType);
        setSelectedCompetition(null);
        setSelectedMatch(null);
        setMatches([]);
    }, [sportName, initialType]);

    const getSportAlias = () => {
        const sportObj = Object.values(sportsData).find((s: any) => s?.name === sportName);
        return sportObj?.alias || sportName;
    };

    useEffect(() => {
        if (currentType !== "competition" || !selectedCompetition) return;

        const compId = selectedCompetition.id;
        const foundCompetition = competitionsData[compId];

        if (foundCompetition && foundCompetition.game) {
            const games: any[] = Object.values(foundCompetition.game);

            const mapped: ProcessedMatch[] = games.map((g: any) => ({
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
        } else {
            setMatches([]);
        }

    }, [currentType, selectedCompetition, competitionsData]);
    useEffect(() => {
        if (currentType !== "game" || !selectedMatch) return;

        const foundGame = gamesData[selectedMatch.id];
        if (!foundGame) return;
    }, [currentType, selectedMatch, gamesData]);

    // USER ACTION — competition clicked
    const handleCompetitionClick = (competitionId: string) => {
        const compId = parseInt(competitionId);

        const competition = Object.values(sport.region)
            .flatMap((r: any) => Object.values(r.competition || {}))
            .find((c: any) => c.id === compId);

        if (!competition) return;

        setSelectedCompetition(competition);
        setSelectedMatch(null);
        setCurrentType("competition");
        sendMessage({
            id: compId,
            alias: getSportAlias(),
            live: false,
            type: "CompetitionData"
        });
    };

    const handleMatchClick = (match: ProcessedMatch) => {
        setSelectedMatch(match);
        setCurrentType("game");
        sendMessage({
            id: match.id,
            alias: getSportAlias(),
            type: "GamesData"
        });
    };

    const handleBack = () => {
        if (currentType === "game") {
            setCurrentType("competition");
            setSelectedMatch(null);
        } else if (currentType === "competition") {
            setCurrentType("sport");
            setSelectedCompetition(null);
            setMatches([]);
        } else if (sportType) {
            sportType('live');
        }
    };

    if (!sport || !sport.region) {
        return <div className="competitions-container bg-white">Loading...</div>;
    }

    return (
        <div className='competitions-container bg-white pb-20'>
            <div className='flex items-center gap-3'>
                <button
                    type='button'
                    className='btn-back white pr-8'
                    onClick={handleBack}
                >
                    <ChevronLeftIcon className='w-4 h-4' />
                    <div className='flex items-center leading-4'>Return</div>
                </button>
                <SearchCompetitions />
            </div>

            {currentType === "sport" &&
                Object.values(sport.region).map((r: any) => (
                    <div key={r.id}>
                        <div className="opacity-50 text-md font-semibold text-[#333] px-2">{r.name}</div>
                        <Leagues
                            key={r.id}
                            img={getSportAlias()}
                            data={r.competition}
                            onCompetitionClick={handleCompetitionClick}
                        />
                    </div>
                ))
            }

            {currentType === "competition" && selectedCompetition && (
                <div className='mt-4'>
                    <div className="opacity-50 text-md font-semibold text-[#333] px-2 mb-2">
                        {selectedCompetition.name}
                    </div>

                    {matches.length === 0 ? (
                        <div className="no-matches flex items-center justify-center py-4 text-sm text-[#999]">
                            No matches available
                        </div>
                    ) : (
                        <div className='flex flex-col gap-2'>
                            {matches.map((match) => (
                                <div
                                    key={match.id}
                                    className='w-full cursor-pointer'
                                    onClick={() => handleMatchClick(match)}
                                >
                                    <MatchEventRow
                                        match={match}
                                        variant="white"
                                        comp="competitions-internal"
                                        sportFilter={getSportAlias()}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {currentType === "game" && selectedMatch && (
                <div className='mt-4'>
                    <MatchesPage />
                </div>
            )}
        </div>
    );
};
