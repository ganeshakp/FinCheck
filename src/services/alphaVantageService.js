const BASE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query?';

if (!BASE_API_KEY) {
  throw new Error('Alpha Vantage API key not found');
}

async function fetchJSON(queryParams){
    const url = `${BASE_URL}${new URLSearchParams({
        ...queryParams,
        apikey: BASE_API_KEY
    })}`;

    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`AlphaVantage HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function getDailyStockData(symbol){
    const json = await fetchJSON({
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
    });
    return json;
}