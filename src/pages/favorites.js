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

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Mock favorites data - in a real app, this would come from context or API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFavorites([
        {
          id: 1,
          name: "Central Park Tennis Center",
          type: "venue",
          category: "tennis",
          location: "New York, NY",
          rating: 4.8,
          price: "$45/hour",
          image: "/images/select-sport-img-1.png.png",
          description: "Professional tennis courts with excellent facilities",
          amenities: ["Indoor Courts", "Pro Shop", "Coaching"],
          isAvailable: true
        },
        {
          id: 2,
          name: "Wilson Pro Staff Tennis Racket",
          type: "equipment",
          category: "tennis",
          brand: "Wilson",
          price: "$189.99",
          image: "/images/select-sport-img-2.png.png",
          description: "Professional grade tennis racket for advanced players",
          features: ["Graphite Frame", "16x19 String Pattern", "315g"],
          inStock: true
        },
        {
          id: 3,
          name: "Basketball Court - Downtown Sports Complex",
          type: "venue",
          category: "basketball",
          location: "Los Angeles, CA",
          rating: 4.6,
          price: "$35/hour",
          image: "/images/select-sport-img-3.png.png",
          description: "Indoor basketball courts with professional flooring",
          amenities: ["Multiple Courts", "Locker Rooms", "Parking"],
          isAvailable: true
        },
        {
          id: 4,
          name: "Nike Air Zoom Tennis Shoes",
          type: "equipment",
          category: "tennis",
          brand: "Nike",
          price: "$129.99",
          image: "/images/select-sport-img-4.png.png",
          description: "Comfortable tennis shoes with excellent grip",
          features: ["Breathable Mesh", "Rubber Outsole", "Cushioned Midsole"],
          inStock: false
        },
        {
          id: 5,
          name: "Soccer Field - Riverside Park",
          type: "venue",
          category: "soccer",
          location: "Chicago, IL",
          rating: 4.7,
          price: "$60/hour",
          image: "/images/select-sport-img-5.png.png",
          description: "Full-size soccer field with natural grass",
          amenities: ["Floodlights", "Changing Rooms", "Parking"],
          isAvailable: true
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const removeFavorite = (itemId) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== itemId));
  };

  const addToCart = (item) => {
    // In a real app, this would add to cart context/state
    alert(`${item.name} added to cart!`);
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
                  <div className="rating">
                    <FontAwesomeIcon icon={faStar} />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {item.brand && (
                  <p className="brand">{item.brand}</p>
                )}

                {item.location && (
                  <p className="location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {item.location}
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