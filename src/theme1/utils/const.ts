interface SpecialItem {
    id: string;
    name: string;
    icon: string;
    hasChildren?: boolean;
}

export const SPECIAL_ITEMS: SpecialItem[] = [
    { id: 'upcoming', name: 'Upcoming Matches', icon: 'Upcoming' },
    { id: 'popular', name: 'Popular Matches', icon: 'tournament' },
    { id: 'popular-tournaments', name: 'Popular Tournaments', icon: 'tournament', hasChildren: true },
    { id: 'increased-rates', name: 'Increased Rates', icon: 'boost' },
    { id: 'outfit-of-day', name: 'Outfit of the Day', icon: 'FlashGames' },
];


export const timeFilterItems: { label: string, value: string | number }[] = [
    { label: "All", value: "all" },
    { label: "Today", value: "today" },
    { label: '1 second', value: 1 },
    { label: '3 seconds', value: 3 },
    { label: '6 seconds', value: 6 },
    { label: '12 seconds', value: 12 },
    { label: '24 seconds', value: 24 },
    { label: '48 seconds', value: 48 },
    { label: '72 seconds', value: 72 },
];

export const commands = [
    { "command": "request_session", "params": { "language": "en", "site_id": 1329, "source": 42, "release_date": "08/20/2025-14:25", "afec": "0K7QhNkT629gev1YfyoglGz1RTHWRKulxVci" }, "rid": "ab1e2130" },
];
// {
//     "command": "change_session_language",
//     "params": {
//         "language": "ger"
//     }
// },
// {
//     "command": "get_available_language_codes",
//     "params": {}
// },
// Get Live numbers
// { "command": "get", "params": { "source": "betting", "what": { "game": "@count" }, "where": { "sport": { "type": { "@nin": [1, 4] } }, "game": { "type": 1 } }, "subscribe": true }, "rid": "31a2d7" },
// Get Total numbers
// { "command": "get", "params": { "source": "betting", "what": { "game": "@count" }, "where": { "sport": { "type": { "@nin": [1, 4] } }, "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] } }, "subscribe": true }, "rid": "18d2bd98" },
// Favorite Game
// { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order"], "region": ["id", "name", "alias", "order"], "competition": ["id", "order", "name", "favorite_order"], "game": "@count" }, "where": { "competition": { "favorite": true } }, "subscribe": true }, "rid": "f6cf57c0" },
// Get Market of competition
// { "command": "get", "params": { "source": "betting", "what": { "game": ["id"], "event": ["id", "price", "type_1", "name", "base", "order"], "market": ["type", "name", "display_key", "base", "id", "express_id", "name_template"] }, "where": { "competition": { "id": 566 }, "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] }, "market": { "@or": [{ "display_key": { "@in": ["HANDICAP", "TOTALS"] }, "display_sub_key": "MATCH", "main_order": 1 }, { "display_key": "WINNER", "display_sub_key": "MATCH" }] } }, "subscribe": true }, "rid": "feed39d4" },
// Get All Games(sports/region/competition/)

export const getSportsData = () => {
    return { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order", "@count"], "competition": ["id", "order", "name", "@count"], "region": ["id", "name", "alias", "order", "@count"], "game": "@count" }, "where": { "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] }, "sport": { "type": { "@nin": [1, 4] } } }, "subscribe": true }, "rid": "902642a8" }
}

export const getCompetitionsData = (id: number, alias: string) => {
    return { "command": "get", "params": { "source": "betting", "what": { "competition": ["id", "order", "name"], "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "competition": { "id": id }, "sport": { "alias": alias } }, "subscribe": true }, "rid": "6f706cd0" }
}

export const getGameData = (id: number, alias: string) => {
    return { "command": "get", "params": { "source": "betting", "what": { "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "game": { "id": id }, "sport": { "alias": alias } }, "subscribe": true }, "rid": "6f706cd0" };
}

export const getLiveSportsData = () => {
    return { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order"], "competition": ["id", "order", "name"], "region": ["id", "name", "alias", "order"], "game": ["id", "type"] }, "where": { "game": { "type": 1 } }, "subscribe": true }, "rid": "6f706cd0" };
}

export const getLiveCompetitionsData = (alias: string) => {
    return { "command": "get", "params": { "source": "betting", "what": { "competition": ["id", "order", "name"], "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "game": { "type": 1 }, "sport": { "alias": alias } }, "subscribe": true }, "rid": "6f706cd0" }
}
