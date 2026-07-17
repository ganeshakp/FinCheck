export async function AddStock(supabase, userId, symbol) {
    await supabase.from('watchlist').insert({ user_id: userId, symbol: symbol.toUpperCase() });
}

export async function RemoveStock(supabase, id) {
    await supabase.from('watchlist').delete().eq('id', id);
}

export async function FetchWatchlist(supabase, userId) {
    const { data, error } = await supabase.from('watchlist').select('*').eq('user_id', userId);
    if (error) {
        throw new Error(`Supabase error: ${error.message}`);
    }
    return data || null;
}