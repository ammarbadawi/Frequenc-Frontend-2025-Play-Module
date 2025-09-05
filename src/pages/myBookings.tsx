// @ts-nocheck
import React, { useEffect, useState } from 'react';
import bookingsService from '../services/bookingsService';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = async () => {
        try {
            setLoading(true);
            const data = await bookingsService.getUserBookings(1, 20);
            const list = Array.isArray(data?.bookings) ? data.bookings : (Array.isArray(data) ? data : []);
            setBookings(list);
            setError('');
        } catch (e) {
            setError(e.message || 'Failed to load bookings');
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const cancel = async (id) => {
        try { await bookingsService.cancelBooking(id); await load(); } catch (e) { alert(e.message || 'Failed to cancel'); }
    };

    if (loading) return <div style={{ padding: 20 }}>Loading bookings...</div>;
    if (error) return <div style={{ padding: 20, color: '#c00' }}>{error}</div>;

    if (!bookings.length) return <div style={{ padding: 20 }}>No bookings yet.</div>;

    return (
        <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
            <h1 style={{ marginBottom: 16 }}>My Bookings</h1>
            {bookings.map(b => (
                <div key={b.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: 16 }}>{b.venue?.name || b.venueName || 'Venue'}</div>
                            <div style={{ color: '#666', fontSize: 14 }}>{b.sport} • {b.court?.name || b.courtName} • {b.date} {b.timeSlot}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => cancel(b.id)} style={{ background: 'transparent', color: '#e00', border: '1px solid #e00', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBookings;


