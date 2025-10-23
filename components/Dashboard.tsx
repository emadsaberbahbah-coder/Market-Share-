
import React, { useState, useEffect, useCallback } from 'react';
import { StockData } from '../types';
import { INITIAL_TICKERS } from '../constants';
import { fetchStockDataForTickers } from '../services/apiService';
import StockTable from './StockTable';
import Header from './Header';
import Loader from './Loader';
import ErrorAlert from './ErrorAlert';

const Dashboard: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchStockDataForTickers(INITIAL_TICKERS);
      setStocks(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to fetch stock data: ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="space-y-6">
      <Header onRefresh={handleRefresh} lastUpdated={lastUpdated} isLoading={isLoading} />
      {error && <ErrorAlert message={error} />}
      <div className="bg-gray-800 rounded-lg shadow-lg p-1 sm:p-2">
        {isLoading && stocks.length === 0 ? <Loader /> : <StockTable stocks={stocks} />}
      </div>
    </div>
  );
};

export default Dashboard;
