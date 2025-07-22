import React from "react";
import "../styles/paymentSuccess.css";
import { useNavigate, useLocation } from "react-router-dom";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleShareGame = (share) => {
    if (share) {
      // Handle sharing logic
      console.log('Sharing game');
      navigate('/');
    } else {
      // Get game data from location state (if available) or use defaults
      const gameData = location.state || { gameType: 'Singles' };
      // Navigate to add friends page with game type
      navigate('/addFriends', { state: { gameType: gameData.gameType } });
    }
  };

  return (
    <div className="payment-success-page">
      <div className="payment-success-container">
        <div className="success-icon">
          <TaskAltIcon style={{ fontSize: '80px', color: '#20BF55' }} />
        </div>
        <h2 className="success-title">Payment Done Successfully</h2>
        <div className="share-section">
          <p className="share-question">Do you want to share this game?</p>
          <div className="share-buttons">
            <button className="share-yes-btn" onClick={() => handleShareGame(true)}>
              Yes
            </button>
            <button className="share-no-btn" onClick={() => handleShareGame(false)}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
