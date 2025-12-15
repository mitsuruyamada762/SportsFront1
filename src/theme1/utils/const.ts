import { GameFilterItem } from '../types';

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


// Filter items data (same as in Filter component)
export const filterItems1: { label: string, value: string }[] = [
    {
        label: 'Full Time Result',
        value: 'full_time_result'
    },
    {
        label: 'Half Time Result 🚀',
        value: 'half_time_result'
    },
    {
        label: "Double Chance",
        value: 'double_chance'
    },
]

export const filterItems2: { label: string, value: string }[] = [
    { label: "Goals Over/Under", value: 'goals_over_under' },
    { label: "1st Half Goals Over/Under 🚀", value: 'first_half_goals_over_under' },
    { label: "Corners Over/Under 🚀", value: 'corners_over_under' },
]

export const filterItems3: { label: string, value: string }[] = [
    { label: "Both teams to Score 🚀", value: 'both_teams_to_score' },
    { label: "1st Half - Corners to Score 🚀", value: 'first_half_both_teams_to_score' },
    { label: "Yellow Cards Over/Under 🚀", value: 'yellow_cards_over_under' }
]

export const sportsOrder = {
    "Soccer": 1,
    "IceHockey": 6,
    "Basketball": 2,
    "Tennis": 3,
    "Volleyball": 4,
    "AmericanFootball": 10,
    "Badminton": 27,
    "BallHockey": 29,
    "Baseball": 7,
    "BeachVolleyball": 34,
    "Boxing": 41,
    "Chess": 44,
    "Cricket": 47,
    "Darts": 53,
    "Floorball": 69,
    "Formula1": 71,
    "Futsal": 75,
    "Golf": 80,
    "Handball": 9,
    "Hockey": 66,
    "RugbyLeague": 133,
    "RugbyUnion": 135,
    "Snooker": 146,
    "TableTennis": 5,
    "WaterPolo": 184,
    "Mma": 109,
    "CyberFootball": 252,
    "CallOfDuty": 42,
    "CounterStrike": 46,
    "Dota2": 55,
    "LeagueOfLegends": 103,
    "Speedway": 150,
    "Lacross": 102,
    "Squash": 152,
    "Politics": 124,
    "Eurovision": 63,
    "CrossCountrySkiing": 48,
    "AutoRacing": 26,
    "AlpineSkiing": 19,
    "WWE": 189,
    "Olympics": 118,
    "RainbowSix": 128,
    "Valorant": 521,
    "Archery": 32
}



export const commands = [
    { "command": "request_session", "params": { "language": "en", "site_id": 1329, "source": 42, "release_date": "08/20/2025-14:25", "afec": "0K7QhNkT629gev1YfyoglGz1RTHWRKulxVci" }, "rid": "ab1e2130" },
    // Get Live numbers
    // { "command": "get", "params": { "source": "betting", "what": { "game": "@count" }, "where": { "sport": { "type": { "@nin": [1, 4] } }, "game": { "type": 1 } }, "subscribe": true }, "rid": "31a2d7" },
    // Get Total numbers
    // { "command": "get", "params": { "source": "betting", "what": { "game": "@count" }, "where": { "sport": { "type": { "@nin": [1, 4] } }, "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] } }, "subscribe": true }, "rid": "18d2bd98" },
    // Favorite Game
    // { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order"], "region": ["id", "name", "alias", "order"], "competition": ["id", "order", "name", "favorite_order"], "game": "@count" }, "where": { "competition": { "favorite": true } }, "subscribe": true }, "rid": "f6cf57c0" },
    // Get Market of competition
    // { "command": "get", "params": { "source": "betting", "what": { "game": ["id"], "event": ["id", "price", "type_1", "name", "base", "order"], "market": ["type", "name", "display_key", "base", "id", "express_id", "name_template"] }, "where": { "competition": { "id": 566 }, "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] }, "market": { "@or": [{ "display_key": { "@in": ["HANDICAP", "TOTALS"] }, "display_sub_key": "MATCH", "main_order": 1 }, { "display_key": "WINNER", "display_sub_key": "MATCH" }] } }, "subscribe": true }, "rid": "feed39d4" },
    // Get All Games(sports/region/competition/)
    { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order"], "competition": ["id", "order", "name"], "region": ["id", "name", "alias", "order"], "game": ["id", "type"] }, "where": { "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] }, "sport": { "type": { "@nin": [1, 4] } } }, "subscribe": true }, "rid": "902642a8" },
];

// export const getSportsData = () => {
//     return { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order"], "competition": ["id", "order", "name"], "region": ["id", "name", "alias", "order"], "game": ["id", "type"] }, "where": { "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] }, "sport": { "type": { "@nin": [1, 4] } } }, "subscribe": true }, "rid": "902642a8" };
// }

