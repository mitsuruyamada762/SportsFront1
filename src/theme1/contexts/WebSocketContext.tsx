import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
    commands,
    getSportsData,
    getCompetitionsData,
    getGameData,
    getLiveSportsData,
    groupAndSort,
    mergeCompetitionsIntoA,
    mergeGamesIntoA
} from "@/theme1/utils";

import { Sport, Competition, Game, WSMessage } from "@/theme1/types";

interface WebSocketContextType {
    socket: WebSocket | null;
    isConnected: boolean;
    sportsData: Record<number, Sport>;
    competitionsData: Record<number, Competition>;
    gamesData: Record<number, Game>;
    sortedMarketsData: any;
    sendMessage: (msg: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType>({
    socket: null,
    isConnected: false,
    sportsData: {},
    competitionsData: {},
    gamesData: {},
    sortedMarketsData: [],
    sendMessage: () => { },
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
    const reconnectAttempts = useRef(0);
    const [isConnected, setIsConnected] = useState(false);
    const [sportsData, setSportsData] = useState<Record<number, Sport>>([]);
    const [gamesData, setGamesData] = useState<Record<number, Game>>({});
    const [tmpGameData, setTmpGameData] = useState<Record<number, Game>>({});
    const [competitionsData, setCompetitionsData] = useState<Record<number, Competition>>({});
    const [tmpCompetitionData, setTmpCompetitionData] = useState<Record<number, Competition>>({});

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
            sendMessage({ id: sortedSports[0]?.region[0]?.competition[0]?.id, alias: sortedSports[0].alias, type: "CompetitionData" })
            setSportsData(sortedSports);
        } else if (data.competition) {
            const competitions: Competition[] = Object.values(data.competition);

            setCompetitionsData(() => {
                const updated: Record<number, typeof competitions[0]> = {};
                competitions.forEach(c => {
                    if (c.id) {
                        updated[c.id] = { ...c };
                    }
                });
                return updated;
            });
        }
        else if (data.game) {
            const games: Game[] = Object.values(data.game);

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
        if (Object.values(data)
            .filter((d: any) => d.competition)) {
            const comp = Object.values(data)
                .map((d: any) => d.competition)
                .filter((c: any) => c);
            setTmpCompetitionData(comp)
        }
        if (Object.values(data)
            .filter((d: any) => d.game)) {

            const game = Object.values(data)
                .map((d: any) => d.game)
                .filter((c: any) => c);
            setTmpGameData(game)
        }
    };
    const sendMessage = async (msgData: any) => {
        msgData.id = msgData.id ?? 0;
        msgData.alias = msgData.alias ?? "";
        msgData.live = msgData.live ?? false;
        if (socket.current?.readyState === WebSocket.OPEN) {
            switch (msgData.type) {
                case 'LiveGamesList':
                    socket.current.send(JSON.stringify(getLiveSportsData()));
                    break;
                case 'CompetitionData':
                    socket.current.send(JSON.stringify(getCompetitionsData(msgData.id, msgData.alias)));
                    break;
                case 'GamesData':
                    socket.current.send(JSON.stringify(getGameData(msgData.id, msgData.alias)));
                    break;
                default:
                    return;
            }

        }
        return true;
    };
    const game = Object.values(gamesData).find((game: any) => game.id);
    const marketObj = game?.market ?? {};
    const sortedMarketsData = groupAndSort(Object.values(marketObj));

    useEffect(() => {
        if (tmpCompetitionData && competitionsData) {
            mergeCompetitionsIntoA(competitionsData, tmpCompetitionData[0])
        }

    }, [tmpCompetitionData])

    useEffect(() => {
        const filteredCompetitionsData = Object.fromEntries(
            Object.entries(competitionsData).filter(([, value]) => value?.id)
        );
        const isDifferent = Object.keys(filteredCompetitionsData).length !== Object.keys(competitionsData).length;
        if (isDifferent) {
            setCompetitionsData(filteredCompetitionsData);
        }
    }, [competitionsData]);

    useEffect(() => {
        if (tmpGameData && gamesData) {
            mergeGamesIntoA(gamesData, tmpGameData[0])
        }
    }, [tmpGameData])

    useEffect(() => {
        const filteredData = Object.fromEntries(
            Object.entries(gamesData).filter(([, value]) => value?.id)
        );
        const isDifferent = Object.keys(filteredData).length !== Object.keys(gamesData).length;
        if (isDifferent) {
            setGamesData(filteredData);
        }
    }, [gamesData]);
    useEffect(() => {
        connectWS();
        return () => {
            socket.current?.close();
        };
    }, []);

    console.log("asdfas", sportsData)
    return (
        <WebSocketContext.Provider value={{ socket: socket.current, isConnected, sportsData, competitionsData, gamesData, sortedMarketsData, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
