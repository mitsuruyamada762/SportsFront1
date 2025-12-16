import FootballImg from '../assets/images/football.svg';  //
import BasketballImg from '../assets/images/basketball.svg'; //
import TennisImg from '../assets/images/tennis.svg'; //
import VolleyballImg from '../assets/images/volley.svg'; //
import BaseballImg from '../assets/images/baseball.svg'; //
import HandballImg from '../assets/images/handball.svg'; //
import IceHockeyImg from '../assets/images/ice_hockey.svg'; //
import TableTennisImg from '../assets/images/table_tennis.svg'; //
import AmericanFootballImg from '../assets/images/american_football.svg'; //
import CricketImg from '../assets/images/cricket.svg';  //
import CounterStrikeImg from '../assets/images/counter_strike.svg'; //
import DOTA2Img from '../assets/images/dota.svg';  //
import FormulaImg from '../assets/images/formula_1.svg'; // 
import MotorImg from '../assets/images/wrc.svg';
import LOLImg from '../assets/images/league_of_legends.svg';
import FutsalImg from '../assets/images/futsal.svg'; //
import MMAImg from '../assets/images/mma.svg'; //
import BoxingImg from '../assets/images/boxing.svg'; //
import WaterpoloImg from '../assets/images/water_polo.svg'; //
import DartsImg from '../assets/images/darts.svg'; //
import SnookerImg from '../assets/images/snooker.svg'; //
import RugbyLeagueImg from '../assets/images/rugby_league.svg'; //
import RugbyUnionImg from '../assets/images/rugby_union.svg'; //
import CyclingImg from '../assets/images/cycling.svg';
import HorseImg from '../assets/images/horse_race.svg';
import GolfImg from '../assets/images/golf.svg'; //
import GaelicFootballImg from '../assets/images/gaelic_football.svg';
import GaelicHurlingImg from '../assets/images/gaelic_hurling.svg';
import PoliticsImg from '../assets/images/politics.svg'; //
import OlympicsImg from '../assets/images/olympic_games.svg'; //
import EntertainmentImg from '../assets/images/entertainment.svg';
import StreamImg from '../assets/images/streaming.svg';
import FieldsImg from '../assets/images/field.svg';
import StatsImg from '../assets/images/stats.svg';
import StandingImg from '../assets/images/standings.svg';
import TimelineImg from '../assets/images/timeline.svg';
import AlpineSkiing from '../assets/images/icons8-alpine-skiing-48.png';
import BallHockey from '../assets/images/icons8-ice-skate-48.png';
import PistolShooting from '../assets/images/icons8-sports-gun-64.png';
import Biathlon from '../assets/images/icons8-biathlon-skin-type-3-48.png';
import ArmWrestling from '../assets/images/icons8-wrestling-96.png';
import CallOfDuty from '../assets/images/icons8-call-of-duty-black-ops-4-48.png';
import Chess from '../assets/images/icons8-chess-48.png';
import Curling from '../assets/images/icons8-curling-64.png';
// import Eurovision from '../assets/images/';
import Hockey from '../assets/images/icons8-hockey-48.png';
import Floorball from '../assets/images/icons8-floorball-32.png';
import KingOfglory from '../assets/images/icons8-king-50.png';
import Lacross from '../assets/images/icons8-lacrosse-80.png';
import RainbowSix from '../assets/images/icons8-rainbow-six-64.png';
import SpeedWay from '../assets/images/icons8-speed-48.png';
import TVShowsAndMovies from '../assets/images/icons8-tv-64.png';
import WWE from '../assets/images/icons8-wwe-64.png';
import CyberFootball from '../assets/images/icons8-football-kick-48.png';
import Valorant from '../assets/images/icons8-valorant-64.png';
import Archery from '../assets/images/achery.png';
import Badminton from '../assets/images/badminton.svg';
import Loading from '../assets/images/loading.svg';


import Default from '../assets/images/icons8-sport-32.png';

import { GameFilterItem } from '@/theme2/types';

