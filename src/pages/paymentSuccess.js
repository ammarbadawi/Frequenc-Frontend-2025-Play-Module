import React from "react";
import "../styles/paymentSuccess.scss";
import { useNavigate } from "react-router-dom";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/addFriends");
  };

  return (
    <div className="paymentSuccess">
      <div class="payment-confirmation">
        <div class="status">
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="Success Icon"
            class="check-icon"
          />
          <h2 className="global-h1">Payment Done Successfully</h2>
        </div>

        <div class="share-box">
          <p className="global-h2">Do you want to share this game?</p>
          <div class="buttons">
            <button class="yes" onClick={handleClick}>
              Yes
            </button>
            <button class="no">No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
