export interface Player {
  id: number;
  uuid: string;
  username: string;
  avatar_url: string;
  vip?: {
    id: number;
    name: string;
    level: number;
  };
}

export interface Prize {
  type: string;
  amount: string;
  currency_code: string;
}

export interface Currency {
  code: string;
  symbol: string;
}

export interface LeaderboardEntry {
  rank: number;
  player: Player;
  prize: Prize;
  value: string;
  currency: Currency;
  mechanic_type: number;
  mechanic_type_name: string;
}

export interface LeaderboardResponse {
  has_more: boolean;
  current_page: number;
  per_page: number;
  data: LeaderboardEntry[];
}
