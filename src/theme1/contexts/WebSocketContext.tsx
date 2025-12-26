import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
    commands,
    getSportsData,
    getCompetitionsData,
    getGameData,
    getLiveSportsData,
    groupAndSort,
    mergeCompetitionsIntoA,
    mergeGamesIntoA,
    addGamesDataByDate,
    getShowMarketData
} from "@/theme1/utils";

import { Sport, Competition, Game, WSMessage } from "@/theme1/types";

interface GameEvent {
    ball_position?: {
        ball_position?: {
            ball_position_x: number;
            ball_position_y: number;
            valid: boolean;
        };
    };
    team: number;
    type: string;
    ts: number;
}

interface Timer {
    value: number;
    state: string;
    direction: string;
    update_time_ms: number;
}

interface StatLogEvent {
    game_part: string;
    info: any;
    scope: string;
    score: Record<string, string>;
    time_s: number;
    ts: number;
    type: string;
}

interface StatLog {
    log: StatLogEvent[];
    log_id: {
        id: string;
        link_id: string;
        link_type: string;
        parent_id: string;
    };
    next: number;
    prev: number;
}

interface LiveScreenData {
    timer?: Timer;
    game_event?: GameEvent;
    stat_log?: StatLog;
    team1_color?: string;
    team2_color?: string;
    matchId?: string;
}

interface WebSocketContextType {
    socket: WebSocket | null;
    isConnected: boolean;
    sportsData: Record<number, Sport>;
    competitionsData: Record<number, Competition>;
    gamesData: Record<number, Game>;
    sortedMarketsData: any;
    showMarketData: any;
    liveScreenData: LiveScreenData | null;
    sendMessage: (msg: any) => void;
    subscribeToLiveMatch: (matchId: string, feedType?: 'live' | 'full_time' | 'replay') => void;
    resetTotalData: () => void;
    resetCompetitionData: () => void;
    resetGameData: () => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
    socket: null,
    isConnected: false,
    sportsData: {},
    competitionsData: {},
    gamesData: {},
    sortedMarketsData: [],
    showMarketData: {},
    liveScreenData: null,
    sendMessage: () => { },
    subscribeToLiveMatch: () => { },
    resetTotalData: () => { },
    resetCompetitionData: () => { },
    resetGameData: () => { },
});