// Array of objects mapping a key to its corresponding image
export const ImgList: any = {
    "Soccer": FootballImg,
    "Basketball": BasketballImg,
    "Tennis": TennisImg,
    "Volleyball": VolleyballImg,
    "TableTennis": TableTennisImg,
    "IceHockey": IceHockeyImg,
    "Baseball": BaseballImg,
    "Handball": HandballImg,
    "AmericanFootball": AmericanFootballImg,
    "AlpineSkiing": AlpineSkiing,
    "BallHockey": BallHockey,
    "PistolShooting": PistolShooting,
    "Biathlon": Biathlon,
    "Armwrestling": ArmWrestling,
    "Boxing": BoxingImg,
    "CallOfDuty": CallOfDuty,
    "Chess": Chess,
    "CounterStrike": CounterStrikeImg,
    "Cricket": CricketImg,
    "Curling": Curling,
    "Darts": DartsImg,
    "Dota2": DOTA2Img,
    "Hockey": Hockey,
    "Floorball": Floorball,
    "Formula1": FormulaImg,
    "Futsal": FutsalImg,
    "Golf": GolfImg,
    "KingOfGlory": KingOfglory,
    "Lacross": Lacross,
    "LeagueOfLegends": LOLImg,
    "Mma": MMAImg,
    "Olympics": OlympicsImg,
    "Politics": PoliticsImg,
    "RainbowSix": RainbowSix,
    "RugbyLeague": RugbyLeagueImg,
    "RugbyUnion": RugbyUnionImg,
    "Snooker": SnookerImg,
    "Speedway": SpeedWay,
    "WaterPolo": WaterpoloImg,
    "TVShowsAndMovies": TVShowsAndMovies,
    "WWE": WWE,
    "CyberFootball": CyberFootball,
    "Valorant": Valorant,
    "Archery": Archery,
    "Badminton": Badminton,
    "Loading": Loading,


    "Motor": MotorImg,
    "Cycling": CyclingImg,
    "Horse": HorseImg,
    "GaelicFootball": GaelicFootballImg,
    "GaelicHurling": GaelicHurlingImg,
    "Entertainment": EntertainmentImg,
    "Stream": StreamImg,
    "Fields": FieldsImg,
    "Stats": StatsImg,
    "Standing": StandingImg,
    "Timeline": TimelineImg,
    "Default": Default,
};



export const liveMatchCats = [
    {
        name: 'football',
        img: FootballImg
    }, {
        name: 'basketball',
        img: BasketballImg
    }, {
        name: 'tennis',
        img: TennisImg
    }, {
        name: 'volleyball',
        img: VolleyballImg
    },
    {
        name: 'baseball',
        img: BaseballImg
    }, {
        name: 'handball',
        img: HandballImg
    }, {
        name: "ice-hockey",
        img: IceHockeyImg
    }
]


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

export const gameFilterItems: GameFilterItem[] = [
    { label: "Soccer", value: 'soccer', img: FootballImg },
    { label: "Basketball", value: 'basketball', img: BasketballImg },
    { label: "Tennis", value: 'tennis', img: TennisImg },
    { label: 'Table Tennis', value: 'table_tennis', img: TableTennisImg },
    { label: "Volleyball", value: 'volleyball', img: VolleyballImg },
    { label: "American Football", value: 'american_football', img: AmericanFootballImg },
    { label: "Baseball", value: 'baseball', img: BaseballImg },
    { label: "Ice Hockey", value: 'ice_hockey', img: IceHockeyImg },
    { label: "Cricket", value: 'cricket', img: CricketImg },
    { label: "Counter Strike", value: 'counter_strike', img: CounterStrikeImg },
    { label: "DOTA 2", value: 'dota_2', img: DOTA2Img },
]

export const timeFilterItems: { label: string, value: string | number }[] = [
    { label: "All", value: "all" },
    { label: '12 hours', value: 12 },
    { label: '3 hours', value: 3 },
    { label: '1 hour', value: 1 },
]

