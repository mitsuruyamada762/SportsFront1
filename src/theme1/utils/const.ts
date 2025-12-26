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
    { "command": "request_session", "params": { "language": "eng", "site_id": 1329, "source": 42, "release_date": "08/20/2025-14:25", "afec": "0K7QhNkT629gev1YfyoglGz1RTHWRKulxVci" }, "rid": "ab1e2130" },
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
    return { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order"], "competition": ["id", "order", "name"], "region": ["id", "name", "alias", "order"], "game": "@count" }, "where": { "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] }, "sport": { "type": { "@nin": [1, 4] } } }, "subscribe": true }, "rid": "902642a8" }
}

export const getCompetitionsData = (id: number, alias: string) => {
    return { "command": "get", "params": { "source": "betting", "what": { "competition": ["id", "order", "name"], "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"] }, "where": { "competition": { "id": id }, "sport": { "alias": alias }, "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] } }, "subscribe": true }, "rid": "feed39d4" }
    // return { "command": "get", "params": { "source": "betting", "what": { "competition": ["id", "order", "name"], "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "competition": { "id": id }, "sport": { "alias": alias } }, "subscribe": true }, "rid": "6f706cd0" }
}

export const getShowMarketData = (id: number) => {
    return { "command": "get", "params": { "source": "betting", "what": { "game": ["id"], "event": ["id", "price", "type_1", "name", "base", "order"], "market": ["type", "name", "display_key", "base", "id", "express_id", "name_template"] }, "where": { "competition": { "id": id }, "game": { "@or": [{ "visible_in_prematch": 1 }, { "type": { "@in": [0, 2] } }] }, "market": { "@or": [{ "display_key": { "@in": ["HANDICAP", "TOTALS"] }, "display_sub_key": "MATCH", "main_order": 1 }, { "display_key": "WINNER", "display_sub_key": "MATCH" }] } }, "subscribe": true }, "rid": "bd8840d6" }
}

export const getGameData = (id: number) => {
    return { "command": "get", "params": { "source": "betting", "what": { "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "game": { "id": id } }, "subscribe": true }, "rid": "6f706cd0" };
}

export const getLiveSportsData = () => {
    return { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias", "order"], "competition": ["id", "order", "name"], "region": ["id", "name", "alias", "order"], "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "event": ["id", "price", "type_1", "name", "base", "order"], "market": ["type", "name", "display_key", "base", "id", "express_id", "name_template"] }, "where": { "game": { "type": 1 } }, "subscribe": true }, "rid": "6f706cd0" };
}

export const getLiveCompetitionsData = (alias: string) => {
    return { "command": "get", "params": { "source": "betting", "what": { "competition": ["id", "order", "name"], "game": ["id", "stats", "info", "is_neutral_venue", "add_info_name", "text_info", "markets_count", "type", "start_ts", "is_stat_available", "team1_id", "team1_name", "team2_id", "team2_name", "last_event", "live_events", "match_length", "sport_alias", "sportcast_id", "region_alias", "is_blocked", "show_type", "game_number"], "market": ["id", "group_id", "group_name", "group_order", "type", "name_template", "sequence", "point_sequence", "name", "order", "display_key", "col_count", "express_id", "extra_info", "cashout", "is_new", "has_early_payout"], "event": ["id", "type_1", "price", "name", "base", "home_value", "away_value", "display_column", "order"] }, "where": { "game": { "type": 1 }, "sport": { "alias": alias } }, "subscribe": true }, "rid": "6f706cd0" }
}

/**
 * Converts Unix timestamp to DD.MM.YYYY format
 */

const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

/**
 * Converts Unix timestamp to HH:MM format          
 */
const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * Groups games by date and adds data property to competition object
 * @param competition - Competition object with games
 * @returns Competition object with added data property containing games grouped by date
 */
export const addGamesDataByDate = (competition: any) => {
    if (!competition || !competition.game) {
        return { ...competition, data: {} };
    }

    const games = Object.values(competition.game) as any[];
    const gamesByDate: Record<string, any[]> = {};

    // Group games by date
    games.forEach((game) => {
        if (!game) return;

        // Use start_ts first, fallback to stats.ts if available
        const timestamp = game.start_ts || game.stats?.ts;
        if (!timestamp) return;

        const dateKey = formatDate(timestamp);
        const timeStr = formatTime(timestamp);

        if (!gamesByDate[dateKey]) {
            gamesByDate[dateKey] = [];
        }

        // Add time property to game object
        gamesByDate[dateKey].push({
            ...game,
            time: timeStr
        });
    });

    // Sort games within each date by timestamp (start_ts or stats.ts)
    Object.keys(gamesByDate).forEach((dateKey) => {
        gamesByDate[dateKey].sort((a, b) => {
            const tsA = a.start_ts || a.stats?.ts || 0;
            const tsB = b.start_ts || b.stats?.ts || 0;
            return tsA - tsB;
        });
    });

    return {
        ...competition,
        data: gamesByDate
    };
}

import Afghanistan from '@/theme1/assets/images/flag/Afghanistan.png';
import Africa from '@/theme1/assets/images/flag/Africa.png';
import Albania from '@/theme1/assets/images/flag/Albania.png';
import Algeria from '@/theme1/assets/images/flag/Algeria.png';
import America from '@/theme1/assets/images/flag/America.png';
import AmericanSamoa from '@/theme1/assets/images/flag/American Samoa.png';
import Andorra from '@/theme1/assets/images/flag/Andorra.png';
import Angola from '@/theme1/assets/images/flag/Angola.png';
import Anguilla from '@/theme1/assets/images/flag/Anguilla.png';
import Antarctica from '@/theme1/assets/images/flag/Antarctica.png';
import AntiguaAndBarbuda from '@/theme1/assets/images/flag/Antigua and Barbuda.png';
import Argentina from '@/theme1/assets/images/flag/Argentina.png';
import Armenia from '@/theme1/assets/images/flag/Armenia.png';
import Aruba from '@/theme1/assets/images/flag/Aruba.png';
import Asia from '@/theme1/assets/images/flag/Asia.png';
import Australia from '@/theme1/assets/images/flag/Australia.png';
import Austria from '@/theme1/assets/images/flag/Austria.png';
import Azerbaijan from '@/theme1/assets/images/flag/Azerbaijan.png';
import Bahamas from '@/theme1/assets/images/flag/Bahamas.png';
import Bahrain from '@/theme1/assets/images/flag/Bahrain.png';
import Bangladesh from '@/theme1/assets/images/flag/Bangladesh.png';
import Barbados from '@/theme1/assets/images/flag/Barbados.png';
import Belarus from '@/theme1/assets/images/flag/Belarus.png';
import Belgium from '@/theme1/assets/images/flag/Belgium.png';
import Belize from '@/theme1/assets/images/flag/Belize.png';
import Benin from '@/theme1/assets/images/flag/Benin.png';
import Bermuda from '@/theme1/assets/images/flag/Bermuda.png';
import Bhutan from '@/theme1/assets/images/flag/Bhutan.png';
import Bolivia from '@/theme1/assets/images/flag/Bolivia.png';
import BosniaAndHerzegovina from '@/theme1/assets/images/flag/Bosnia and Herzegovina.png';
import Botswana from '@/theme1/assets/images/flag/Botswana.png';
import BouvetIsland from '@/theme1/assets/images/flag/Bouvet Island.png';
import Brazil from '@/theme1/assets/images/flag/Brazil.png';
import BritishIndianOceanTerritory from '@/theme1/assets/images/flag/British Indian Ocean Territory.png';
import BritishVirginIslands from '@/theme1/assets/images/flag/British Virgin Islands.png';
import Brunei from '@/theme1/assets/images/flag/Brunei.png';
import Bulgaria from '@/theme1/assets/images/flag/Bulgaria.png';
import BurkinaFaso from '@/theme1/assets/images/flag/Burkina Faso.png';
import Burundi from '@/theme1/assets/images/flag/Burundi.png';
import Cambodia from '@/theme1/assets/images/flag/Cambodia.png';
import Cameroon from '@/theme1/assets/images/flag/Cameroon.png';
import Canada from '@/theme1/assets/images/flag/Canada.png';
import CapeVerde from '@/theme1/assets/images/flag/Cape Verde.png';
import CaribbeanNetherlands from '@/theme1/assets/images/flag/Caribbean Netherlands.png';
import CaymanIslands from '@/theme1/assets/images/flag/Cayman Islands.png';
import CentralAfricanRepublic from '@/theme1/assets/images/flag/Central African Republic.png';
import Chad from '@/theme1/assets/images/flag/Chad.png';
import Chile from '@/theme1/assets/images/flag/Chile.png';
import China from '@/theme1/assets/images/flag/China.png';
import ChristmasIsland from '@/theme1/assets/images/flag/Christmas Island.png';
import CocosIslands from '@/theme1/assets/images/flag/Cocos Islands.png';
import Colombia from '@/theme1/assets/images/flag/Colombia.png';
import Comoros from '@/theme1/assets/images/flag/Comoros.png';
import CookIslands from '@/theme1/assets/images/flag/Cook Islands.png';
import CostaRica from '@/theme1/assets/images/flag/Costa Rica.png';
import Croatia from '@/theme1/assets/images/flag/Croatia.png';
import CteDivoire from '@/theme1/assets/images/flag/Cte dIvoire.png';
import Cuba from '@/theme1/assets/images/flag/Cuba.png';
import Curaao from '@/theme1/assets/images/flag/Curaao.png';
import Cyprus from '@/theme1/assets/images/flag/Cyprus.png';
import CzechRepublic from '@/theme1/assets/images/flag/Czech Republic.png';
import Default from '@/theme1/assets/images/flag/Default.png';
import DemocraticRepublicOfTheCongo from '@/theme1/assets/images/flag/Democratic Republic of the Congo.png';
import Denmark from '@/theme1/assets/images/flag/Denmark.png';
import Djibouti from '@/theme1/assets/images/flag/Djibouti.png';
import Dominica from '@/theme1/assets/images/flag/Dominica.png';
import DominicanRepublic from '@/theme1/assets/images/flag/Dominican Republic.png';
import EastTimor from '@/theme1/assets/images/flag/East Timor.png';
import Ecuador from '@/theme1/assets/images/flag/Ecuador.png';
import Egypt from '@/theme1/assets/images/flag/Egypt.png';
import ElSalvador from '@/theme1/assets/images/flag/El Salvador.png';
import England from '@/theme1/assets/images/flag/England.png';
import EquatorialGuinea from '@/theme1/assets/images/flag/Equatorial Guinea.png';
import Eritrea from '@/theme1/assets/images/flag/Eritrea.png';
import Estonia from '@/theme1/assets/images/flag/Estonia.png';
import Eswatini from '@/theme1/assets/images/flag/Eswatini.png';
import Ethiopia from '@/theme1/assets/images/flag/Ethiopia.png';
import Europe from '@/theme1/assets/images/flag/Europe.png';
import FalklandIslands from '@/theme1/assets/images/flag/Falkland Islands.png';
import FaroeIslands from '@/theme1/assets/images/flag/Faroe Islands.png';
import Fiji from '@/theme1/assets/images/flag/Fiji.png';
import Finland from '@/theme1/assets/images/flag/Finland.png';
import France from '@/theme1/assets/images/flag/France.png';
import FrenchGuiana from '@/theme1/assets/images/flag/French Guiana.png';
import FrenchPolynesia from '@/theme1/assets/images/flag/French Polynesia.png';
import FrenchSouthernTerritories from '@/theme1/assets/images/flag/French Southern Territories.png';
import Gabon from '@/theme1/assets/images/flag/Gabon.png';
import Gambia from '@/theme1/assets/images/flag/Gambia.png';
import Georgia from '@/theme1/assets/images/flag/Georgia.png';
import Germany from '@/theme1/assets/images/flag/Germany.png';
import Ghana from '@/theme1/assets/images/flag/Ghana.png';
import Gibraltar from '@/theme1/assets/images/flag/Gibraltar.png';
import Greece from '@/theme1/assets/images/flag/Greece.png';
import Greenland from '@/theme1/assets/images/flag/Greenland.png';
import Grenada from '@/theme1/assets/images/flag/Grenada.png';
import Guadeloupe from '@/theme1/assets/images/flag/Guadeloupe.png';
import Guam from '@/theme1/assets/images/flag/Guam.png';
import Guatemala from '@/theme1/assets/images/flag/Guatemala.png';
import Guernsey from '@/theme1/assets/images/flag/Guernsey.png';
import GuineaBissau from '@/theme1/assets/images/flag/Guinea-Bissau.png';
import Guinea from '@/theme1/assets/images/flag/Guinea.png';
import Guyana from '@/theme1/assets/images/flag/Guyana.png';
import Haiti from '@/theme1/assets/images/flag/Haiti.png';
import HeardIslandAndMcdonaldIslands from '@/theme1/assets/images/flag/Heard Island and McDonald Islands.png';
import Honduras from '@/theme1/assets/images/flag/Honduras.png';
import HongKong from '@/theme1/assets/images/flag/Hong Kong.png';
import Hungary from '@/theme1/assets/images/flag/Hungary.png';
import Iceland from '@/theme1/assets/images/flag/Iceland.png';
import India from '@/theme1/assets/images/flag/India.png';
import Indonesia from '@/theme1/assets/images/flag/Indonesia.png';
import Iran from '@/theme1/assets/images/flag/Iran.png';
import Iraq from '@/theme1/assets/images/flag/Iraq.png';
import Ireland from '@/theme1/assets/images/flag/Ireland.png';
import IsleOfMan from '@/theme1/assets/images/flag/Isle of Man.png';
import Israel from '@/theme1/assets/images/flag/Israel.png';
import Italy from '@/theme1/assets/images/flag/Italy.png';
import Jamaica from '@/theme1/assets/images/flag/Jamaica.png';
import Japan from '@/theme1/assets/images/flag/Japan.png';
import Jersey from '@/theme1/assets/images/flag/Jersey.png';
import Jordan from '@/theme1/assets/images/flag/Jordan.png';
import Kazakhstan from '@/theme1/assets/images/flag/Kazakhstan.png';
import Kenya from '@/theme1/assets/images/flag/Kenya.png';
import Kiribati from '@/theme1/assets/images/flag/Kiribati.png';
import Kosovo from '@/theme1/assets/images/flag/Kosovo.png';
import Kuwait from '@/theme1/assets/images/flag/Kuwait.png';
import Kyrgyzstan from '@/theme1/assets/images/flag/Kyrgyzstan.png';
import Laos from '@/theme1/assets/images/flag/Laos.png';
import Latvia from '@/theme1/assets/images/flag/Latvia.png';
import Lebanon from '@/theme1/assets/images/flag/Lebanon.png';
import Lesotho from '@/theme1/assets/images/flag/Lesotho.png';
import Liberia from '@/theme1/assets/images/flag/Liberia.png';
import Libya from '@/theme1/assets/images/flag/Libya.png';
import Liechtenstein from '@/theme1/assets/images/flag/Liechtenstein.png';
import Lithuania from '@/theme1/assets/images/flag/Lithuania.png';
import Luxembourg from '@/theme1/assets/images/flag/Luxembourg.png';
import Macau from '@/theme1/assets/images/flag/Macau.png';
import Madagascar from '@/theme1/assets/images/flag/Madagascar.png';
import Malawi from '@/theme1/assets/images/flag/Malawi.png';
import Malaysia from '@/theme1/assets/images/flag/Malaysia.png';
import Maldives from '@/theme1/assets/images/flag/Maldives.png';
import Mali from '@/theme1/assets/images/flag/Mali.png';
import Malta from '@/theme1/assets/images/flag/Malta.png';
import MarshallIslands from '@/theme1/assets/images/flag/Marshall Islands.png';
import Martinique from '@/theme1/assets/images/flag/Martinique.png';
import Mauritania from '@/theme1/assets/images/flag/Mauritania.png';
import Mauritius from '@/theme1/assets/images/flag/Mauritius.png';
import Mayotte from '@/theme1/assets/images/flag/Mayotte.png';
import Mexico from '@/theme1/assets/images/flag/Mexico.png';
import Micronesia from '@/theme1/assets/images/flag/Micronesia.png';
import Moldova from '@/theme1/assets/images/flag/Moldova.png';
import Monaco from '@/theme1/assets/images/flag/Monaco.png';
import Mongolia from '@/theme1/assets/images/flag/Mongolia.png';
import Montenegro from '@/theme1/assets/images/flag/Montenegro.png';
import Montserrat from '@/theme1/assets/images/flag/Montserrat.png';
import Morocco from '@/theme1/assets/images/flag/Morocco.png';
import Mozambique from '@/theme1/assets/images/flag/Mozambique.png';
import Myanmar from '@/theme1/assets/images/flag/Myanmar.png';
import Namibia from '@/theme1/assets/images/flag/Namibia.png';
import Nauru from '@/theme1/assets/images/flag/Nauru.png';
import Nepal from '@/theme1/assets/images/flag/Nepal.png';
import Netherlands from '@/theme1/assets/images/flag/Netherlands.png';
import NewCaledonia from '@/theme1/assets/images/flag/New Caledonia.png';
import NewZealand from '@/theme1/assets/images/flag/New Zealand.png';
import Nicaragua from '@/theme1/assets/images/flag/Nicaragua.png';
import Niger from '@/theme1/assets/images/flag/Niger.png';
import Nigeria from '@/theme1/assets/images/flag/Nigeria.png';
import Niue from '@/theme1/assets/images/flag/Niue.png';
import NorfolkIsland from '@/theme1/assets/images/flag/Norfolk Island.png';
import NorthAmerica from '@/theme1/assets/images/flag/North America.png';
import NorthKorea from '@/theme1/assets/images/flag/North Korea.png';
import NorthMacedonia from '@/theme1/assets/images/flag/North Macedonia.png';
import NorthernMarianaIslands from '@/theme1/assets/images/flag/Northern Mariana Islands.png';
import Norway from '@/theme1/assets/images/flag/Norway.png';
import Olympics from '@/theme1/assets/images/flag/Olympics.png';
import Oman from '@/theme1/assets/images/flag/Oman.png';
import Pakistan from '@/theme1/assets/images/flag/Pakistan.png';
import Palau from '@/theme1/assets/images/flag/Palau.png';
import Palestine from '@/theme1/assets/images/flag/Palestine.png';
import Panama from '@/theme1/assets/images/flag/Panama.png';
import PapuaNewGuinea from '@/theme1/assets/images/flag/Papua New Guinea.png';
import Paraguay from '@/theme1/assets/images/flag/Paraguay.png';
import Peru from '@/theme1/assets/images/flag/Peru.png';
import Philippines from '@/theme1/assets/images/flag/Philippines.png';
import PitcairnIslands from '@/theme1/assets/images/flag/Pitcairn Islands.png';
import Poland from '@/theme1/assets/images/flag/Poland.png';
import Portugal from '@/theme1/assets/images/flag/Portugal.png';
import PuertoRico from '@/theme1/assets/images/flag/Puerto Rico.png';
import Qatar from '@/theme1/assets/images/flag/Qatar.png';
import RepublicOfTheCongo from '@/theme1/assets/images/flag/Republic of the Congo.png';
import Romania from '@/theme1/assets/images/flag/Romania.png';
import Runion from '@/theme1/assets/images/flag/Runion.png';
import Russia from '@/theme1/assets/images/flag/Russia.png';
import Rwanda from '@/theme1/assets/images/flag/Rwanda.png';
import SaintBarthlemy from '@/theme1/assets/images/flag/Saint Barthlemy.png';
import SaintHelena from '@/theme1/assets/images/flag/Saint Helena.png';
import SaintKittsAndNevis from '@/theme1/assets/images/flag/Saint Kitts and Nevis.png';
import SaintLucia from '@/theme1/assets/images/flag/Saint Lucia.png';
import SaintMartin from '@/theme1/assets/images/flag/Saint Martin.png';
import SaintPierreAndMiquelon from '@/theme1/assets/images/flag/Saint Pierre and Miquelon.png';
import SaintVincentAndTheGrenadines from '@/theme1/assets/images/flag/Saint Vincent and the Grenadines.png';
import Samoa from '@/theme1/assets/images/flag/Samoa.png';
import SanMarino from '@/theme1/assets/images/flag/San Marino.png';
import SaudiArabia from '@/theme1/assets/images/flag/Saudi Arabia.png';
import Senegal from '@/theme1/assets/images/flag/Senegal.png';
import Serbia from '@/theme1/assets/images/flag/Serbia.png';
import Seychelles from '@/theme1/assets/images/flag/Seychelles.png';
import SierraLeone from '@/theme1/assets/images/flag/Sierra Leone.png';
import Singapore from '@/theme1/assets/images/flag/Singapore.png';
import SintMaarten from '@/theme1/assets/images/flag/Sint Maarten.png';
import Slovakia from '@/theme1/assets/images/flag/Slovakia.png';
import Slovenia from '@/theme1/assets/images/flag/Slovenia.png';
import SoTomAndPrncipe from '@/theme1/assets/images/flag/So Tom and Prncipe.png';
import SolomonIslands from '@/theme1/assets/images/flag/Solomon Islands.png';
import Somalia from '@/theme1/assets/images/flag/Somalia.png';
import SouthAfrica from '@/theme1/assets/images/flag/South Africa.png';
import SouthAmerica from '@/theme1/assets/images/flag/South America.png';
import SouthGeorgiaAndTheSouthSandwichIslands from '@/theme1/assets/images/flag/South Georgia and the South Sandwich Islands.png';
import SouthKorea from '@/theme1/assets/images/flag/South Korea.png';
import SouthSudan from '@/theme1/assets/images/flag/South Sudan.png';
import Spain from '@/theme1/assets/images/flag/Spain.png';
import SriLanka from '@/theme1/assets/images/flag/Sri Lanka.png';
import Sudan from '@/theme1/assets/images/flag/Sudan.png';
import Suriname from '@/theme1/assets/images/flag/Suriname.png';
import SvalbardAndJanMayen from '@/theme1/assets/images/flag/Svalbard and Jan Mayen.png';
import Sweden from '@/theme1/assets/images/flag/Sweden.png';
import Switzerland from '@/theme1/assets/images/flag/Switzerland.png';
import Syria from '@/theme1/assets/images/flag/Syria.png';
import Taiwan from '@/theme1/assets/images/flag/Taiwan.png';
import Tajikistan from '@/theme1/assets/images/flag/Tajikistan.png';
import Tanzania from '@/theme1/assets/images/flag/Tanzania.png';
import Thailand from '@/theme1/assets/images/flag/Thailand.png';
import Togo from '@/theme1/assets/images/flag/Togo.png';
import Tokelau from '@/theme1/assets/images/flag/Tokelau.png';
import Tonga from '@/theme1/assets/images/flag/Tonga.png';
import TrinidadAndTobago from '@/theme1/assets/images/flag/Trinidad and Tobago.png';
import Tunisia from '@/theme1/assets/images/flag/Tunisia.png';
import Turkey from '@/theme1/assets/images/flag/Turkey.png';
import Turkmenistan from '@/theme1/assets/images/flag/Turkmenistan.png';
import TurksAndCaicosIslands from '@/theme1/assets/images/flag/Turks and Caicos Islands.png';
import Tuvalu from '@/theme1/assets/images/flag/Tuvalu.png';
import Uganda from '@/theme1/assets/images/flag/Uganda.png';
import Ukraine from '@/theme1/assets/images/flag/Ukraine.png';
import UnitedArabEmirates from '@/theme1/assets/images/flag/United Arab Emirates.png';
import UnitedKingdom from '@/theme1/assets/images/flag/United Kingdom.png';
import UnitedStatesMinorOutlyingIslands from '@/theme1/assets/images/flag/United States Minor Outlying Islands.png';
import UnitedStatesVirginIslands from '@/theme1/assets/images/flag/United States Virgin Islands.png';
import UnitedStates from '@/theme1/assets/images/flag/United States.png';
import Uruguay from '@/theme1/assets/images/flag/Uruguay.png';
import Uzbekistan from '@/theme1/assets/images/flag/Uzbekistan.png';
import Vanuatu from '@/theme1/assets/images/flag/Vanuatu.png';
import VaticanCity from '@/theme1/assets/images/flag/Vatican City.png';
import Venezuela from '@/theme1/assets/images/flag/Venezuela.png';
import Vietnam from '@/theme1/assets/images/flag/Vietnam.png';
import Wales from '@/theme1/assets/images/flag/Wales.png';
import WallisAndFutuna from '@/theme1/assets/images/flag/Wallis and Futuna.png';
import WesternSahara from '@/theme1/assets/images/flag/Western Sahara.png';
import World from '@/theme1/assets/images/flag/World.png';
import Yemen from '@/theme1/assets/images/flag/Yemen.png';
import Zambia from '@/theme1/assets/images/flag/Zambia.png';
import Zimbabwe from '@/theme1/assets/images/flag/Zimbabwe.png';
import LandIslands from '@/theme1/assets/images/flag/land Islands.png';

export const FLAGS = {
  Afghanistan,
  Africa,
  Albania,
  Algeria,
  America,
  AmericanSamoa,
  Andorra,
  Angola,
  Anguilla,
  Antarctica,
  AntiguaAndBarbuda,
  Argentina,
  Armenia,
  Aruba,
  Asia,
  Australia,
  Austria,
  Azerbaijan,
  Bahamas,
  Bahrain,
  Bangladesh,
  Barbados,
  Belarus,
  Belgium,
  Belize,
  Benin,
  Bermuda,
  Bhutan,
  Bolivia,
  BosniaAndHerzegovina,
  Botswana,
  BouvetIsland,
  Brazil,
  BritishIndianOceanTerritory,
  BritishVirginIslands,
  Brunei,
  Bulgaria,
  BurkinaFaso,
  Burundi,
  Cambodia,
  Cameroon,
  Canada,
  CapeVerde,
  CaribbeanNetherlands,
  CaymanIslands,
  CentralAfricanRepublic,
  Chad,
  Chile,
  China,
  ChristmasIsland,
  CocosIslands,
  Colombia,
  Comoros,
  CookIslands,
  CostaRica,
  Croatia,
  CteDivoire,
  Cuba,
  Curaao,
  Cyprus,
  CzechRepublic,
  Default,
  DemocraticRepublicOfTheCongo,
  Denmark,
  Djibouti,
  Dominica,
  DominicanRepublic,
  EastTimor,
  Ecuador,
  Egypt,
  ElSalvador,
  England,
  EquatorialGuinea,
  Eritrea,
  Estonia,
  Eswatini,
  Ethiopia,
  Europe,
  FalklandIslands,
  FaroeIslands,
  Fiji,
  Finland,
  France,
  FrenchGuiana,
  FrenchPolynesia,
  FrenchSouthernTerritories,
  Gabon,
  Gambia,
  Georgia,
  Germany,
  Ghana,
  Gibraltar,
  Greece,
  Greenland,
  Grenada,
  Guadeloupe,
  Guam,
  Guatemala,
  Guernsey,
  GuineaBissau,
  Guinea,
  Guyana,
  Haiti,
  HeardIslandAndMcdonaldIslands,
  Honduras,
  HongKong,
  Hungary,
  Iceland,
  India,
  Indonesia,
  Iran,
  Iraq,
  Ireland,
  IsleOfMan,
  Israel,
  Italy,
  Jamaica,
  Japan,
  Jersey,
  Jordan,
  Kazakhstan,
  Kenya,
  Kiribati,
  Kosovo,
  Kuwait,
  Kyrgyzstan,
  Laos,
  Latvia,
  Lebanon,
  Lesotho,
  Liberia,
  Libya,
  Liechtenstein,
  Lithuania,
  Luxembourg,
  Macau,
  Madagascar,
  Malawi,
  Malaysia,
  Maldives,
  Mali,
  Malta,
  MarshallIslands,
  Martinique,
  Mauritania,
  Mauritius,
  Mayotte,
  Mexico,
  Micronesia,
  Moldova,
  Monaco,
  Mongolia,
  Montenegro,
  Montserrat,
  Morocco,
  Mozambique,
  Myanmar,
  Namibia,
  Nauru,
  Nepal,
  Netherlands,
  NewCaledonia,
  NewZealand,
  Nicaragua,
  Niger,
  Nigeria,
  Niue,
  NorfolkIsland,
  NorthAmerica,
  NorthKorea,
  NorthMacedonia,
  NorthernMarianaIslands,
  Norway,
  Olympics,
  Oman,
  Pakistan,
  Palau,
  Palestine,
  Panama,
  PapuaNewGuinea,
  Paraguay,
  Peru,
  Philippines,
  PitcairnIslands,
  Poland,
  Portugal,
  PuertoRico,
  Qatar,
  RepublicOfTheCongo,
  Romania,
  Runion,
  Russia,
  Rwanda,
  SaintBarthlemy,
  SaintHelena,
  SaintKittsAndNevis,
  SaintLucia,
  SaintMartin,
  SaintPierreAndMiquelon,
  SaintVincentAndTheGrenadines,
  Samoa,
  SanMarino,
  SaudiArabia,
  Senegal,
  Serbia,
  Seychelles,
  SierraLeone,
  Singapore,
  SintMaarten,
  Slovakia,
  Slovenia,
  SoTomAndPrncipe,
  SolomonIslands,
  Somalia,
  SouthAfrica,
  SouthAmerica,
  SouthGeorgiaAndTheSouthSandwichIslands,
  SouthKorea,
  SouthSudan,
  Spain,
  SriLanka,
  Sudan,
  Suriname,
  SvalbardAndJanMayen,
  Sweden,
  Switzerland,
  Syria,
  Taiwan,
  Tajikistan,
  Tanzania,
  Thailand,
  Togo,
  Tokelau,
  Tonga,
  TrinidadAndTobago,
  Tunisia,
  Turkey,
  Turkmenistan,
  TurksAndCaicosIslands,
  Tuvalu,
  Uganda,
  Ukraine,
  UnitedArabEmirates,
  UnitedKingdom,
  UnitedStatesMinorOutlyingIslands,
  UnitedStatesVirginIslands,
  UnitedStates,
  Uruguay,
  Uzbekistan,
  Vanuatu,
  VaticanCity,
  Venezuela,
  Vietnam,
  Wales,
  WallisAndFutuna,
  WesternSahara,
  World,
  Yemen,
  Zambia,
  Zimbabwe,
  LandIslands,
};
