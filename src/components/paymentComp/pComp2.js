import React from "react";
import card from "../../assets/images/card.svg";
import friend1 from "../../assets/images/friend1.svg";
import friend2 from "../../assets/images/friend2.svg";
import friend3 from "../../assets/images/friend3.svg";
import { useNavigate } from "react-router-dom";

const PComp2 = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="pCom1">
        <div className="section">
          <div class="custom-select">
            <img src={card} alt="card icon" class="select-icon" />
            <select>
              <option value="" selected disabled>
                Select Payment Method
              </option>
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
            </select>
            <span class="arrow">&#9662;</span>
          </div>
        </div>

        {/* section - 2 */}
        <div className="section">
          <div className="row">
            <h5>Venue Name</h5>
            <p>60min</p>
          </div>
          <p>Tennis | Tennis Court 1 | Outdoor | Synthetic Grass | Singles </p>
          <p>(Friday, September 2 at 1:00 Pm - 2:00 Pm)</p>
        </div>

        <div className="break"></div>

        <div className="section">
          <div class="friends-list">
            <p class="title">
              Friends <br /> List
            </p>
            <div class="avatars">
              <img src={friend1} alt="Friend 1" class="avatar" />
              <img src={friend2} alt="Friend 2" class="avatar" />
              <img src={friend3} alt="Friend 3" class="avatar" />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="row">
            <h6>Service Fee</h6>
            <h6>$0.29</h6>
          </div>
          <div className="row">
            <h5>
              Subtotal <br />{" "}
              <span style={{ fontSize: "0.75rem" }}>Tax incl.</span>{" "}
            </h5>
            <p style={{ color: "#7930D8" }}>$7.29</p>
          </div>

          <button onClick={() => navigate("/paymentSuccess")}>
            Continue Payment $7.29
          </button>
        </div>
      </div>
    </>
  );
};

export default PComp2;