export const getGameData = (id: number, alias: string) => {
    return { "command": "get", "params": { "source": "betting", "what": { "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "game": { "id": id }, "sport": { "alias": alias } }, "subscribe": true }, "rid": "6f706cd0" };
}

export const getLiveGamesList = () => {
    return { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order"] }, "where": { "game": { "type": 1 } }, "subscribe": true }, "rid": "6f706cd0" };
}

export const getCompetitionData = (id: number, alias: string, live: boolean) => {
    return live === true ? { "command": "get", "params": { "source": "betting", "what": { "competition": ["id", "order", "name"], "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "game": { "type": 1 }, "sport": { "alias": alias } }, "subscribe": true }, "rid": "6f706cd0" } :
        { "command": "get", "params": { "source": "betting", "what": { "competition": ["id", "order", "name"], "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "competition": { "id": id }, "sport": { "alias": alias } }, "subscribe": true }, "rid": "6f706cd0" };

}

export const carouselData = [
    {
        id: "0",
        type: "match" as const,
        time: "15",
        team1: "Panathinaikos",
        team2: "FC Bayern Munich",
        odd1: "1.20",
        odd2: "5.80",
        isLive: true,
        cat: "tennis",
        round: "2",
    },
    {
        id: "1",
        type: "match" as const,
        time: "21:30",
        team1: "Baskonia Vitoria",
        team2: "Olympiacos",
        odd1: "3.30",
        odd2: "1.43",
        isLive: false,
        cat: "soccer",
    },
    {
        id: "2",
        type: "match" as const,
        time: "21:30",
        team1: "Baskonia Vitoria",
        team2: "Olympiacos",
        odd1: "3.30",
        odd2: "1.43",
        isLive: false,
        cat: "basketball",
    },
    {
        id: "3",
        type: "match" as const,
        time: "21:30",
        team1: "Baskonia Vitoria",
        team2: "Olympiacos",
        odd1: "3.30",
        odd2: "1.43",
        isLive: false,
        cat: "basketball",
    },
    {
        id: "4",
        type: "promo" as const,
        team1: "Baskonia",
        team2: "Olympiacos",
        offerText: "10€ Free Bet*",
        buttonText: "Learn more",
    },
    {
        id: "5",
        type: "promo" as const,
        team1: "Baskonia",
        team2: "Olympiacos",
        offerText: "10€ Free Bet*",
        buttonText: "Learn more",
    },
    {
        id: "6",
        type: "promo" as const,
        team1: "Baskonia",
        team2: "Olympiacos",
        description: "Your golden game changer",
        offerText: "Golden Sub",
        buttonText: "Learn more",
    },
    {
        id: "7",
        type: "promo" as const,
        team1: "Baskonia",
        team2: "Olympiacos",
        description: 'Novileague Champion',
        offerText: "5000€ In Cash*",
        buttonText: "Learn more",
    },
    {
        id: "8",
        type: "promo" as const,
        description: "This is our game",
        offerText: "NBA • Novibet",
        buttonText: "Learn more",
    },
];


export const leaguesData: { id: string, countryName: string, countryFlag: string, leagueName: string }[] = [
    {
        id: '1',
        countryName: 'France',
        countryFlag: 'https://flagcdn.com/w40/fr.png',
        leagueName: 'Pro A'
    },
    {
        id: '2',
        countryName: 'England',
        countryFlag: 'https://flagcdn.com/w40/gb-eng.png',
        leagueName: 'Premier League'
    },
    {
        id: '3',
        countryName: 'Spain',
        countryFlag: 'https://flagcdn.com/w40/es.png',
        leagueName: 'La Liga'
    },
    {
        id: '4',
        countryName: 'Germany',
        countryFlag: 'https://flagcdn.com/w40/de.png',
        leagueName: 'Bundesliga'
    },
    {
        id: '5',
        countryName: 'Italy',
        countryFlag: 'https://flagcdn.com/w40/it.png',
        leagueName: 'Serie A'
    },
    {
        id: '6',
        countryName: 'USA',
        countryFlag: 'https://flagcdn.com/w40/us.png',
        leagueName: 'NBA'
    },
    {
        id: '7',
        countryName: 'Netherlands',
        countryFlag: 'https://flagcdn.com/w40/nl.png',
        leagueName: 'Eredivisie'
    },
    {
        id: '8',
        countryName: 'Portugal',
        countryFlag: 'https://flagcdn.com/w40/pt.png',
        leagueName: 'Primeira Liga'
    },
    {
        id: '9',
        countryName: 'Greece',
        countryFlag: 'https://flagcdn.com/w40/gr.png',
        leagueName: 'Super League'
    },
    {
        id: '10',
        countryName: 'Brazil',
        countryFlag: 'https://flagcdn.com/w40/br.png',
        leagueName: 'Brasileirão'
    }
]

export const popularLeaguesData: { id: string, countryName: string, countryFlag: string, leagueName: string }[] = [
    {
        id: 'pop-1',
        countryName: 'England',
        countryFlag: 'https://flagcdn.com/w40/gb-eng.png',
        leagueName: 'Premier League'
    },
    {
        id: 'pop-2',
        countryName: 'Spain',
        countryFlag: 'https://flagcdn.com/w40/es.png',
        leagueName: 'La Liga'
    },
    {
        id: 'pop-3',
        countryName: 'Germany',
        countryFlag: 'https://flagcdn.com/w40/de.png',
        leagueName: 'Bundesliga'
    },
    {
        id: 'pop-4',
        countryName: 'Italy',
        countryFlag: 'https://flagcdn.com/w40/it.png',
        leagueName: 'Serie A'
    },
    {
        id: 'pop-5',
        countryName: 'Europe',
        countryFlag: 'https://flagcdn.com/w40/eu.png',
        leagueName: 'UEFA Champions League'
    },
    {
        id: 'pop-6',
        countryName: 'USA',
        countryFlag: 'https://flagcdn.com/w40/us.png',
        leagueName: 'NBA'
    },
    {
        id: 'pop-7',
        countryName: 'Europe',
        countryFlag: 'https://flagcdn.com/w40/eu.png',
        leagueName: 'UEFA Europa League'
    },
    {
        id: 'pop-8',
        countryName: 'France',
        countryFlag: 'https://flagcdn.com/w40/fr.png',
        leagueName: 'Ligue 1'
    }
]
