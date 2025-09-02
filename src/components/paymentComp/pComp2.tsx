// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import friend1 from "../../assets/images/friend1.svg";
import friend2 from "../../assets/images/friend2.svg";
import friend3 from "../../assets/images/friend3.svg";
import { useNavigate } from "react-router-dom";

const PComp2 = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Payment Method");
  const dropdownRef = useRef(null);

  const paymentOptions = [
    "Select Payment Method",
    "Credit Card",
    "PayPal",
    "Bank Transfer"
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="pCom1">
        <div className="section">
          <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faCreditCard} className="select-icon" />
              <span className="selected-text">{selectedOption}</span>
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className={`arrow ${isOpen ? 'open' : ''}`} 
              />
            </div>
            {isOpen && (
              <div className="dropdown-options">
                {paymentOptions.map((option, index) => (
                  <div 
                    key={index} 
                    className={`dropdown-option ${option === selectedOption ? 'selected' : ''}`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
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
