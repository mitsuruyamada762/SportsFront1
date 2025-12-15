export interface CarouselCard {
  id: string;
  type: 'match' | 'promo';
  cat?: string;
  time?: string;
  team1?: string;
  team2?: string;
  odd1?: string;
  odd2?: string;
  offerText?: string;
  buttonText?: string;
  isLive?: boolean;
  description?: string;
}

export type GameFilterItem = {
  label: string;
  value: string;
  img: string;
}

export interface RecieveMSG {
  id?: number;
  alias?: string;
  live?: boolean;
  type?: string;
}

export interface ProcessedMatch {
  id: number;
  team1: string;
  team2: string;
  team1Id?: number;
  team2Id?: number;
  score1?: number;
  score2?: number;
  matchTime?: string; // Formatted match time (e.g., "45:00", "90:00+3'")
  isLive: boolean;
  sportAlias?: string;
  competitionId?: number;
  startTs?: number;
  currentGameTime?: any;
  W2?: number;
  X?: number;
  W1?: number;
  market?: any;
  // Odds

  oddsOverUnder?: {
    over: string;
    under: string;
    threshold?: number; // e.g., 1.5, 2.5
  };
  oddsBothTeamsToScore?: {
    yes: string; // "GG"
    no: string; // "NG"
  };
  marketsAvailable: boolean;
}

