// @ts-nocheck
import React from "react";
import "../styles/paymentSuccess.css";
import { useNavigate, useLocation } from "react-router-dom";
import gamesService from "../services/gamesService";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleShareGame = async (share) => {
    if (share) {
      try {
        const state = location.state || {};
        const bookingId = state?.bookingId;
        if (bookingId) {
          await gamesService.createGameFromBooking(bookingId, { isPublic: true });
          navigate('/play');
        } else {
          navigate('/play');
        }
      } catch (e) {
        alert(e.message || 'Failed to create game');
      }
    } else {
      const gameData = location.state || { gameType: 'Singles' };
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
