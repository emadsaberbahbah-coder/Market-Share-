
import React from 'react';
import { StockData } from '../types';
import { TABLE_HEADERS } from '../constants';

interface StockTableRowProps {
  stock: StockData;
}

const formatNumber = (num: number | null | undefined, options: Intl.NumberFormatOptions = {}) => {
  if (num === null || num === undefined) return '-';
  return new Intl.NumberFormat('en-US', options).format(num);
};

const formatPercent = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '-';
    const color = num > 0 ? 'text-green-400' : num < 0 ? 'text-red-400' : 'text-gray-400';
    return <span className={color}>{formatNumber(num, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
}

const formatMarketCap = (num: number | null | undefined) => {
    if (num === null || num === undefined) return '-';
    if (num >= 1_000_000_000_000) {
        return `${formatNumber(num / 1_000_000_000_000, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}T`;
    }
    if (num >= 1_000_000_000) {
        return `${formatNumber(num / 1_000_000_000, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}B`;
    }
    if (num >= 1_000_000) {
        return `${formatNumber(num / 1_000_000, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`;
    }
    return formatNumber(num);
}

const CellContent: React.FC<{ stock: StockData, headerKey: keyof StockData }> = ({ stock, headerKey }) => {
  const value = stock[headerKey];

  switch (headerKey) {
    case 'ticker':
      return <span className="font-bold text-cyan-400">{value}</span>;
    case 'company':
      return <div className="max-w-xs truncate" title={String(value)}>{String(value)}</div>
    case 'price':
      return formatNumber(value as number, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    case 'changePercent':
    case 'dividendYield':
    case 'roe':
      return formatPercent(value as number);
    case 'volume':
      return formatNumber(value as number);
    case 'marketCap':
      return formatMarketCap(value as number);
    case 'peTTM':
    case 'epsTTM':
       return value === 'N/A' ? 'N/A' : formatNumber(value as number, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    case 'high52w':
    case 'low52w':
        return formatNumber(value as number, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    default:
      return String(value ?? '-');
  }
};


const StockTableRow: React.FC<StockTableRowProps> = ({ stock }) => {
  return (
    <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
      {TABLE_HEADERS.map(({ key }) => (
        <td key={key} className="px-4 py-3">
          <CellContent stock={stock} headerKey={key} />
        </td>
      ))}
    </tr>
  );
};

export default StockTableRow;
