import React, { useEffect, useMemo } from 'react';
import './index.scss'
import LiveBadge from '@/theme2/components/ui/MatchCard/common/LiveBadge';
import Team1Img from '@/theme2/assets/images/team1.png';
import Team2Img from '@/theme2/assets/images/team2.png';
import StatsIcon from '@/theme2/assets/images/stats.svg';
import _Filter from '../Filter';
import { useFilter } from '@/theme2/contexts/FilterContext';
import { filterItems1, filterItems2, filterItems3 } from '@/theme2/utils/const';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '@/theme2/contexts/WebSocketContext';
import { ProcessedMatch } from '@/theme2/types';

interface MatchTableProps {
    variant?: 'default' | 'white';
    comp?: string;
    sportFilter?: string | "Soccer";
}

const defaultHeaders = [
    filterItems1[0].label,
    filterItems2[0].label,
    filterItems3[0].label
]

export const TeamInfo = ({ logoSrc, teamName, }: { logoSrc: string, teamName: string }) => {
    return (
        <div className="team-info flex items-center gap-2">
            <div className="team-logo">
                <img src={logoSrc} alt={teamName} />
            </div>
            <div className="team-name">
                {teamName}
            </div>
        </div>
    )
}

export const OddItem = ({ label, value, variant = 'default', base }: { label: string, base?: number, value: any, variant?: 'default' | 'white' }) => {
    return (
        <div className={`odds-item ${variant}`}>
            <span className="odds-label">{label}</span>
            <span className="odds-value">{value}</span>
            <span className="odds-value">{base}</span>
        </div>
    )
}

export const MatchEventRow: React.FC<{
    variant?: 'default' | 'white',
    comp?: string,
    match?: ProcessedMatch,
    sportFilter?: string | "Soccer"
}> = ({ variant = 'default', comp = 'livefixture', match, sportFilter }) => {
    const navigate = useNavigate();
    const { sendMessage } = useWebSocket()
    const team1 = match?.team1 || "Team 1";
    const team2 = match?.team2 || "Team 2";
    const score1 = match?.score1 ?? 0;
    const score2 = match?.score2 ?? 0;
    const matchTime = match?.currentGameTime || "0";
    const market: any = match?.market || {}

    const odds1X2: any = market && Object.keys(market).length > 0
        ? Object.values(market)
            .filter((m: any) => m?.type === "P1XP2" || m?.type === "P1P2") // proper comparison
            .map((m: any) => {
                const P1XP2 = { home: 0, draw: 0, away: 0 };
                if (m?.event) {
                    Object.values(m.event).forEach((e: any) => {
                        if (e?.name === "W1") P1XP2.home = e.price;
                        if (e?.name === "W2") P1XP2.away = e.price;
                        if (e?.name === "Draw" || e?.name === "X") P1XP2.draw = e.price;
                    });
                }
                return P1XP2;
            })[0] // get first match
        : null;

    const oddsOverUnder = (() => {
        if (!market || Object.keys(market).length === 0) return null;

        const firstOU: any = Object.values(market).find(
            (m: any) =>
                m?.type === "OverUnder" ||
                m?.type === "TotalGoalsOver/Under" ||
                m?.type === "MatchTotalPointsOverUnder"
        );

        if (!firstOU) return null;

        const result = { over: 0, under: 0, base: 0 };

        if (firstOU.event) {
            Object.values(firstOU.event).forEach((e: any) => {
                const name = e?.name?.trim(); // remove extra spaces
                if (name === "Over") {
                    result.over = e.price;
                    result.base = e.base; // usually base is same for over/under
                } else if (name === "Under") {
                    result.under = e.price;
                    result.base = e.base;
                }
            });
        }

        return result;
    })();


    const oddsBothTeams = (() => {
        if (!market || Object.keys(market).length === 0) return null;

        const bothTeamsMarket: any = Object.values(market).find(
            (m: any) => m?.type === "BothTeamsToScore"
        );

        if (!bothTeamsMarket) return null;

        const result = { Yes: 0, No: 0 };

        if (bothTeamsMarket.event) {
            Object.values(bothTeamsMarket.event).forEach((e: any) => {
                const name = e?.name?.trim(); // safe access and trim spaces
                if (name === "Yes") result.Yes = e.price;
                else if (name === "No") result.No = e.price;
            });
        }

        return result;
    })();



    const handleClick = () => {
        if (comp === 'competitions-internal') {
            return;
        }

        if (match?.id) {
            sendMessage({ id: match?.id, alias: sportFilter || match.sportAlias, type: "GamesData" })

            if (comp === 'other' && match.competitionId) {
                const currentPath = window.location.pathname;
                const matchPath = currentPath.match(/\/sports\/([^/]+)\/competitions\/([^/]+)/);
                if (matchPath) {
                    const [, sportName, competitionId] = matchPath;
                    navigate(`/sports/${sportName}/competitions/${competitionId}/matches/${match.id}`);
                } else {
                    navigate(`/live-betting/${match.id}`);
                }
            } else {
                navigate(`/live-betting/${match.id}`);
            }
        } else {
            comp === 'topbets' ? navigate(`/sports/matches`) : navigate(`/live-betting/1`);
        }
    };

    return (
        <div className={`match-event-row cursor-pointer ${variant === 'white' ? 'white-variant' : ''}`} onClick={handleClick}>
            <div className="flex items-center gap-6 pr-2">
                <div className="team-section flex flex-col gap-1">
                    <TeamInfo
                        logoSrc={Team1Img}
                        teamName={team1}
                    />
                    <TeamInfo
                        logoSrc={Team2Img}
                        teamName={team2}
                    />
                </div>
                <div className='flex flex-col h-full items-end min-h-[40px] justify-between'>
                    <div className='score'>{score1}</div>
                    <div className='score'>{score2}</div>
                </div>
                <div className="match-info">
                    <div className="stats-icon">
                        <img src={StatsIcon} alt="Stats" width={16} height={16} className='white-img' />
                    </div>
                    <div className="match-time w-20">{matchTime}</div>
                </div>
            </div>

            <div className="odds-section grid-cols-3">
                {odds1X2 ? (
                    <>
                        <OddItem label="1" value={odds1X2.home} variant={variant} />
                        <OddItem label="x" value={odds1X2.draw} variant={variant} />
                        <OddItem label="2" value={odds1X2.away} variant={variant} />
                    </>
                ) : (
                    <>
                        <OddItem label="1" value="-" variant={variant} />
                        <OddItem label="x" value="-" variant={variant} />
                        <OddItem label="2" value="-" variant={variant} />
                    </>
                )}
            </div>

            <div className="odds-section grid-cols-2">
                {oddsOverUnder ? (
                    <>
                        <OddItem label={`O ${oddsOverUnder.base || '1.5'}`} value={oddsOverUnder.over} variant={variant} />
                        <OddItem label={`U ${oddsOverUnder.base || '1.5'}`} value={oddsOverUnder.under} variant={variant} />
                    </>
                ) : (
                    <>
                        <OddItem label="O 1.5" value="-" variant={variant} />
                        <OddItem label="U 1.5" value="-" variant={variant} />
                    </>
                )}
            </div>

            {oddsBothTeams ? (
                <div className="odds-section grid-cols-2">
                    <>
                        <OddItem label="GG" value={oddsBothTeams.Yes} variant={variant} />
                        <OddItem label="NG" value={oddsBothTeams.No} variant={variant} />
                    </>
                </div>
            ) : (
                <div className="odds-section">
                    <OddItem label="" value="Markets are not available" variant={variant} />
                </div>
            )}
        </div >
    );
};

