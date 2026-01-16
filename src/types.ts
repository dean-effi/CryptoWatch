export type AppContextType = {
  isDark: boolean;
  toggleFavs: (coin: Coin) => void;
  favsList: object[];
} | null;

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_percentage_24h: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export type ExpandedCoin = {
  market_cap_rank: number;
  fully_diluted_valuation: {
    usd: number;
  };
  high_24h: {
    usd: number;
  };
  low_24h: {
    usd: number;
  };
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: {
    usd: number;
  };
  price_change_percentage_1h_in_currency: {
    usd: number;
  };
  price_change_percentage_24h_in_currency: {
    usd: number;
  };
  price_change_percentage_7d_in_currency: {
    usd: number;
  };
  price_change_percentage_14d_in_currency: {
    usd: number;
  };
  price_change_percentage_30d_in_currency: {
    usd: number;
  };
  price_change_percentage_60d_in_currency: {
    usd: number;
  };
  price_change_percentage_200d_in_currency: {
    usd: number;
  };
  price_change_percentage_1y_in_currency: {
    usd: number;
  };
  market_cap_change_24h_in_currency: {
    usd: number;
  };
  market_cap_change_percentage_24h_in_currency: {
    usd: number;
  };
  description: { en: string };
  image: { large: string; small: string };
  market_data: {
    circulating_supply: number;
    total_volume: {
      usd: number;
    };
    total_supply: number;
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
  };
  name: string;
};
