// @ts-nocheck
import React, { useEffect, useState } from 'react';
import gamesService from '../services/gamesService';

const MyGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = async () => {
        try {
            setLoading(true);
            // Assuming backend filters by current user automatically; otherwise pass a filter
            const data = await gamesService.getAvailableGames({ mine: true });
            const list = Array.isArray(data?.games) ? data.games : (Array.isArray(data) ? data : []);
            setGames(list);
            setError('');
        } catch (e) {
            setError(e.message || 'Failed to load games');
            setGames([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    if (loading) return <div style={{ padding: 20 }}>Loading your games...</div>;
    if (error) return <div style={{ padding: 20, color: '#c00' }}>{error}</div>;
    if (!games.length) return <div style={{ padding: 20 }}>No games yet.</div>;

    return (
        <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
            <h1 style={{ marginBottom: 16 }}>My Games</h1>
            {games.map(g => (
                <div key={g.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 16 }}>{g.venue?.name || g.title || 'Game'}</div>
                            <div style={{ color: '#666', fontSize: 14 }}>{g.sport} • {g.type || g.gameType} • {g.date} {g.time}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyGames;


