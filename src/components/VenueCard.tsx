// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usersService from '../services/usersService';

const VenueCard = ({ venue }) => {
    const image = (venue?.imageUrl) || (venue?.gallery?.[0]) || '/images/homepage.png';
    const rating = typeof venue?.rating === 'number' ? venue.rating : 0;
    const reviewCount = venue?.reviewCount ?? 0;
    const locationText = venue?.address ?? '';

    const [favLoading, setFavLoading] = useState(false);
    const [isFav, setIsFav] = useState(false);

    return (
        <div class="col-md-6">
            <div class="matchsec" style={{ cursor: 'pointer' }}>
                <Link to={`/details/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        width: '100%',
                        height: '180px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginBottom: '12px'
                    }} />

                    <div class="otherinfo">
                        <div class="info1">
                            <div class="venuname">{venue.name}</div>
                            <div class="venunamel">{locationText}</div>
                        </div>
                        <div class="info1">
                            <div class="venuname">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} style={{ color: i < Math.floor(rating) ? '#FFD700' : '#ddd' }}>★</span>
                                ))}
                            </div>
                            <div class="venunamel">{rating.toFixed(1)} ({reviewCount})</div>
                        </div>
                    </div>
                </Link>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            try {
                                setFavLoading(true);
                                if (!isFav) { await usersService.addToFavorites(venue.id); setIsFav(true); }
                                else { await usersService.removeFromFavorites(venue.id); setIsFav(false); }
                            } catch (err) { alert(err.message || 'Failed'); } finally { setFavLoading(false); }
                        }}
                        disabled={favLoading}
                        style={{ background: '#7930d8', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}
                    >
                        {favLoading ? 'Saving...' : (isFav ? 'Unfavorite' : 'Favorite')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VenueCard;