export const gameSelectItems: { label: string, value: string, img: string, badge: number }[] = [
    { label: "All matches", value: 'all', img: '', badge: 442 },
    { label: "Soccer", value: 'football', img: FootballImg, badge: 12 },
    { label: "Basketball", value: 'basketball', img: BasketballImg, badge: 23 },
    { label: "Tennis", value: 'tennis', img: TennisImg, badge: 33 },
    { label: 'Table Tennis', value: 'table_tennis', img: TableTennisImg, badge: 12 },
    { label: "Volleyball", value: 'volleyball', img: VolleyballImg, badge: 12 },
    { label: "American Football", value: 'american_football', img: AmericanFootballImg, badge: 55 },
    { label: "Baseball", value: 'baseball', img: BaseballImg, badge: 2 },
    { label: "Ice Hockey", value: 'ice_hockey', img: IceHockeyImg, badge: 1 },
    { label: "Cricket", value: 'cricket', img: CricketImg, badge: 2 },
    { label: "Counter Strike", value: 'counter_strike', img: CounterStrikeImg, badge: 3 },
    { label: "DOTA 2", value: 'dota_2', img: DOTA2Img, badge: 12 },
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

export const sportItems = [
    { id: 'soccer', name: 'Soccer', img: FootballImg },
    { id: 'basketball', name: 'Basketball', img: BasketballImg },
    { id: 'tennis', name: 'Tennis', img: TennisImg },
    { id: 'volleyball', name: 'Volleyball', img: VolleyballImg },
    { id: 'american_football', name: 'American Football', img: AmericanFootballImg },
    { id: 'baseball', name: 'Baseball', img: BaseballImg },
    { id: 'table_tennis', name: 'Table Tennis', img: TableTennisImg },
    { id: "formula1", name: "Formula 1", img: FormulaImg },
    { id: "motorsport", name: "Motorsport", img: MotorImg },
    { id: "league_of_legends", name: "League of Legends", img: LOLImg },
    { id: 'counter_strike', name: 'Counter Strike', img: CounterStrikeImg },
    { id: 'dota_2', name: 'DOTA 2', img: DOTA2Img },
    { id: 'ice_hockey', name: 'Ice Hockey', img: IceHockeyImg },
    { id: 'handball', name: 'Handball', img: HandballImg },
    { id: 'futsal', name: 'Futsal', img: FutsalImg },
    { id: 'mma', name: 'MMA', img: MMAImg },
    { id: 'boxing', name: 'Boxing', img: BoxingImg },
    { id: 'water_polo', name: 'Water Polo', img: WaterpoloImg },
    { id: 'cricket', name: 'Cricket', img: CricketImg },
    { id: 'darts', name: 'Darts', img: DartsImg },
    { id: 'snooker', name: 'Snooker', img: SnookerImg },
    { id: 'rugby_league', name: 'Rugby League', img: RugbyLeagueImg },
    { id: 'rugby_union', name: 'Rugby Union', img: RugbyUnionImg },
    { id: 'cycling', name: 'Cycling', img: CyclingImg },
    { id: 'horse_race', name: 'Horse Race', img: HorseImg },
    { id: 'golf', name: 'Golf', img: GolfImg },
    { id: 'gaelic_football', name: 'Gaelic Football', img: GaelicFootballImg },
    { id: 'gaelic_hurling', name: 'Gaelic Hurling', img: GaelicHurlingImg },
    { id: 'politics', name: 'Politics', img: PoliticsImg },
    { id: 'olympic_games', name: 'Olympic Games', img: OlympicsImg },
    { id: 'entertainment', name: 'Entertainment', img: EntertainmentImg },

]



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

export const livePanelIcons = [
    {
        id: 'streaming',
        img: StreamImg
    },
    {
        id: 'fields',
        img: FieldsImg
    },
    {
        id: 'stats',
        img: StatsImg
    },
    {
        id: 'standing',
        img: StandingImg
    },
    {
        id: 'timeline',
        img: TimelineImg
    }
]