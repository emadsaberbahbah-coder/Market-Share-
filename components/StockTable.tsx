
import React, { useState, useMemo } from 'react';
import { StockData } from '../types';
import { TABLE_HEADERS } from '../constants';
import StockTableRow from './StockTableRow';

interface StockTableProps {
  stocks: StockData[];
}

type SortKey = keyof StockData;
type SortOrder = 'asc' | 'desc';

const StockTable: React.FC<StockTableProps> = ({ stocks }) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }>({ key: 'ticker', order: 'asc' });

  const sortedStocks = useMemo(() => {
    let sortableItems = [...stocks];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        
        if (valA === 'N/A') return 1;
        if (valB === 'N/A') return -1;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (valA < valB) {
          return sortConfig.order === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [stocks, sortConfig]);

  const requestSort = (key: SortKey) => {
    let order: SortOrder = 'asc';
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ key, order });
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return '↕';
    }
    return sortConfig.order === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-cyan-300 uppercase bg-gray-700 sticky top-0">
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th key={header.key} scope="col" className="px-4 py-3 cursor-pointer" onClick={() => requestSort(header.key)}>
                <div className="flex items-center">
                  {header.label}
                  <span className="ml-2">{getSortIcon(header.key)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock) => (
            <StockTableRow key={stock.ticker} stock={stock} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
