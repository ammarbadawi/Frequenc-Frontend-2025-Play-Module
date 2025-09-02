// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/modify.css";
import { CreatePopUp } from "../components/createGame/createPopUp";

const Marketplace2 = () => {
  const navigate = useNavigate();
  
  // Popup state for create game flow
  const [isPopUpEnabled, setIsPopUpEnabled] = useState(false);

  // Mock data for venues with different categories
  const [allVenues] = useState([
    {
      id: 1,
      name: "Sports Arena Complex",
      image: "images/img2.png",
      rating: 4.5,
      location: "H88W+225, Noida Golf Course, Sector 43, Noida, Uttar Pradesh 201303",
      categories: ["Football", "Basketball"],
      price: "$25/hour"
    },
    {
      id: 2,
      name: "Elite Badminton Club",
      image: "images/img3.png",
      rating: 4.8,
      location: "Sector 18, Gurgaon, Haryana 122015",
      categories: ["Badminton"],
      price: "$30/hour"
    },
    {
      id: 3,
      name: "Rugby Champions Ground",
      image: "images/img4.png",
      rating: 4.2,
      location: "Defence Colony, New Delhi 110024",
      categories: ["Rugby"],
      price: "$40/hour"
    },
    {
      id: 4,
      name: "Premium Golf Course",
      image: "images/img56.png",
      rating: 4.9,
      location: "Golf Course Road, Gurgaon, Haryana 122002",
      categories: ["Golf"],
      price: "$60/hour"
    },
    {
      id: 5,
      name: "Tennis Academy Pro",
      image: "images/imgd1.png",
      rating: 4.6,
      location: "Lajpat Nagar, New Delhi 110024",
      categories: ["Tennis"],
      price: "$35/hour"
    },
    {
      id: 6,
      name: "Multi-Sport Complex",
      image: "images/img2.png",
      rating: 4.3,
      location: "Sector 21, Faridabad, Haryana 121001",
      categories: ["Football", "Tennis", "Basketball"],
      price: "$28/hour"
    },
    {
      id: 7,
      name: "City Football Stadium",
      image: "images/img3.png",
      rating: 4.7,
      location: "Connaught Place, New Delhi 110001",
      categories: ["Football"],
      price: "$45/hour"
    },
    {
      id: 8,
      name: "Professional Badminton Center",
      image: "images/img4.png",
      rating: 4.4,
      location: "Vasant Vihar, New Delhi 110057",
      categories: ["Badminton"],
      price: "$32/hour"
    },
    {
      id: 9,
      name: "International Rugby Field",
      image: "images/img56.png",
      rating: 4.1,
      location: "Sector 29, Gurgaon, Haryana 122022",
      categories: ["Rugby"],
      price: "$50/hour"
    },
    {
      id: 10,
      name: "Elite Golf Resort",
      image: "images/imgd1.png",
      rating: 5.0,
      location: "Golf Course Extension Road, Gurgaon",
      categories: ["Golf"],
      price: "$80/hour"
    },
    {
      id: 11,
      name: "Champions Tennis Club",
      image: "images/img2.png",
      rating: 4.5,
      location: "Greater Kailash, New Delhi 110048",
      categories: ["Tennis"],
      price: "$38/hour"
    },
    {
      id: 12,
      name: "Ultimate Sports Hub",
      image: "images/img3.png",
      rating: 4.3,
      location: "Cyber City, Gurgaon, Haryana 122002",
      categories: ["Football", "Rugby", "Tennis"],
      price: "$42/hour"
    }
  ]);

  const [filteredVenues, setFilteredVenues] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const itemsPerPage = 6;

  // Extract unique locations from venues
  const locations = ["All Locations", ...new Set(allVenues.map(venue => {
    // Extract city from location string
    const parts = venue.location.split(',');
    return parts[parts.length - 2]?.trim() || parts[0].split(',')[0];
  }))];

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const categories = [
    { name: "All", count: allVenues.length },
    { name: "Football", count: allVenues.filter(v => v.categories.includes("Football")).length },
    { name: "Badminton", count: allVenues.filter(v => v.categories.includes("Badminton")).length },
    { name: "Rugby", count: allVenues.filter(v => v.categories.includes("Rugby")).length },
    { name: "Golf", count: allVenues.filter(v => v.categories.includes("Golf")).length },
    { name: "Tennis", count: allVenues.filter(v => v.categories.includes("Tennis")).length },
    { name: "Basketball", count: allVenues.filter(v => v.categories.includes("Basketball")).length }
  ];

  // Initialize filtered venues
  useEffect(() => {
    setFilteredVenues(allVenues);
  }, [allVenues]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown1s')) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Apply initial filters
  useEffect(() => {
    applyFilters();
  }, []);

  // Comprehensive filtering function
  const applyFilters = async () => {
    setLoading(true);
    setCurrentPage(1);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = allVenues;

    // Category filter
    if (!selectedCategories.includes("All")) {
      filtered = filtered.filter(venue => 
        venue.categories.some(cat => selectedCategories.includes(cat))
      );
    }

    // Location filter
    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter(venue => 
        venue.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(venue => 
        venue.name.toLowerCase().includes(query) ||
        venue.location.toLowerCase().includes(query) ||
        venue.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }

    // Date filter (for now, just validate that a date is selected)
    // In a real app, you'd filter based on available time slots for that date
    if (selectedDate) {
      // This is where you'd implement date-based availability filtering
      // For now, we'll just keep all venues as available
    }

    setFilteredVenues(filtered);
    setLoading(false);
  };

  // Handle category filtering
  const handleCategoryChange = async (categoryName) => {
    let newSelectedCategories;
    
    if (categoryName === "All") {
      newSelectedCategories = ["All"];
    } else {
      if (selectedCategories.includes("All")) {
        newSelectedCategories = [categoryName];
      } else {
        if (selectedCategories.includes(categoryName)) {
          newSelectedCategories = selectedCategories.filter(cat => cat !== categoryName);
          if (newSelectedCategories.length === 0) {
            newSelectedCategories = ["All"];
          }
        } else {
          newSelectedCategories = [...selectedCategories, categoryName];
        }
      }
    }

    setSelectedCategories(newSelectedCategories);
    // Apply filters after category change
    setTimeout(() => applyFilters(), 100);
  };

  // Handle location filter
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
    setTimeout(() => applyFilters(), 100);
  };

  // Handle date filter
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTimeout(() => applyFilters(), 100);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setTimeout(() => applyFilters(), 300); // Debounce search
  };

  // Handle check button click
  const handleCheckAvailability = () => {
    applyFilters();
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories(["All"]);
    setSelectedLocation("All Locations");
    setSelectedDate("");
    setSearchQuery("");
    setTimeout(() => applyFilters(), 100);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVenues = filteredVenues.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Gameplacebox component with dynamic data
  const GameplaceboxDynamic = ({ venue }) => {
    return (
      <div className="col-md-6">
        <Link to={`/details/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="boxshop" style={{ 
            cursor: 'pointer', 
            transition: 'transform 0.2s, box-shadow 0.2s',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div className="imagebox">
              <img src={venue.image} alt={venue.name} />
              <i className="fa fa-heart-o"></i>
            </div>
            <div className="nameshop">
              <h2 className="modify_title">{venue.name}</h2>
              <div className="ratings">
                {venue.rating} <i className="fa fa-star active"></i>
              </div>
            </div>
            <div className="locations">
              {venue.location}
            </div>
            <div className="searchbuttons">
              {venue.categories.slice(0, 3).map((category, index) => (
                <span key={index} className="btnicon">{category}</span>
              ))}
              {venue.categories.length > 3 && <span>+{venue.categories.length - 3}</span>}
              <span className="price-tag" style={{
                backgroundColor: '#7930d8',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                marginLeft: '8px'
              }}>
                {venue.price}
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <section className="midshop">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sidebarfil" onClick={() => setIsPopUpEnabled(true)}>
                <a href="#" className="creategame btn">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.33203 10.334H7.66536L7.66536 7.66732L10.332 7.66732V6.33398L7.66536 6.33398L7.66536 3.66732L6.33203 3.66732L6.33203 6.33398L3.66536 6.33398L3.66536 7.66732L6.33203 7.66732L6.33203 10.334ZM6.9987 13.6673C6.07648 13.6673 5.20981 13.4951 4.3987 13.1507C3.58759 12.7951 2.88203 12.3173 2.28203 11.7173C1.68203 11.1173 1.20425 10.4118 0.848698 9.60065C0.504253 8.78954 0.332031 7.92287 0.332031 7.00065C0.332031 6.07843 0.504253 5.21176 0.848698 4.40065C1.20425 3.58954 1.68203 2.88398 2.28203 2.28398C2.88203 1.68398 3.58759 1.21176 4.3987 0.867317C5.20981 0.511762 6.07648 0.333984 6.9987 0.333984C7.92092 0.333984 8.78759 0.511762 9.5987 0.867317C10.4098 1.21176 11.1154 1.68398 11.7154 2.28398C12.3154 2.88398 12.7876 3.58954 13.132 4.40065C13.4876 5.21176 13.6654 6.07843 13.6654 7.00065C13.6654 7.92287 13.4876 8.78954 13.132 9.60065C12.7876 10.4118 12.3154 11.1173 11.7154 11.7173C11.1154 12.3173 10.4098 12.7951 9.5987 13.1507C8.78759 13.4951 7.92092 13.6673 6.9987 13.6673ZM6.9987 12.334C8.48759 12.334 9.7487 11.8173 10.782 10.784C11.8154 9.75065 12.332 8.48954 12.332 7.00065C12.332 5.51176 11.8154 4.25065 10.782 3.21732C9.7487 2.18398 8.48759 1.66732 6.9987 1.66732C5.50981 1.66732 4.2487 2.18398 3.21536 3.21732C2.18203 4.25065 1.66536 5.51176 1.66536 7.00065C1.66536 8.48954 2.18203 9.75065 3.21536 10.784C4.2487 11.8173 5.50981 12.334 6.9987 12.334Z"
                      fill="white"
                    />
                  </svg>
                  Create Game
                </a>
              </div>
              <div className="filterbox">
                <div className="filterboxw">
                  <div className="filtertitle">
                    <span>Check Availability</span>
                  </div>
                  <div className="dropdownsearch">
                    <div className="dropdown1s" style={{ position: 'relative' }}>
                      <div 
                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        {selectedLocation} <i className="fa fa-angle-down"></i>
                      </div>
                      {showLocationDropdown && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          backgroundColor: 'white',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          zIndex: 1000,
                          maxHeight: '200px',
                          overflowY: 'auto'
                        }}>
                          {locations.map((location) => (
                            <div
                              key={location}
                              onClick={() => handleLocationChange(location)}
                              style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                backgroundColor: selectedLocation === location ? '#f0f0f0' : 'white',
                                borderBottom: '1px solid #eee'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = selectedLocation === location ? '#f0f0f0' : 'white'}
                            >
                              {location}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="dropdown1s">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        min={today}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          width: '100%',
                          cursor: 'pointer',
                          fontSize: 'inherit',
                          color: 'inherit'
                        }}
                      />
                    </div>
                  </div>
                  <div className="btny text-center">
                    <button 
                      onClick={handleCheckAvailability}
                      className="creatCheck btn"
                      disabled={loading}
                      style={{ 
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1 
                      }}
                    >
                      {loading ? 'Checking...' : 'Check'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="filterbox">
                <div className="filtertitle">
                  <span>Categories</span>
                  {loading && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#7930d8',
                      marginLeft: '10px'
                    }}>
                      Loading...
                    </div>
                  )}
                </div>

                <ul>
                  {categories.map((category) => (
                    <li key={category.name}>
                      <label className="containerchj">
                        {category.name}
                        <input 
                          type="checkbox" 
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategoryChange(category.name)}
                          disabled={loading}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <span className="numberc">({category.count})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-9">
              <div className="elementlist">
                <div className="resutcount">
                  <div className="ressult">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVenues.length)} of {filteredVenues.length} results
                    {(selectedLocation !== "All Locations" || selectedDate || searchQuery || !selectedCategories.includes("All")) && (
                      <>
                        <span style={{ color: '#7930d8', marginLeft: '10px', fontSize: '12px' }}>
                          (Filtered)
                        </span>
                        <button 
                          onClick={clearAllFilters}
                          style={{ 
                            marginLeft: '8px', 
                            fontSize: '12px', 
                            color: '#7930d8',
                            background: 'none',
                            border: 'none',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                        >
                          Clear All
                        </button>
                      </>
                    )}
                    | <a href="#" onClick={(e) => {
                      e.preventDefault();
                      // You can implement "Near Me" functionality here
                      alert('Near Me functionality would use user\'s location');
                    }}>Near Me</a>
                  </div>
                  <div className="sercressult">
                    <div className="subsforms">
                      <input
                        type="text"
                        placeholder="Search venues, locations, sports..."
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      <span className="submitnew">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.9996 14L11.5996 11.6"
                            stroke="#171A1F"
                            strokeWidth="0.8"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.8 11.6C9.45097 11.6 11.6 9.45097 11.6 6.8C11.6 4.14903 9.45097 2 6.8 2C4.14903 2 2 4.14903 2 6.8C2 9.45097 4.14903 11.6 6.8 11.6Z"
                            stroke="#171A1F"
                            strokeWidth="0.8"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                
                {loading ? (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '200px',
                    fontSize: '18px',
                    color: '#7930d8'
                  }}>
                    <div>
                      <i className="fa fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
                      Loading venues...
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    {currentVenues.map((venue) => (
                      <GameplaceboxDynamic key={venue.id} venue={venue} />
                    ))}
                  </div>
                )}
                
                {/* Pagination Component */}
                {!loading && filteredVenues.length > 0 && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    gap: '12.667px',
                    marginTop: '40px',
                    justifyContent: 'center',
                    width: '100%'
                  }}>
                    {/* Previous Arrow */}
                    <div 
                      onClick={() => handlePageChange(currentPage - 1)}
                      style={{
                        borderRadius: '5.278px',
                        border: '1.056px solid #D6D6D6',
                        background: '#FFF',
                        display: 'flex',
                        width: '48.556px',
                        height: '48.556px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
                        opacity: currentPage > 1 ? 1 : 0.5
                      }}
                    >
                      <span style={{ fontSize: '20px', color: '#000' }}>&#8249;</span>
                    </div>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      const isActive = pageNum === currentPage;
                      
                      return (
                        <div
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          style={{
                            borderRadius: '5.278px',
                            background: isActive ? '#03103B' : '#FFF',
                            border: isActive ? 'none' : '1.056px solid #D6D6D6',
                            display: 'flex',
                            width: '48.556px',
                            height: '48.556px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{
                            color: isActive ? '#FFF' : '#000',
                            textAlign: 'center',
                            fontFamily: 'Poppins',
                            fontSize: '16.889px',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            lineHeight: '25.333px',
                            letterSpacing: '0.084px'
                          }}>
                            {pageNum}
                          </span>
                        </div>
                      );
                    })}

                    {/* Next Arrow */}
                    <div 
                      onClick={() => handlePageChange(currentPage + 1)}
                      style={{
                        borderRadius: '5.278px',
                        border: '1.056px solid #D6D6D6',
                        background: '#FFF',
                        display: 'flex',
                        width: '48.556px',
                        height: '48.556px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: currentPage < totalPages ? 'pointer' : 'not-allowed',
                        opacity: currentPage < totalPages ? 1 : 0.5
                      }}
                    >
                      <span style={{ fontSize: '20px', color: '#000' }}>&#8250;</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* popUp for making game */}
      {isPopUpEnabled && (
        <CreatePopUp
          setIsPopUpEnabled={setIsPopUpEnabled}
        />
      )}
    </div>
  );
};

export default Marketplace2;