export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
    children: React.ReactNode;
    maxReconnect?: number;
    reconnectDelay?: number;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    children,
    maxReconnect = 10,
    reconnectDelay = 3000,

}) => {


    const socket = useRef<WebSocket | null>(null);
    const animationSocket = useRef<WebSocket | null>(null);
    const reconnectAttempts = useRef(0);
    const animationReconnectAttempts = useRef(0);
    const [isConnected, setIsConnected] = useState(false);
    const [isAnimationConnected, setIsAnimationConnected] = useState(false);
    const [sportsData, setSportsData] = useState<Record<number, Sport>>([]);
    const [gamesData, setGamesData] = useState<Record<number, Game>>({});
    const [showMarketData, setShowMarketData] = useState<any>({});
    const [tmpGameData, setTmpGameData] = useState<Record<number, Game>>({});
    const [competitionsData, setCompetitionsData] = useState<Record<number, Competition>>({});
    const [tmpCompetitionData, setTmpCompetitionData] = useState<Record<number, Competition>>({});
    const [liveScreenData, setLiveScreenData] = useState<LiveScreenData | null>(null);
    const loggedCompetitions = useRef<Set<number>>(new Set());

    const connectWS = () => {
        if (socket.current?.readyState === WebSocket.OPEN) return;
        socket.current = new WebSocket("wss://eu-swarm-ws-re.betcoswarm.com/");
        socket.current.onopen = () => {
            setIsConnected(true);
            reconnectAttempts.current = 0;
            sendInitialCommands();
        };
        socket.current.onclose = (ev) => {
            setIsConnected(false);

            if (!ev.wasClean && reconnectAttempts.current < maxReconnect) {
                reconnectAttempts.current++;
                setTimeout(connectWS, reconnectDelay);
            }
        };
        socket.current.onerror = () => {
            setIsConnected(false);
        };
        socket.current.onmessage = (event) => {
            let parsed: WSMessage;
            try {
                parsed = JSON.parse(event.data);
            } catch {
                parsed = { data: event.data };
            }
            handleIncoming(parsed);
        };
    };
    const sendInitialCommands = () => {
        if (!socket.current || socket.current.readyState !== WebSocket.OPEN) return;
        commands.forEach((cmd) => {
            socket.current?.send(JSON.stringify(cmd));
        });
        socket.current.send(JSON.stringify(getSportsData()));
    };
    const extractNestedData = (msg: WSMessage): any => {
        let d = msg.data;
        if (d?.data) d = d.data;
        if (d?.data) d = d.data;
        return d;
    };
    const handleIncoming = (message: WSMessage) => {
        const data = message.rid ? extractNestedData(message) : message.data ?? message;
        if (!data) return;

        // Note: Animation/live screen data is handled by handleAnimationMessage
        // from the separate animation WebSocket connection

        if (data.sport) {
            const sports: Sport[] = Object.values(data.sport ?? {})
            const sortedSports = [...sports]
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((s: any) => ({
                    ...s,
                    region: Object.values(s.region)
                        .sort((a: any, b: any) => a.order - b.order)
                        .map((r: any) => ({
                            ...r,
                            competition: Object.values(r.competition)
                                .sort((a: any, b: any) => a.order - b.order),
                        })),
                }));
            setSportsData(sortedSports);
            sendMessage({ id: sortedSports[0]?.region[0]?.competition[0]?.id, alias: sortedSports[0]?.alias, type: "CompetitionData" })
            sendMessage({ id: sortedSports[0]?.region[0]?.competition[0]?.id, type: "ShowMarketData" })
        } else if (data.competition) {
            const competitions: Competition[] = Object.values(data.competition);
            competitions.forEach((competition: any) => {
                if (competition && competition.id && competition.game && Object.keys(competition.game).length > 0) {
                    const competitionWithData: any = addGamesDataByDate(competition);
                    type Game = { id: number };
                    const gameId = (
                        Object.values(competitionWithData.data) as Game[][]
                    )[0][0].id;
                    setCompetitionsData(competitionWithData)
                    sendMessage({ id: gameId, type: "GamesData" })
                }
            });
        }
        else if (data.game) {
            const games: Game[] = Object.values(data.game);
            if (!games[0]?.sport_alias) {
                setShowMarketData(games)
            } else {
                setGamesData(() => {
                    const updated: Record<number, typeof games[0]> = {};
                    games.forEach(g => {
                        if (g.id) {
                            updated[g.id] = { ...g }
                        }
                    });
                    return updated;
                })

            }
        }
        // else if (data.market) {
        //     setShowMarketData(data.market)
        // }
        // if (Object.values(data)
        //     .filter((d: any) => d.competition)) {
        //     const comp = Object.values(data)
        //         .map((d: any) => d.competition)
        //         .filter((c: any) => c);
        //     setTmpCompetitionData(comp)
        // }
        // if (Object.values(data)
        //     .filter((d: any) => d.game)) {

        //     const game = Object.values(data)
        //         .map((d: any) => d.game)
        //         .filter((c: any) => c);
        //     setTmpGameData(game)
        // }
    };
    const sendMessage = async (msgData: any) => {
        msgData.id = msgData.id ?? 0;
        msgData.alias = msgData.alias ?? "";
        msgData.live = msgData.live ?? false;
        console.log(msgData, "MSG")
        if (socket.current?.readyState === WebSocket.OPEN) {
            switch (msgData.type) {
                case 'SportData':
                    socket.current.send(JSON.stringify(getSportsData()));
                    break;
                case 'LiveGamesList':
                    socket.current.send(JSON.stringify(getLiveSportsData()));
                    break;
                case 'CompetitionData':
                    socket.current.send(JSON.stringify(getCompetitionsData(msgData.id, msgData.alias)));
                    break;
                case 'ShowMarketData':
                    socket.current.send(JSON.stringify(getShowMarketData(msgData.id)));
                    break;
                case 'GamesData':
                    socket.current.send(JSON.stringify(getGameData(msgData.id)));
                    break;
                default:
                    return;
            }

        }
        return true;

    };

    const connectAnimationWS = () => {
        if (animationSocket.current?.readyState === WebSocket.OPEN) return;

        const animationUrl = "wss://animation.ml.bcua.io/animation_json_v2?partner_id=1329&site_ref=https://webspor.betcolabs.com/";
        animationSocket.current = new WebSocket(animationUrl);

        animationSocket.current.onopen = () => {
            setIsAnimationConnected(true);
            animationReconnectAttempts.current = 0;
            console.log('Animation WebSocket connected');
        };

        animationSocket.current.onclose = (ev) => {
            setIsAnimationConnected(false);
            if (!ev.wasClean && animationReconnectAttempts.current < maxReconnect) {
                animationReconnectAttempts.current++;
                setTimeout(connectAnimationWS, reconnectDelay);
            }
        };

        animationSocket.current.onerror = () => {
            setIsAnimationConnected(false);
        };

        animationSocket.current.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                handleAnimationMessage(parsed);
            } catch (error) {
                console.error('Error parsing animation WebSocket message:', error);
            }
        };
    };

    const handleAnimationMessage = (message: any) => {
        // Handle animation WebSocket messages
        if (message?.response?.arg) {
            const arg = message.response.arg;
            const event = message.response.event;

            // Handle subscription response with initial state
            if (arg.sub_ok?.state) {
                const state = arg.sub_ok.state;
                state.forEach((item: any) => {
                    if (item.object?.arg) {
                        const itemArg = item.object.arg;

                        // Extract team colors
                        if (itemArg.property) {
                            const teamColor = itemArg.property.properties?.team_color;
                            if (itemArg.property.team === 1) {
                                setLiveScreenData((prev) => ({
                                    ...prev,
                                    team1_color: teamColor
                                }));
                            } else if (itemArg.property.team === 2) {
                                setLiveScreenData((prev) => ({
                                    ...prev,
                                    team2_color: teamColor
                                }));
                            }
                        }

                        // Extract timer
                        if (itemArg.timer) {
                            setLiveScreenData((prev) => ({
                                ...prev,
                                timer: itemArg.timer
                            }));
                        }

                        // Extract game event
                        if (itemArg.game_event) {
                            setLiveScreenData((prev) => ({
                                ...prev,
                                game_event: itemArg.game_event
                            }));
                        }

                        // Extract stat log
                        if (itemArg.stat_log) {
                            setLiveScreenData((prev) => ({
                                ...prev,
                                stat_log: itemArg.stat_log
                            }));
                        }
                    }
                });
            }

            // Handle update messages (event: "updated")
            if (event === "updated" || !event) {
                if (arg.timer) {
                    setLiveScreenData((prev) => ({
                        ...prev,
                        timer: arg.timer
                    }));
                }

                if (arg.game_event) {
                    setLiveScreenData((prev) => ({
                        ...prev,
                        game_event: arg.game_event
                    }));
                }

                if (arg.stat_log) {
                    setLiveScreenData((prev) => {
                        // Merge new stat_log events with existing ones
                        const existingLog = prev?.stat_log?.log || [];
                        const newLog = arg.stat_log.log || [];

                        // Combine and deduplicate by timestamp
                        const combinedLog = [...existingLog, ...newLog];
                        const uniqueLog = combinedLog.filter((event, index, self) =>
                            index === self.findIndex((e) => e.ts === event.ts && e.time_s === event.time_s)
                        );

                        // Sort by time_s
                        uniqueLog.sort((a, b) => a.time_s - b.time_s);

                        return {
                            ...prev,
                            stat_log: {
                                ...arg.stat_log,
                                log: uniqueLog.slice(-50) // Keep last 50 events
                            }
                        };
                    });
                }

                if (arg.property) {
                    const teamColor = arg.property.properties?.team_color;
                    if (arg.property.team === 1) {
                        setLiveScreenData((prev) => ({
                            ...prev,
                            team1_color: teamColor
                        }));
                    } else if (arg.property.team === 2) {
                        setLiveScreenData((prev) => ({
                            ...prev,
                            team2_color: teamColor
                        }));
                    }
                }
            }
        }
    };

    const subscribeToLiveMatch = (matchId: string, feedType: 'live' | 'full_time' | 'replay' = 'live') => {
        // Connect to animation WebSocket if not connected
        if (!animationSocket.current || animationSocket.current.readyState !== WebSocket.OPEN) {
            connectAnimationWS();

            // Wait for connection before subscribing
            const checkConnection = setInterval(() => {
                if (animationSocket.current?.readyState === WebSocket.OPEN) {
                    clearInterval(checkConnection);
                    sendSubscriptionRequest(matchId, feedType);
                } else if (animationSocket.current?.readyState === WebSocket.CLOSED) {
                    clearInterval(checkConnection);
                    console.error('Animation WebSocket connection failed');
                }
            }, 100);

            // Timeout after 5 seconds
            setTimeout(() => {
                clearInterval(checkConnection);
                if (animationSocket.current?.readyState !== WebSocket.OPEN) {
                    console.error('Animation WebSocket connection timeout');
                }
            }, 5000);
            return;
        }

        sendSubscriptionRequest(matchId, feedType);
    };

    const sendSubscriptionRequest = (matchId: string, feedType: 'live' | 'full_time' | 'replay' = 'live') => {
        if (!animationSocket.current || animationSocket.current.readyState !== WebSocket.OPEN) {
            console.warn('Animation WebSocket is not connected. Cannot subscribe to match.');
            return;
        }

        const requestId = Date.now();
        const subscriptionMessage = {
            request: {
                arg: {
                    submatch: {
                        feed_type: feedType, // Can be "live", "full_time", or "replay"
                        gameevents: "true",
                        id: matchId,
                        link_id: "",
                        provider: "animation",
                        snapshot: true
                    }
                },
                meta: {
                    request_id: requestId,
                    ts: requestId
                }
            }
        };

        console.log(`Subscribing to ${feedType} match on animation server:`, matchId, subscriptionMessage);
        animationSocket.current.send(JSON.stringify(subscriptionMessage));

        // Initialize live screen data with match ID
        setLiveScreenData((prev) => ({
            ...prev,
            matchId
        }));
    };

    const game = Object.values(gamesData).find((game: any) => game.id);
    const marketObj = game?.market ?? {};
    const sortedMarketsData = groupAndSort(Object.values(marketObj));
    const resetTotalData = () => {
        setSportsData({})
        setCompetitionsData({});
        setGamesData({})
    };
    const resetCompetitionData = () => {
        setCompetitionsData({});
        setGamesData({})

    }
    const resetGameData = () => {
        setGamesData({})
    }

    // console.log(liveScreenData, "liveScreenData")
    // useEffect(() => {
    //     if (tmpCompetitionData && competitionsData) {
    //         mergeCompetitionsIntoA(competitionsData, tmpCompetitionData[0])
    //     }

    // }, [tmpCompetitionData])

    // useEffect(() => {
    //     const filteredCompetitionsData = Object.fromEntries(
    //         Object.entries(competitionsData).filter(([, value]) => value?.id)
    //     );
    //     const isDifferent = Object.keys(filteredCompetitionsData).length !== Object.keys(competitionsData).length;
    //     if (isDifferent) {
    //         setCompetitionsData(filteredCompetitionsData);
    //     }
    // }, [competitionsData]);

    // useEffect(() => {
    //     if (tmpGameData && gamesData) {
    //         mergeGamesIntoA(gamesData, tmpGameData[0])
    //     }
    // }, [tmpGameData])

    // useEffect(() => {
    //     const filteredData = Object.fromEntries(
    //         Object.entries(gamesData).filter(([, value]) => value?.id)
    //     );
    //     const isDifferent = Object.keys(filteredData).length !== Object.keys(gamesData).length;
    //     if (isDifferent) {
    //         setGamesData(filteredData);
    //     }
    // }, [gamesData]);

    useEffect(() => {
        connectWS();
        return () => {
            socket.current?.close();
            animationSocket.current?.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ socket: socket.current, isConnected, sportsData, competitionsData, gamesData, sortedMarketsData, showMarketData, liveScreenData, sendMessage, subscribeToLiveMatch, resetTotalData, resetCompetitionData, resetGameData }}>
            {children}
        </WebSocketContext.Provider>
    );
};
