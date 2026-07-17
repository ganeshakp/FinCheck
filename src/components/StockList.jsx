import React, { useState } from 'react';
import { getDailyStockData } from '../services/alphaVantageService';
import { FetchWatchlist, AddStock, RemoveStock } from '../services/supabaseService';
import '../App.css';
import {createClient} from '@supabase/supabase-js';

export default function StockList({ userId }) {
    const [symbol, setSymbol] = useState([]);
    const [error, setError] = useState([]);
    const [stocks, setStocks] = useState([]);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    async function handleFetchWatchList(){
        const data = await FetchWatchlist(supabase, userId);
        setStocks(data);
    }

    async function handleAddStock(e){        
        e.preventDefault();
        setError('');
        await AddStock(supabase, userId, symbol);       
        setsymbol('');
        await handleFetchWatchList();        
    }

    async function handleRemoveStock(){
        await RemoveStock(supabase, stock.id);
        await handleFetchWatchList();
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
            {stocks && stocks.map((stock) => (
                <p key={stock.id} style={{ color: stock.changePercent > 0 ? 'green' : 'red' }}>
                    {stock.symbol}: {stock.changePercent}%
                </p>
            ))}
        </form>
    </div>)
}