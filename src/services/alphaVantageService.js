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

    const timeSeries = json['Time Series (Daily)'];
    if(!timeSeries){
        throw new Error(`No time series data found for symbol: ${symbol}`);
    }
    
    const [latestDate, previousDate] = Object.keys(timeSeries);
    if(!latestDate || !previousDate){
        throw new Error(`Not enough data points for symbol: ${symbol}`);
    }

    const latestClose = parseFloat(timeSeries[latestDate]['4. close']);
    const previousClose = parseFloat(timeSeries[previousDate]['4. close']);
    const change = latestClose - previousClose;
    const changePercent = ((change / previousClose) * 100).toFixed(2);
    return changePercent;
}