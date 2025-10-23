
export interface StockData {
  status: 'OK' | 'Error' | 'Loading';
  updatedAt: string;
  ticker: string;
  company: string;
  sector: string;
  financialMarket: string;
  price: number | null;
  high: number | null;
  low: number | null;
  change: number | null;
  changePercent: number | null;
  volume: number | null;
  valueTraded: number | null;
  epsTTM: number | 'N/A' | null;
  peTTM: number | 'N/A' | null;
  dividendYield: number | null;
  roe: number | 'N/A' | null;
  marketCap: number | null;
  beta: number | null;
  high52w: number | null;
  low52w: number | null;
  lastDividend: number | null;
  lastDividendDate: string | null;
  note: string;
}

// Represents raw data from a hypothetical /quotes endpoint
export interface RawQuote {
  symbol: string;
  longName: string;
  sector: string;
  price: number;
  high: number;
  low: number;
  change: number;
  regularMarketChangePercent: { raw: number };
  volume: number;
  valueTraded: number;
  fiftyTwoWeekHigh: { raw: number };
  fiftyTwoWeekLow: { raw: number };
}

// Represents raw data from a hypothetical /fundamentals endpoint
export interface RawFundamentals {
  symbol: string;
  epsTrailingTwelveMonths?: { raw: number };
  trailingPE?: { raw: number };
  dividendYield?: { raw: number };
  returnOnEquity?: { raw: number };
  marketCap?: { raw: number };
  beta?: { raw: number };
}

// Represents raw data from a hypothetical /dividends endpoint
export interface RawDividends {
    symbol: string;
    lastDividendValue?: number;
    lastDividendDate?: number; // as unix timestamp
}
