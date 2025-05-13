import React from "react";
import "../../styles/create.scss";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const handleCopy = () => {
    const dummyLink = "https://yourwebsite.com/match/123"; // Replace with actual match link
    navigator.clipboard.writeText(dummyLink);
    alert("Link copied to clipboard!");
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    const existingOverlay = document.getElementById("global-overlay");
    if (existingOverlay) existingOverlay.remove();
    document.body.style.overflow = "unset";
    navigate("/booking_info_create");
  };

  return (
    <div className="success-message detail-popUp">
      <div className="close-btn global-h1" onClick={handleNavigate}>
        ✖
      </div>
      <div className="icon">
        <svg
          className="check-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#28C76F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2l4 -4" />
        </svg>
      </div>
      <h2 className="title">Congratulation</h2>
      <p className="subtitle">
        Your match has been created and You can share it now!
      </p>
      <button className="copy-button" onClick={handleCopy}>
        Copy Link
      </button>
    </div>
  );
};

export default Success;
