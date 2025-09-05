// @ts-nocheck
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faFilter,
  faSearch,
  faMapMarkerAlt,
  faStar,
  faCalendarAlt,
  faClock,
  faUsers,
  faShoppingCart,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/favorites.css";
import usersService from "../services/usersService";
import paymentsService from "../services/paymentsService";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await usersService.getFavorites();
        const list = Array.isArray(data?.favorites) ? data.favorites : (Array.isArray(data) ? data : []);
        setFavorites(list);
      } catch (e) {
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const removeFavorite = async (itemId) => {
    try { await usersService.removeFromFavorites(itemId); } catch { }
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== itemId));
  };

  const addToCart = async (item) => {
    try {
      await paymentsService.addToCart({
        productId: item.id,
        quantity: 1,
        price: item.price && typeof item.price === 'string' ? Number(item.price.replace(/[^0-9.]/g, '')) : (item.price || 0),
        type: item.type || 'equipment',
      });
      alert('Added to cart');
    } catch (e) {
      alert(e.message || 'Failed to add to cart');
    }
  };

  const filteredAndSortedFavorites = favorites
    .filter(item => {
      const matchesFilter = filter === 'all' || item.type === filter;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const getFilterCount = (filterType) => {
    return favorites.filter(item => filterType === 'all' || item.type === filterType).length;
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="empty-favorites">
            <div className="empty-favorites-icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h2>No favorites yet</h2>
            <p>Start adding items to your favorites to see them here.</p>
            <Link to="/marketplace" className="btn btn-primary">
              <FontAwesomeIcon icon={faArrowLeft} />
              Explore Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1>My Favorites</h1>
          <p>{favorites.length} item{favorites.length !== 1 ? 's' : ''} in your favorites</p>
        </div>

        <div className="favorites-controls">
          <div className="search-section">
            <div className="search-input">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({getFilterCount('all')})
              </button>
              <button
                className={`filter-btn ${filter === 'venue' ? 'active' : ''}`}
                onClick={() => setFilter('venue')}
              >
                Venues ({getFilterCount('venue')})
              </button>
              <button
                className={`filter-btn ${filter === 'equipment' ? 'active' : ''}`}
                onClick={() => setFilter('equipment')}
              >
                Equipment ({getFilterCount('equipment')})
              </button>
            </div>

            <div className="sort-section">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="favorites-grid">
          {filteredAndSortedFavorites.map((item) => (
            <div key={item.id} className="favorite-card">
              <div className="card-image">
                <img src={item.image} alt={item.name} />
                <div className="card-overlay">
                  <button
                    className="remove-favorite"
                    onClick={() => removeFavorite(item.id)}
                    aria-label="Remove from favorites"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  {item.type === 'equipment' && (
                    <button
                      className="add-to-cart"
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                  )}
                </div>
                {item.type === 'venue' && (
                  <div className={`availability-badge ${item.isAvailable ? 'available' : 'unavailable'}`}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </div>
                )}
                {item.type === 'equipment' && !item.inStock && (
                  <div className="stock-badge out-of-stock">
                    Out of Stock
                  </div>
                )}
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3>{item.name}</h3>
                  {typeof item.rating !== 'undefined' && (
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} />
                      <span>{item.rating}</span>
                    </div>
                  )}
                </div>

                {item.brand && (
                  <p className="brand">{item.brand}</p>
                )}

                {item.location && (
                  <p className="fav-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span className="location-text">{item.location}</span>
                  </p>
                )}

                <p className="description">{item.description}</p>

                {item.type === 'venue' && item.amenities && (
                  <div className="amenities">
                    {item.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                    {item.amenities.length > 3 && (
                      <span className="amenity-tag">+{item.amenities.length - 3} more</span>
                    )}
                  </div>
                )}

                {item.type === 'equipment' && item.features && (
                  <div className="features">
                    {item.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                )}

                <div className="card-footer">
                  <div className="price">{item.price}</div>
                  {item.type === 'venue' && (
                    <Link to={`/details/${item.id}`} className="btn btn-primary">
                      Book Now
                    </Link>
                  )}
                  {item.type === 'equipment' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                    >
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedFavorites.length === 0 && (
          <div className="no-results">
            <h3>No items found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}

        <div className="favorites-actions">
          <Link to="/marketplace" className="btn btn-secondary">
            <FontAwesomeIcon icon={faArrowLeft} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Favorites; 