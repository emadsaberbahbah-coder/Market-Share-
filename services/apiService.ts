
import { StockData, RawQuote, RawFundamentals, RawDividends } from '../types';

// --- Mock Data Generation ---
// This section simulates the FastAPI backend described in the original script.
// In a real application, this would be replaced with actual fetch() calls.

const mockRawQuotes: { [key: string]: RawQuote } = {
  '6013.SR': { symbol: '6013.SR', longName: 'Al-Bahar Group', sector: 'Industrials', price: 75.50, high: 76.00, low: 75.10, change: 0.20, regularMarketChangePercent: { raw: 0.0026 }, volume: 1500000, valueTraded: 113250000, fiftyTwoWeekHigh: { raw: 80.00 }, fiftyTwoWeekLow: { raw: 60.00 } },
  '1120.SR': { symbol: '1120.SR', longName: 'Riyadh Bank', sector: 'Financials', price: 45.20, high: 45.50, low: 44.90, change: -0.10, regularMarketChangePercent: { raw: -0.0022 }, volume: 3200000, valueTraded: 144640000, fiftyTwoWeekHigh: { raw: 50.00 }, fiftyTwoWeekLow: { raw: 40.00 } },
  '2222.SR': { symbol: '2222.SR', longName: 'Saudi Aramco', sector: 'Energy', price: 34.80, high: 35.00, low: 34.70, change: 0.05, regularMarketChangePercent: { raw: 0.0014 }, volume: 12000000, valueTraded: 417600000, fiftyTwoWeekHigh: { raw: 38.00 }, fiftyTwoWeekLow: { raw: 30.00 } },
  '7010.SR': { symbol: '7010.SR', longName: 'STC Group', sector: 'Communication Services', price: 92.30, high: 93.00, low: 92.00, change: 1.10, regularMarketChangePercent: { raw: 0.0120 }, volume: 2500000, valueTraded: 230750000, fiftyTwoWeekHigh: { raw: 100.00 }, fiftyTwoWeekLow: { raw: 85.00 } },
  '9405.SR': { symbol: '9405.SR', longName: 'Falcom Saudi ETF', sector: 'ETF', price: 28.15, high: 28.20, low: 28.10, change: 0.05, regularMarketChangePercent: { raw: 0.0018 }, volume: 50000, valueTraded: 1407500, fiftyTwoWeekHigh: { raw: 30.00 }, fiftyTwoWeekLow: { raw: 25.00 } },
  '4031.SR': { symbol: '4031.SR', longName: 'Fake Pharma Co.', sector: 'Healthcare', price: 150.00, high: 152.00, low: 149.50, change: -1.50, regularMarketChangePercent: { raw: -0.0099 }, volume: 800000, valueTraded: 120000000, fiftyTwoWeekHigh: { raw: 180.00 }, fiftyTwoWeekLow: { raw: 120.00 } },
};

const mockRawFundamentals: { [key: string]: RawFundamentals } = {
  '6013.SR': { symbol: '6013.SR', epsTrailingTwelveMonths: { raw: 3.50 }, trailingPE: { raw: 21.57 }, dividendYield: { raw: 0.025 }, returnOnEquity: { raw: 0.15 }, marketCap: { raw: 50000000000 }, beta: { raw: 0.8 } },
  '1120.SR': { symbol: '1120.SR', epsTrailingTwelveMonths: { raw: 2.10 }, trailingPE: { raw: 21.52 }, dividendYield: { raw: 0.031 }, returnOnEquity: { raw: 0.12 }, marketCap: { raw: 150000000000 }, beta: { raw: 0.95 } },
  '2222.SR': { symbol: '2222.SR', epsTrailingTwelveMonths: { raw: 1.80 }, trailingPE: { raw: 19.33 }, dividendYield: { raw: 0.042 }, returnOnEquity: { raw: 0.25 }, marketCap: { raw: 7000000000000 }, beta: { raw: 0.7 } },
  '7010.SR': { symbol: '7010.SR', epsTrailingTwelveMonths: { raw: 4.50 }, trailingPE: { raw: 20.51 }, dividendYield: { raw: 0.035 }, returnOnEquity: { raw: 0.18 }, marketCap: { raw: 300000000000 }, beta: { raw: 0.85 } },
  '9405.SR': { symbol: '9405.SR' }, // ETFs have no fundamentals
  '4031.SR': { symbol: '4031.SR', epsTrailingTwelveMonths: { raw: 8.20 }, trailingPE: { raw: 18.29 }, dividendYield: { raw: 0.015 }, returnOnEquity: { raw: 0.22 }, marketCap: { raw: 80000000000 }, beta: { raw: 1.1 } },
};

const mockRawDividends: { [key: string]: RawDividends } = {
    '6013.SR': { symbol: '6013.SR', lastDividendValue: 0.75, lastDividendDate: 1696118400 },
    '1120.SR': { symbol: '1120.SR', lastDividendValue: 0.50, lastDividendDate: 1698710400 },
};

const isETF = (ticker: string): boolean => ['9405.SR'].includes(ticker.toUpperCase());

// --- Normalization Logic ---
// This logic is adapted from the original Google Apps Script to transform raw API
// data into a consistent format for the UI.

const normalizeData = (ticker: string): StockData => {
  const q = mockRawQuotes[ticker];
  const f = mockRawFundamentals[ticker];
  const d = mockRawDividends[ticker];

  if (!q) {
    return {
      status: 'Error',
      ticker,
      updatedAt: new Date().toLocaleTimeString(),
      note: 'Ticker not found or API failed to return data.',
      company: '', sector: '', financialMarket: '', price: null, high: null, low: null, change: null, changePercent: null, volume: null, valueTraded: null, epsTTM: null, peTTM: null, dividendYield: null, roe: null, marketCap: null, beta: null, high52w: null, low52w: null, lastDividend: null, lastDividendDate: null,
    };
  }

  const etf = isETF(ticker);

  return {
    status: 'OK',
    updatedAt: new Date().toLocaleTimeString(),
    ticker: q.symbol,
    company: q.longName,
    sector: q.sector,
    financialMarket: 'TASI',
    price: q.price,
    high: q.high,
    low: q.low,
    change: q.change,
    changePercent: q.regularMarketChangePercent?.raw ?? null,
    volume: q.volume,
    valueTraded: q.valueTraded,
    epsTTM: etf ? 'N/A' : f?.epsTrailingTwelveMonths?.raw ?? null,
    peTTM: etf ? 'N/A' : f?.trailingPE?.raw ?? null,
    dividendYield: f?.dividendYield?.raw ?? null,
    roe: etf ? 'N/A' : f?.returnOnEquity?.raw ?? null,
    marketCap: f?.marketCap?.raw ?? null,
    beta: f?.beta?.raw ?? null,
    high52w: q.fiftyTwoWeekHigh?.raw ?? null,
    low52w: q.fiftyTwoWeekLow?.raw ?? null,
    lastDividend: d?.lastDividendValue ?? null,
    lastDividendDate: d?.lastDividendDate ? new Date(d.lastDividendDate * 1000).toLocaleDateString() : null,
    note: etf ? 'ETF: Limited fundamental data available.' : '',
  };
};


// --- Public API Service Function ---

export const fetchStockDataForTickers = async (tickers: string[]): Promise<StockData[]> => {
  console.log(`Fetching data for: ${tickers.join(', ')}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 750 + Math.random() * 500));

  const results = tickers.map(ticker => normalizeData(ticker));
  
  return results;
};
