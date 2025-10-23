
import { StockData } from './types';

export const INITIAL_TICKERS: string[] = ['6013.SR', '1120.SR', '2222.SR', '7010.SR', '9405.SR', '4031.SR'];

export const TABLE_HEADERS: { key: keyof StockData; label: string }[] = [
  { key: 'ticker', label: 'Ticker' },
  { key: 'company', label: 'Company' },
  { key: 'price', label: 'Price' },
  { key: 'changePercent', label: 'Change %' },
  { key: 'volume', label: 'Volume' },
  { key: 'marketCap', label: 'Market Cap' },
  { key: 'peTTM', label: 'P/E (TTM)' },
  { key: 'epsTTM', label: 'EPS (TTM)' },
  { key: 'dividendYield', label: 'Div. Yield' },
  { key: 'roe', label: 'ROE' },
  { key: 'high52w', label: '52W High' },
  { key: 'low52w', label: '52W Low' },
  { key: 'updatedAt', label: 'Updated At' },
];
