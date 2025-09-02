// @ts-nocheck
import img from "../assets/images/square_frnd1.svg";
import rightCornor from "../assets/images/rightCornor.svg";
import "../styles/payment.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

// Custom Component
export const ImageContainer = () => {
  return (
    <div className="booking_info_img_container">
      <div>
        <img src={img} />
        <h5>Aadil</h5>
        <p>Advance</p>
      </div>
    </div>
  );
};

export const AddCard = () => {
  return <div className="booking_info_add_card">+</div>;
};

export const Left2 = ({ isPendingEnabled, setIsPendingEnabled }) => {
  return (
    <div class="info-container">
      <h2>Information</h2>

      <div class="info-header">
        <div class="host-profile">
          <img src={img} alt="Host" class="profile-pic" />
          <div class="host-details">
            <p class="host-name">Warish Ahmad</p>
            <p class="host-role">
              Host <span class="rating">(4.67)</span>
            </p>
          </div>
        </div>

        <div class="venue-card">
          <div class="venue-title">Venue Name</div>
          <div class="venue-address">110025, New Delhi, India</div>
          <div class="venue-icon">
            <img src={rightCornor} />
          </div>
        </div>
      </div>

      <div class="info-section">
        <p class="label">Court Name</p>
        <p>Tennis Court 1</p>
      </div>

      <div class="info-section">
        <p class="label">Level &amp; Gender</p>
        <p>Advance &amp; All Gender</p>
      </div>

      <div class="info-section">
        <p class="label">Organiser's Notes</p>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>

      <div
        className="pending-section"
        style={!isPendingEnabled ? { display: "none" } : {}}
      >
        <h2>Pending Request</h2>
        <p>
          Wait for other player's approval. Once accepted, you must join at
          least 1 hour before the match.
        </p>
      </div>
    </div>
  );
};

// pop Up
export const PopUpBooking = ({ hanldeClick, setIsPendingEnabled }) => {
  
  useEffect(() => {
    // Add ESC key event listener
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        hanldeClick(0);
      }
    };
    
    document.addEventListener("keydown", handleEscKey);
    
    // Add click event to overlay to close popup when clicking outside
    const overlay = document.getElementById("global-overlay");
    if (overlay) {
      const handleOutsideClick = (e) => {
        if (e.target === overlay) {
          hanldeClick(0);
        }
      };
      
      overlay.addEventListener("click", handleOutsideClick);
      
      // Cleanup
      return () => {
        overlay.removeEventListener("click", handleOutsideClick);
        document.removeEventListener("keydown", handleEscKey);
      };
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  
  return (
    <div className="popUpBooking">
      <div className="close-btn" onClick={() => hanldeClick(0)}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <h1>Request a Spot - Conditions</h1>
      <p>
        You Opted to divide the payment with your friends but you did not add
        any. Remember, if you don't add them before the match starts you will be
        billed for the total reservation fee.
      </p>
      <p>
        You Opted to divide the payment with your friends but you did not add
        any. Remember, if you don't add them before the match starts you will be
        billed for the total reservation fee.
      </p>
      <p>
        You Opted to divide the payment with your friends but you did not add
        any. Remember, if you don't add them before the match starts you will be
        billed for the total reservation fee.
      </p>

      <button
        onClick={() => {
          setIsPendingEnabled(true);
          hanldeClick(0);
        }}
      >
        Request a Spot
      </button>
    </div>
  );
};
