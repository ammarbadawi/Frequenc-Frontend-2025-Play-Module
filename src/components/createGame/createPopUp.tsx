// @ts-nocheck
import React, { useEffect, useState } from "react";
import "../../styles/create.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const CreatePopUp = ({ setIsPopUpEnabled }) => {
  const [selectedSport, setSelectedSport] = useState("Tennis");
  const [selectedCourt, setSelectedCourt] = useState("Tennis Court 1");
  const [duration, setDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState("Fri, Sep 02");
  const [selectedTime, setSelectedTime] = useState("01:00 PM");
  const [currentMonth, setCurrentMonth] = useState("September, 2024");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    handlePopUp(1);
    
    // Add ESC key event listener
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        handlePopUp(0);
      }
    };
    
    document.addEventListener("keydown", handleEscKey);

    return () => {
      // Cleanup overlay if component unmounts
      const existingOverlay = document.getElementById("global-overlay");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handlePopUp = (state) => {
    if (state === 1) {
      setIsPopUpEnabled(true);
      // Create overlay and add it to body
      document.body.style.overflow = "hidden";
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.id = "global-overlay";
      document.body.appendChild(overlay);
      
      // Add click event to overlay to close popup when clicking outside
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          handlePopUp(0);
        }
      });
      
    } else {
      setIsPopUpEnabled(false);
      // Remove overlay when popup closes
      const existingOverlay = document.getElementById("global-overlay");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
    }
  };

  const handleDurationChange = (change) => {
    const newDuration = duration + change;
    if (newDuration >= 1 && newDuration <= 8) {
      setDuration(newDuration);
    }
  };

  const handlePayment = () => {
    // Show loading state
    const paymentBtn = document.querySelector('.payment-btn');
    if (paymentBtn) {
      paymentBtn.textContent = 'Processing...';
      paymentBtn.disabled = true;
    }

    // Simulate payment processing
    setTimeout(() => {
      // Show success message briefly
      setShowSuccess(true);
      
      setTimeout(() => {
        // Navigate to payment page with booking details
        const bookingDetails = {
          sport: selectedSport,
          court: selectedCourt,
          duration,
          date: selectedDate,
          time: selectedTime,
          amount: 14.29
        };

        // Store booking details in localStorage for payment page
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
        
        // Close the popup
        handlePopUp(0);
        
        // Navigate to payment page
        window.location.href = '/payment';
      }, 1000);
    }, 1500);
  };

  const openMatches = () => {
    // Handle open matches functionality
    console.log("Opening matches...");
  };

  if (showSuccess) {
    return (
      <div className="createPopUp1 detail-popUp booking-interface">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Booking Confirmed!</h2>
          <p className="success-subtitle">Redirecting to payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="createPopUp1 detail-popUp booking-interface">
      <div className="close-btn" onClick={() => handlePopUp(0)}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      
      {/* Header Section */}
      <div className="booking-header">
        <div className="header-left">
          <h1 className="booking-title">Book</h1>
          <p className="booking-subtitle">Create a private match where you can invite your friends.</p>
        </div>
        <button className="open-matches-btn" onClick={openMatches}>
          Open Matches
        </button>
      </div>

      <div className="booking-content">
        {/* Left Panel - Configuration */}
        <div className="config-panel">
          {/* Sport Selection */}
          <div className="config-section">
            <h3 className="section-title">Sports offered by venue</h3>
            <div className="selection-buttons">
              <button 
                className={`selection-btn ${selectedSport === "Golf" ? "selected" : ""}`}
                onClick={() => setSelectedSport("Golf")}
              >
                Golf
              </button>
              <button 
                className={`selection-btn ${selectedSport === "Tennis" ? "selected" : ""}`}
                onClick={() => setSelectedSport("Tennis")}
              >
                Tennis
              </button>
            </div>
          </div>

          {/* Court Selection */}
          <div className="config-section">
            <h3 className="section-title">Courts offered by venue</h3>
            <div className="selection-buttons">
              <button 
                className={`selection-btn ${selectedCourt === "Tennis Court 1" ? "selected" : ""}`}
                onClick={() => setSelectedCourt("Tennis Court 1")}
              >
                Tennis Court 1
              </button>
              <button 
                className={`selection-btn ${selectedCourt === "Tennis Court 2" ? "selected" : ""}`}
                onClick={() => setSelectedCourt("Tennis Court 2")}
              >
                Tennis Court 2
              </button>
              <button 
                className={`selection-btn ${selectedCourt === "Tennis Court 3" ? "selected" : ""}`}
                onClick={() => setSelectedCourt("Tennis Court 3")}
              >
                Tennis Court 3
              </button>
            </div>
          </div>

          {/* Duration Selection */}
          <div className="config-section">
            <h3 className="section-title">Duration</h3>
            <div className="duration-control">
              <button 
                className="duration-btn"
                onClick={() => handleDurationChange(-1)}
                disabled={duration <= 1}
              >
                −
              </button>
              <span className="duration-display">{duration} Hr</span>
              <button 
                className="duration-btn"
                onClick={() => handleDurationChange(1)}
                disabled={duration >= 8}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Date, Time, and Payment */}
        <div className="booking-panel">
          {/* Month/Year Selector */}
          <div className="month-selector">
            <span className="month-year">{currentMonth}</span>
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </div>

          {/* Date Selector */}
          <div className="date-selector">
            <button className="nav-arrow">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="date-buttons">
              {["Wed, Aug 30", "Thu, Sep 01", "Fri, Sep 02", "Sat, Sep 03", "Sun, Sep 04"].map((date) => (
                <button
                  key={date}
                  className={`date-btn ${selectedDate === date ? "selected" : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
            <button className="nav-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Time Slot Selection */}
          <div className="time-section">
            <div className="time-header">
              <span className="slot-count">10 Slots</span>
            </div>
            <div className="time-grid">
              {["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"].map((time) => (
                <button
                  key={time}
                  className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Button */}
          <button className="payment-btn" onClick={handlePayment}>
            Pay $14.29
          </button>
        </div>
      </div>
    </div>
  );
};

export const CreateMatchPopUp = ({ setIsMatchPopUpEnabled, setIsSuccessPopUpEnabled, setIsPopUpEnabled }) => {
  const [selectedSport, setSelectedSport] = useState("Tennis");
  const [selectedCourt, setSelectedCourt] = useState("Tennis Court 1");
  const [duration, setDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState("Fri, Sep 02");
  const [selectedTime, setSelectedTime] = useState("01:00 PM");
  const [currentMonth, setCurrentMonth] = useState("September, 2024");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    handlePopUp(1);
    
    // Add ESC key event listener
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        handlePopUp(0);
      }
    };
    
    document.addEventListener("keydown", handleEscKey);

    return () => {
      // Cleanup overlay if component unmounts
      const existingOverlay = document.getElementById("global-overlay");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handlePopUp = (state) => {
    if (state === 1) {
      setIsMatchPopUpEnabled(true);
      // Create overlay and add it to body
      document.body.style.overflow = "hidden";
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.id = "global-overlay";
      document.body.appendChild(overlay);
      
      // Add click event to overlay to close popup when clicking outside
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          handlePopUp(0);
        }
      });
      
    } else {
      setIsMatchPopUpEnabled(false);
      // Remove overlay when popup closes
      const existingOverlay = document.getElementById("global-overlay");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
    }
  };

  const handleDurationChange = (change) => {
    const newDuration = duration + change;
    if (newDuration >= 1 && newDuration <= 8) {
      setDuration(newDuration);
    }
  };

  const handleCreateMatch = () => {
    // Show loading state
    const createBtn = document.querySelector('.create-match-btn');
    if (createBtn) {
      createBtn.textContent = 'Creating...';
      createBtn.disabled = true;
    }

    // Simulate match creation
    setTimeout(() => {
      // Show success message briefly
      setShowSuccess(true);
      
      setTimeout(() => {
        // Close the popup
        handlePopUp(0);
        
        // Show success popup
        setIsSuccessPopUpEnabled(true);
      }, 1000);
    }, 1500);
  };

  const openMatches = () => {
    // Handle open matches functionality
    console.log("Opening matches...");
  };

  if (showSuccess) {
    return (
      <div className="createPopUp1 detail-popUp booking-interface">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Match Created!</h2>
          <p className="success-subtitle">Redirecting to matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="createPopUp1 detail-popUp booking-interface">
      <div className="close-btn" onClick={() => handlePopUp(0)}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      
      {/* Header Section */}
      <div className="booking-header">
        <div className="header-left">
          <h1 className="booking-title">Create Match</h1>
          <p className="booking-subtitle">Create a match where players can join and compete.</p>
        </div>
        <button className="open-matches-btn" onClick={openMatches}>
          Open Matches
        </button>
      </div>

      <div className="booking-content">
        {/* Left Panel - Configuration */}
        <div className="config-panel">
          {/* Sport Selection */}
          <div className="config-section">
            <h3 className="section-title">Sports offered by venue</h3>
            <div className="selection-buttons">
              <button 
                className={`selection-btn ${selectedSport === "Golf" ? "selected" : ""}`}
                onClick={() => setSelectedSport("Golf")}
              >
                Golf
              </button>
              <button 
                className={`selection-btn ${selectedSport === "Tennis" ? "selected" : ""}`}
                onClick={() => setSelectedSport("Tennis")}
              >
                Tennis
              </button>
            </div>
          </div>

          {/* Court Selection */}
          <div className="config-section">
            <h3 className="section-title">Courts offered by venue</h3>
            <div className="selection-buttons">
              <button 
                className={`selection-btn ${selectedCourt === "Tennis Court 1" ? "selected" : ""}`}
                onClick={() => setSelectedCourt("Tennis Court 1")}
              >
                Tennis Court 1
              </button>
              <button 
                className={`selection-btn ${selectedCourt === "Tennis Court 2" ? "selected" : ""}`}
                onClick={() => setSelectedCourt("Tennis Court 2")}
              >
                Tennis Court 2
              </button>
              <button 
                className={`selection-btn ${selectedCourt === "Tennis Court 3" ? "selected" : ""}`}
                onClick={() => setSelectedCourt("Tennis Court 3")}
              >
                Tennis Court 3
              </button>
            </div>
          </div>

          {/* Duration Selection */}
          <div className="config-section">
            <h3 className="section-title">Duration</h3>
            <div className="duration-control">
              <button 
                className="duration-btn"
                onClick={() => handleDurationChange(-1)}
                disabled={duration <= 1}
              >
                −
              </button>
              <span className="duration-display">{duration} Hr</span>
              <button 
                className="duration-btn"
                onClick={() => handleDurationChange(1)}
                disabled={duration >= 8}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Date, Time, and Create Button */}
        <div className="booking-panel">
          {/* Month/Year Selector */}
          <div className="month-selector">
            <span className="month-year">{currentMonth}</span>
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
          </div>

          {/* Date Selector */}
          <div className="date-selector">
            <button className="nav-arrow">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="date-buttons">
              {["Wed, Aug 30", "Thu, Sep 01", "Fri, Sep 02", "Sat, Sep 03", "Sun, Sep 04"].map((date) => (
                <button
                  key={date}
                  className={`date-btn ${selectedDate === date ? "selected" : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
            <button className="nav-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {/* Time Slot Selection */}
          <div className="time-section">
            <div className="time-header">
              <span className="slot-count">10 Slots</span>
            </div>
            <div className="time-grid">
              {["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"].map((time) => (
                <button
                  key={time}
                  className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Create Match Button */}
          <button className="payment-btn create-match-btn" onClick={handleCreateMatch}>
            Create Match
          </button>
        </div>
      </div>
    </div>
  );
};
