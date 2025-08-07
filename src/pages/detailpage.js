import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import "../styles/booking.css";
import venuesService from "../services/venuesService";
import bookingsService from "../services/bookingsService";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState("Golf");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(0);
  const [duration, setDuration] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDateIndex, setSelectedDateIndex] = useState(2); // Default to Fri Sep 02
  const [selectedCourtIndex, setSelectedCourtIndex] = useState(0); // Default to Tennis Court 1
  const [showCalendar, setShowCalendar] = useState(false);
  const [showOpenMatchesPopup, setShowOpenMatchesPopup] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState(null);

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState([]);

  // Fetch venue data
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const venueData = await venuesService.getVenue(id);
        setVenue(venueData);
        
        // Fetch availability for today
        const today = new Date().toISOString().split('T')[0];
        const availabilityData = await venuesService.getAvailability(id, today);
        setAvailability(availabilityData.timeSlots || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  // Generate calendar for current month
  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendar = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendar.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }
    
    return calendar;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const handleDateClick = (index) => {
    setSelectedDateIndex(index);
    const dateButtons = generateDateButtons();
    if (dateButtons[index]) {
      setSelectedDate(dateButtons[index].fullDate);
    }
  };

  const handleCourtClick = (index) => {
    setSelectedCourtIndex(index);
  };

  const handleOpenMatchesClick = () => {
    setShowOpenMatchesPopup(true);
  };

  const handleCloseOpenMatchesPopup = () => {
    setShowOpenMatchesPopup(false);
    setSelectedGameType(null);
  };

  const handleGameTypeSelect = (type) => {
    setSelectedGameType(type);
    
    // Navigate to booking policy page with game data for both singles and doubles
    const gameData = {
      gameType: type === 'singles' ? 'Singles' : 'Doubles',
      venue: venue.name,
      duration: `${duration * 60} min`,
      sport: selectedSport,
      court: `${selectedSport} Court ${selectedCourtIndex + 1}`,
      surface: 'Outdoor | Synthetic Grass',
      date: `${weekDays[selectedDate.getDay()]}, ${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()} at 1:00 Pm - 2:00 Pm`,
      partPrice: 7, // This will be recalculated in booking policy based on game type
      fullPrice: 14,
      subtotal: 7.29 // This will be recalculated in booking policy based on game type
    };
    
    navigate('/booking-policy', { state: gameData });
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCalendarDateClick = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    
    // Update the selectedDateIndex to maintain consistency
    const dateButtons = generateDateButtons();
    const newIndex = dateButtons.findIndex(btn => 
      btn.fullDate.toDateString() === date.toDateString()
    );
    if (newIndex !== -1) {
      setSelectedDateIndex(newIndex);
    } else {
      setSelectedDateIndex(2); // Default to middle position
    }
  };

  // Generate 5 consecutive dates around the selected date
  const generateDateButtons = () => {
    const dates = [];
    const startDate = new Date(selectedDate);
    startDate.setDate(startDate.getDate() - 2); // Start 2 days before selected date
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push({
        day: weekDays[date.getDay()],
        date: `${monthNames[date.getMonth()].substr(0, 3)} ${date.getDate().toString().padStart(2, '0')}`,
        fullDate: date
      });
    }
    return dates;
  };

  useEffect(() => {
    // Load Google Maps script
    // Replace YOUR_GOOGLE_MAPS_API_KEY with your actual Google Maps API key
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
    
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error('Google Maps API failed to load. Please check your API key.');
        // Show fallback message
        const mapDiv = document.getElementById('map');
        if (mapDiv) {
          mapDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666; font-size: 16px; text-align: center;">
              <div>
                <p>Google Maps API key required</p>
                <p style="font-size: 12px;">Please add your Google Maps API key to the environment variables</p>
              </div>
            </div>
          `;
        }
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCalendar && !event.target.closest('.calendar-header')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  // Close open matches popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOpenMatchesPopup && !event.target.closest('.open-matches-popup')) {
        handleCloseOpenMatchesPopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOpenMatchesPopup]);

  const initMap = () => {
    if (window.google && document.getElementById('map')) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: venue.location.lat, lng: venue.location.lng },
        styles: [
          {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
          }
        ]
      });

      new window.google.maps.Marker({
        position: { lat: venue.location.lat, lng: venue.location.lng },
        map: map,
        title: venue.name,
        animation: window.google.maps.Animation.DROP
      });
    }
  };

  return (
    <>
    <div className="detailpage">
        <div className="container" style={{ paddingTop: '20px' }}>
                {/* Header Section */}
        <div className="row">
          <div className="col-12">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', width: '100%' }}>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '32px', fontWeight: '600', margin: '0 0 10px 0' }}>{venue.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} style={{ color: star <= Math.floor(venue.rating) ? '#FFD700' : '#ddd', fontSize: '16px' }}>★</span>
                    ))}
                    <span style={{ marginLeft: '8px', fontSize: '16px', fontWeight: '600' }}>{venue.rating}</span>
                    <span style={{ marginLeft: '5px', fontSize: '14px', color: '#666' }}>({venue.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                <button style={{
                  background: '#7930d8',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Wishlist
                </button>
                <button style={{
                  background: 'transparent',
                  color: '#7930d8',
                  border: '1px solid #7930d8',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="row" style={{ marginBottom: '30px' }}>
          <div className="col-md-8">
            <div style={{ 
              width: '100%', 
              height: '300px', 
              borderRadius: '12px', 
              overflow: 'hidden',
              backgroundImage: `url(${venue.images[currentImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
          </div>
          <div className="col-md-4">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', height: '300px' }}>
              {venue.images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImageIndex(index + 1)}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: currentImageIndex === index + 1 ? '2px solid #7930d8' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="row">
            <div className="booking-header">
              <div className="booking-header-content">
                <h3 className="booking-title">Book</h3>
                <p className="booking-subtitle">Create a private match where you can invite your friends</p>
              </div>
              <button className="open-matches-btn" onClick={handleOpenMatchesClick}>
                Open Matches
              </button>
            </div>

            {/* Main Container - Full width */}
            <div className="booking-container">
              
              {/* Left Side - Sports Section */}
              <div className="sports-section">
                {/* Sports Offered by venue */}
                <div className="sports-offered">
                  <h4 className="section-title">Sports offered by venue</h4>
                  <div className="sports-buttons">
                    <button className={`sport-btn ${selectedSport === 'Golf' ? 'active' : ''}`} onClick={() => setSelectedSport('Golf')}>
                      Golf
                    </button>
                    <button className={`sport-btn ${selectedSport === 'Tennis' ? 'active' : ''}`} onClick={() => setSelectedSport('Tennis')}>
                      Tennis
                    </button>
                  </div>
                </div>

                {/* Tennis Courts */}
                <div className="courts-section">
                  <h4 className="section-title">Sports offered by venue</h4>
                  <div className="courts-buttons">
                    <button 
                      className={`court-btn ${selectedCourtIndex === 0 ? 'active' : ''}`}
                      onClick={() => handleCourtClick(0)}
                    >
                      Tennis Court 1
                    </button>
                    <button 
                      className={`court-btn ${selectedCourtIndex === 1 ? 'active' : ''}`}
                      onClick={() => handleCourtClick(1)}
                    >
                      Tennis Court 2
                    </button>
                    <button 
                      className={`court-btn ${selectedCourtIndex === 2 ? 'active' : ''}`}
                      onClick={() => handleCourtClick(2)}
                    >
                      Tennis Court 3
                    </button>
                  </div>
                </div>

                {/* Duration */}
                <div className="duration-section">
                  <h4 className="section-title">Duration</h4>
                  <div className="duration-controls">
                    <button 
                      className="duration-btn"
                      onClick={() => duration > 1 && setDuration(duration - 1)}
                    >
                      -
                    </button>
                    <span className="duration-display">{duration} Hr</span>
                    <button 
                      className="duration-btn"
                      onClick={() => setDuration(duration + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Calendar and Booking */}
              <div className="calendar-section">
                {/* Calendar Header */}
                <div className="calendar-header">
                  <div className="date-navigation">
                    <div className="month-year">
                      <h4 className="month-display">
                        {monthNames[selectedDate.getMonth()]} , {selectedDate.getFullYear()}
                      </h4>
                      <span className="dropdown-arrow" onClick={toggleCalendar}>▼</span>
                    </div>
                  </div>
                  {showCalendar && (
                    <div className="calendar-popup">
                      <div className="calendar-grid">
                                                 {generateCalendar().map((day, index) => (
                           <button
                             key={index}
                             className={`calendar-day ${!day ? 'empty' : ''} ${
                               day && day === selectedDate.getDate() ? 'selected' : ''
                             }`}
                             onClick={() => day && handleCalendarDateClick(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                             disabled={!day}
                           >
                             {day}
                           </button>
                         ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Date Buttons */}
                <div className="date-buttons">
                  <button className="nav-arrow" onClick={handlePrevMonth}>
                    &lt;
                  </button>
                  {generateDateButtons().map((item, index) => (
                    <button
                      key={index}
                      className={`date-btn ${selectedDateIndex === index ? 'active' : ''}`}
                      onClick={() => handleDateClick(index)}
                    >
                      <div>{item.day}</div>
                      <div>{item.date}</div>
                    </button>
                  ))}
                  <button className="nav-arrow" onClick={handleNextMonth}>
                    &gt;
                  </button>
                </div>

                {/* Slots Count */}
                <div className="slots-count">
                  <span className="slots-text">10 Slots</span>
                </div>

                {/* Time Slots */}
                <div className="time-slots">
                  {[
                    { time: '01:00', suffix: 'PM', index: 0 },
                    { time: '02:00', suffix: 'PM', index: 1 },
                    { time: '03:00', suffix: 'PM', index: 2 },
                    { time: '04:00', suffix: 'PM', index: 3 },
                    { time: '06:00', suffix: 'PM', index: 4 },
                    { time: '07:00', suffix: 'PM', index: 5 },
                    { time: '08:00', suffix: 'PM', index: 6 },
                    { time: '09:00', suffix: 'PM', index: 7 }
                  ].map((slot, index) => (
                    <button
                      key={index}
                      className={`time-slot ${selectedTimeSlot === index ? 'selected' : ''}`}
                      onClick={() => setSelectedTimeSlot(index)}
                    >
                      {slot.time} <span className="time-suffix">{slot.suffix}</span>
                    </button>
                  ))}
                </div>

                {/* Pay Button */}
                <button className="pay-button" onClick={() => alert(`Booking confirmed!`)}>
                  Pay $14.29
                </button>
              </div>
          </div>
        </div>

        {/* Venue Description */}
        <div style={{ marginTop: '50px', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '15px' }}>Venue Description</h3>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '20px' }}>
            {venue.description}
          </p>
        </div>

        {/* Amenities */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Amenities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {venue.amenities.map((amenity, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img 
                  src={amenity.icon} 
                  alt={amenity.title}
                  style={{ width: '20px', height: '20px' }}
                />
                <span style={{ fontSize: '14px' }}>{amenity.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Location */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Venue Location</h3>
          <div style={{ 
            position: 'relative', 
            borderRadius: '12px', 
            overflow: 'hidden',
            height: '300px',
            background: '#f0f0f0'
          }}>
            <div id="map" style={{ width: '100%', height: '100%' }} />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>📍</span>
              <span style={{ fontSize: '14px' }}>{venue.location.address}</span>
              <span style={{ cursor: 'pointer', fontSize: '18px' }}>👁️</span>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              background: '#f8f9fa',
              padding: '15px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Terms & Conditions</h4>
              <span style={{ fontSize: '20px' }}>+</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Reviews</h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#FFD700', fontSize: '16px' }}>★</span>
              <span style={{ marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}>{venue.rating}</span>
              <span style={{ marginLeft: '5px', fontSize: '14px', color: '#666' }}>({venue.reviewCount} reviews)</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {venue.reviews.map((review, index) => (
              <div key={index} style={{ 
                background: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '12px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#7930d8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{review.name}</div>
                    <div style={{ display: 'flex' }}>
                      {[1,2,3,4,5].map((star) => (
                        <span key={star} style={{ color: star <= review.rating ? '#FFD700' : '#ddd', fontSize: '12px' }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#555', margin: 0 }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
              </div>

        {/* Open Matches Popup */}
        {showOpenMatchesPopup && (
          <div className="popup-overlay">
            <div className="open-matches-popup">
              <button className="close-btn" onClick={handleCloseOpenMatchesPopup}>
                ×
              </button>
              <h2 className="popup-title">Do you Play Singles or Doubles?</h2>
              <div className="game-type-buttons">
                <button 
                  className={`game-type-btn ${selectedGameType === 'singles' ? 'selected' : ''}`}
                  onClick={() => handleGameTypeSelect('singles')}
                >
                  Singles
                </button>
                <button 
                  className={`game-type-btn ${selectedGameType === 'doubles' ? 'selected' : ''}`}
                  onClick={() => handleGameTypeSelect('doubles')}
                >
                  Doubles
                </button>
              </div>
            </div>
          </div>
        )}
        
        
        </div>
        <Footer />
        </>
   );
 };

export default DetailPage;
