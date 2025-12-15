export interface Sport {
    id: number;
    name?: string;
    alias?: string;
    order?: number;
    subTotal?: number;
    region?: Record<string, Region>;
}

export interface Region {
    id: number;
    name?: string;
    alias?: string;
    order?: number;
    regionTotal?: number;
    competition?: Record<string, Competition>;
}

export interface Competition {
    id: number;
    name?: string;
    order?: number;
    favorite_order?: number;
    game?: Record<string, Game>;
}

export interface Game {
    id: number;
    markets_count?: number;
    team1_name?: string;
    team2_name?: string;
    team1_id?: number;
    team2_id?: number;
    start_ts?: number;
    stats?: Record<string, Stats>;
    type?: number; // 0 = prematch, 1 = live, 2 = finished
    is_blocked?: number;
    is_neutral_venue?: boolean;
    is_stat_available?: boolean;
    match_length?: number;
    text_info?: string;
    live_events?: any;
    info?: Record<string, Info>
    market?: Record<string, Market>;
    game_number?: number;
    region_alias?: string;
    sport_alias?: string;
}

export interface Stats {

}

export interface Info {
    add_info?: string;
    add_minutes?: string;
    current_game_state?: string;
    current_game_time?: string;
    field?: number;
    pass_team?: string;
    score1?: string;
    score2?: string;
    shirt1_color?: string;
    shirt2_color?: string;
    short1_color?: string;
    short2_color?: string;
    stoppage_firsthalf?: string;
    stoppage_secondhalf?: string;
}

export interface Market {
    id?: number;
    type?: string;
    name?: string;
    display_key?: string; // "WINNER", "TOTALS", "HANDICAP", etc.
    display_sub_key?: string;
    name_template?: string;
    order?: number;
    express_id?: number;
    cashout?: number;
    col_count?: number;
    group_id?: number;
    group_name?: string;
    point_sequence?: number;
    sequence?: number;
    group_order?: number;
    event?: Record<string, EventData>;
}

export interface EventData {
    id?: number;
    name?: string;
    order?: number;
    price?: number;
    type_1?: string;
    base?: number;
}

export interface WSMessage {
    rid?: string;
    data?: any;
    sport?: Record<string, Sport>;
    competition?: Record<string, Competition>;
    game?: Record<string, Game>;
}