// @ts-nocheck
import React, { useEffect, useState } from 'react';
import gamesService from '../services/gamesService';

const OpenGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = async () => {
        try {
            setLoading(true);
            const data = await gamesService.getAvailableGames({ page: 1, limit: 20 });
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

    const join = async (id) => { try { await gamesService.joinGame(id); await load(); } catch (e) { alert(e.message || 'Failed to join'); } };
    const leave = async (id) => { try { await gamesService.leaveGame(id); await load(); } catch (e) { alert(e.message || 'Failed to leave'); } };

    if (loading) return <div style={{ padding: 20 }}>Loading games...</div>;
    if (error) return <div style={{ padding: 20, color: '#c00' }}>{error}</div>;

    if (!games.length) return <div style={{ padding: 20 }}>No open games.</div>;

    return (
        <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
            <h1 style={{ marginBottom: 16 }}>Open Matches</h1>
            {games.map(g => (
                <div key={g.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 16 }}>{g.venue?.name || g.title || 'Game'}</div>
                            <div style={{ color: '#666', fontSize: 14 }}>{g.sport} • {g.type || g.gameType} • {g.date} {g.time}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {!g.joined ? (
                                <button onClick={() => join(g.id)} style={{ background: '#7930d8', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>Join</button>
                            ) : (
                                <button onClick={() => leave(g.id)} style={{ background: 'transparent', color: '#7930d8', border: '1px solid #7930d8', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>Leave</button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OpenGames;


