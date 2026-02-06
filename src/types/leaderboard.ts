export interface Player {
  id: number;
  uuid: string;
  username: string;
  avatar_url: string | null;
  avatar_id?: string | null;
  vip?: {
    id: number;
    name: string;
    level: number;
    cms_property?: any;
  };
}

export interface Prize {
  type: string;
  amount: string;
  currency_code: string;
  converted?: {
    amount: string;
    currency: Currency;
  };
  currency?: Currency;
}

export interface Currency {
  name: string;
  code: string;
  symbol: string;
  decimals: number;
  order: number | null;
  type: number;
  type_name: string;
  is_default: number;
}

export interface LeaderboardEntry {
  rank: number;
  player: Player;
  prize: Prize;
  value: string;
  currency: Currency;
  mechanic_type: number;
  mechanic_type_name: string;
  me: boolean; // True if this is the current user
  converted?: {
    value: string;
    currency: Currency;
  };
}

export interface LeaderboardResponse {
  has_more: boolean;
  current_page: number;
  per_page: number;
  data: LeaderboardEntry[];
}
