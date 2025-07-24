import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import "../styles/bookingPolicy.css";

const BookingPolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState('part');
  const [showAddFriendsPopup, setShowAddFriendsPopup] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // Get data passed from previous page
  const gameDataRaw = location.state || {
    gameType: 'Singles',
    venue: 'Venue Name',
    duration: '60 min',
    sport: 'Tennis',
    court: 'Tennis Court 1',
    surface: 'Outdoor | Synthetic Grass',
    date: 'Friday, September 2 at 1:00 Pm - 2:00 Pm',
    partPrice: 7,
    fullPrice: 14,
    subtotal: 7.29
  };

  // Calculate correct part price based on game type
  const calculatePartPrice = (fullPrice, gameType) => {
    if (gameType === 'Doubles') {
      return fullPrice / 4; // Divide by 4 for doubles
    } else {
      return fullPrice / 2; // Divide by 2 for singles
    }
  };

  const gameData = {
    ...gameDataRaw,
    partPrice: calculatePartPrice(gameDataRaw.fullPrice, gameDataRaw.gameType),
    subtotal: calculatePartPrice(gameDataRaw.fullPrice, gameDataRaw.gameType) + 0.29 // Add service fee
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinuePayment = () => {
    setShowPaymentMethod(true);
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentLoading(false);
      navigate('/paymentSuccess', { state: { gameType: gameData.gameType } });
    }, 2000);
  };



  const handleAddPlayers = () => {
    setShowAddFriendsPopup(true);
  };
  

  const handleCloseAddFriendsPopup = () => {
    setShowAddFriendsPopup(false);
  };

  const handleAddFriends = () => {
    // Handle add friends functionality
    console.log('Add friends clicked');
    setShowAddFriendsPopup(false);
  };

  const handleNotNow = () => {
    setShowAddFriendsPopup(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddFriendsPopup && !event.target.closest('.add-friends-popup')) {
        setShowAddFriendsPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAddFriendsPopup]);

  return (
    <div className="booking-policy-container">
      <div className="booking-policy-content">
        <div className="row">
          {/* Left Side - Policy Content */}
          <div className="col-md-6">
            <div className="policy-section">
              <h2 className="policy-title">Booking Cancellation Policy</h2>
              <p className="policy-warning">Valid up until 24 hours after the booking</p>
              
              <h3 className="policy-subtitle">Lorem ipsum</h3>
              <div className="policy-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem lorem adipisci sed 
                  lacinia quis. Nibh dictumst vulputate odio pellentesque sit quis ex, sit ipsum. Sit 
                  rhoncus velit in sed massa orci et sit. Vitae et vitae eget lorem non dui. 
                  Sollicitudin ut mi adipiscing dui.
                </p>
                <p>
                  Convallis in semper laoreet nibh leo. Vivamus molestudde ipsum pulvinar non 
                  rutrum risus dui, risus. Porta massa velit iaculis tincidunt tortor, risus, scelerisque 
                  risus. In at lorem pellentesque orci elemons dictum dignissim in. Aenean pulvinar 
                  diam interdum ullamcorper. Vel urna, tortor, massa metus purus metus. 
                  Maecenas mollis in velit auctor cursus scelerisque eget.
                </p>
              </div>
              
              <button className="back-btn" onClick={handleBack}>
                Back
              </button>
            </div>
          </div>

          {/* Right Side - Booking Summary */}
          <div className="col-md-6" style={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
            <div className="booking-summary-card">
              {showPaymentMethod && (
                <>
                  <div className="payment-method-dropdown">
                    <div className="payment-method-header">
                      <FontAwesomeIcon icon={faCreditCard} className="payment-method-icon" />
                      <span>Select Payment Method</span>
                      <div className="dropdown-arrow">▼</div>
                    </div>
                  </div>
                  <div className="separator-line"></div>
                </>
              )}
              
              <div className="booking-header">
                <span className="venue-name">{gameData.venue}</span>
                <span className="duration">{gameData.duration}</span>
              </div>
              
              <div className="booking-details">
                {gameData.sport} | {gameData.court} | {gameData.surface} | {gameData.gameType}
              </div>
              
              <div className="booking-datetime">
                ({gameData.date})
              </div>

              {showPaymentMethod && <div className="separator-line"></div>}
              
              {!showPaymentMethod ? (
                <>
                  <div className="payment-options">
                    <div className="payment-option">
                      <div className="payment-header">
                        <input 
                          type="checkbox" 
                          id="pay-part" 
                          name="payment" 
                          value="part"
                          checked={selectedPayment === 'part'}
                          onChange={() => setSelectedPayment('part')}
                        />
                        <div className="payment-icon">
                          <div className="card-icon">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <div className="card-number">1</div>
                          </div>
                        </div>
                        <span className="payment-label">Pay your part</span>
                        <span className="payment-amount">${gameData.partPrice}</span>
                      </div>
                      <p className="payment-description">
                        If other players do not pay before September 2, 12:00 noon you will be charged additional ${gameData.partPrice}
                      </p>
                    </div>
                    
                    <div className="payment-option">
                      <div className="payment-header">
                        <input 
                          type="checkbox" 
                          id="pay-everything" 
                          name="payment" 
                          value="everything"
                          checked={selectedPayment === 'everything'}
                          onChange={() => setSelectedPayment('everything')}
                        />
                        <div className="payment-icon">
                          <div className="card-icon">
                            <FontAwesomeIcon icon={faCreditCard} />
                            <div className="card-number">2</div>
                          </div>
                        </div>
                        <span className="payment-label">Pay Everything</span>
                        <span className="payment-amount">${gameData.fullPrice}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="add-players-btn" onClick={handleAddPlayers}>
                    Add Players
                  </button>
                  
                  <div className="subtotal-section">
                    <div className="subtotal-label">Subtotal</div>
                    <div className="subtotal-amount">
                      ${selectedPayment === 'part' ? gameData.subtotal : gameData.fullPrice}
                    </div>
                  </div>
                  <div className="tax-note">Service fees and tax incl.</div>
                  
                  <button className="continue-payment-btn" onClick={handleContinuePayment}>
                    Continue Payment ${selectedPayment === 'part' ? gameData.subtotal : gameData.fullPrice}
                  </button>
                </>
              ) : (
                <div className="payment-method-section">
                  <div className="payment-summary">
                    <div className="service-fee">
                      <span>Service Fee</span>
                      <span>$0.29</span>
                    </div>
                    <div className="subtotal-final">
                      <span>Subtotal</span>
                      <span className="subtotal-amount-final">${gameData.subtotal}</span>
                    </div>
                    <div className="tax-note">Tax incl.</div>
                  </div>
                  
                  <div className="payment-instruction">
                    Proceed to checkout to add your new payment method.
                  </div>
                  
                  <button 
                    className="pay-button" 
                    onClick={handlePayment}
                    disabled={paymentLoading}
                  >
                    {paymentLoading ? 'Processing...' : `Pay $${gameData.subtotal}`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Friends Popup */}
      {showAddFriendsPopup && (
        <div className="popup-overlay">
          <div className="add-friends-popup">
            <button className="close-btn" onClick={handleCloseAddFriendsPopup}>
              ×
            </button>
            <h2 className="add-friends-popup-title">Add your friends</h2>
            <p className="add-friends-popup-text">
              You Opted to divide the payment with your friends but you did not add any.
              Remember, if you don't add them before the match starts
              you will be billed for the total reservation fee.
            </p>
            <div className="add-friends-buttons">
              <button className="add-friends-btn" onClick={handleAddFriends}>
                Add Friends
              </button>
              <button className="not-now-btn" onClick={handleNotNow}>
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPolicy; 