export const Footer: React.FC<{ isExpanded: boolean; onToggle: () => void }> = ({ isExpanded, onToggle }) => {
    return (
        <div className="show-more-footer" onClick={onToggle}>
            <span className="show-more-text">
                {isExpanded ? "Show less" : "Show more"}
            </span>
            <span className="arrow-icon">
                {isExpanded ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
        </div>
    );
};

export const MatchTable: React.FC<MatchTableProps> = ({ variant = 'default', comp = 'livefixture', sportFilter }) => {
    const { selectedFilters } = useFilter()
    const { competitionsData, sendMessage } = useWebSocket()
    const [isExpanded, setIsExpanded] = React.useState(false);
    useEffect(() => {
        sendMessage({
            alias: sportFilter,
            live: true,
            type: "CompetitionData"
        });

    }, [sportFilter])
    // Helper function to find label by value
    const findLabelByValue = (value: string | null, items: { label: string, value: string }[]): string => {
        if (!value) return ''
        const item = items.find(item => item.value === value)
        return item ? item.label : ''
    }

    // Get the display names for selected filters, fallback to default headers
    const header1 = findLabelByValue(selectedFilters.column1, filterItems1) || defaultHeaders[0]
    const header2 = findLabelByValue(selectedFilters.column2, filterItems2) || defaultHeaders[1]
    const header3 = findLabelByValue(selectedFilters.column3, filterItems3) || defaultHeaders[2]

    // Build live matches list from websocket games data
    // const [liveMatches, setLiveMatches] = useState<ProcessedMatch[]>([]);

    const liveMatches = useMemo<ProcessedMatch[]>(() => {


        const allGames = Object.values(competitionsData)
            .flatMap((c: any) => Object.values(c?.game ?? {}));

        return allGames
            .filter((g: any) => g?.id)   // keep only games with id
            .map((g: any): ProcessedMatch => ({
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
                currentGameTime:
                    g.info?.current_game_time ||
                    g.info?.current_game_state ||
                    "0",
                market: g.market,
                marketsAvailable:
                    (g.markets_count ?? 0) > 0 && !g.is_blocked,
            }));


    }, [JSON.stringify(competitionsData)]);


    // Limit displayed matches to 10 when not expanded
    const displayedMatches = isExpanded ? liveMatches : liveMatches.slice(0, 10);
    const hasMoreMatches = liveMatches.length > 10;

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`table-container ${variant === 'white' ? 'white-variant' : ''}`}>
            <div className='table-header relative'>
                <div className='flex items-center gap-2'>
                    <div className='title w-40'>
                        Matches - {sportFilter}
                    </div>
                    <LiveBadge />
                </div>
                <div className='table-header-item'>
                    {header1}
                </div>
                <div className='table-header-item'>
                    {header2}
                </div>
                <div className='table-header-item'>
                    {header3}
                </div>
                {/* <div className='table-header-item absolute right-4'>
                    <Filter variant={variant} />
                </div> */}
            </div>
            <div className="table-body">
                {liveMatches.length === 0 ? (
                    <div className="no-matches flex items-center justify-center py-4 text-sm text-[#999]">
                        No live matches available
                    </div>
                ) : (
                    displayedMatches.map((match) => (
                        <MatchEventRow
                            key={match.id}
                            variant={variant}
                            comp={comp}
                            match={match}
                            sportFilter={sportFilter}
                        />
                    ))
                )}
            </div>
            {hasMoreMatches && (
                <div className="table-footer">
                    <Footer isExpanded={isExpanded} onToggle={handleToggle} />
                </div>
            )}
        </div>
    )
}

export default MatchTable
