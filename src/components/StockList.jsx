import React, { useState } from 'react';
import { getDailyStockData } from '../services/alphaVantageService';
import '../App.css';

export default function StockList({ userId }) {
    const [symbol, setSymbol] = useState([]);
    const [error, setError] = useState([]);
    const [performance, setPerformance] = useState([]);

    async function handleAddStock(e){
        e.preventDefault();
        setError('');
        setPerformance('');
        try{
            const changePercent = await getDailyStockData(symbol.toUpperCase());
            if(!changePercent) {
                setError(`No data found for symbol: ${symbol}`);
            }
            setPerformance(changePercent);
        } catch (err) {
            setError(err.message);
        }
    }

    return (<div>
        <form className="stock-form" onSubmit={handleAddStock}>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="AAPL"
            />
            <button type="submit">Add Stock</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {performance && (<p style={{ color: performance > 0 ? 'green' : 'red' }}>{performance}%</p>)}
        </form>
    </div>)
}