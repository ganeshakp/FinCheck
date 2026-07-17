import React, { useState } from 'react';
import { getDailyStockData } from '../services/alphaVantageService';
import '../App.css';
import {createClient} from '@supabase/supabase-js';

export default function StockList({ userId }) {
    const [symbol, setSymbol] = useState([]);
    const [error, setError] = useState([]);
    const [performance, setPerformance] = useState([]);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    async function handleAddStock(e){
        
        e.preventDefault();

        await supabase.from('watchlist').insert({ user_id: userId, symbol: symbol.toUpperCase() });//testing

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