import React, { useEffect, useState } from "react";
import "../styles/popUp.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PopUp = ({
  popUpState,
  setPopUpState,
  data,
  chnageBtn,
  setShowComp1,
}) => {
  // check if Book button is clicked or not ------------------>
  useEffect(() => {
    if (popUpState === 1) {
      setIsPopUpEnabled(true);
      handlePopUp(1);
    }
  }, [popUpState]);

  useEffect(() => {
    if (isPopUpEnabled) {
      // Add ESC key event listener
      const handleEscKey = (e) => {
        if (e.key === "Escape") {
          handlePopUp(0);
        }
      };
      
      document.addEventListener("keydown", handleEscKey);
      
      // Add click event to overlay to close popup when clicking outside
      const overlay = document.getElementById("global-overlay");
      if (overlay) {
        const handleOutsideClick = (e) => {
          if (e.target === overlay) {
            handlePopUp(0);
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
    }
  }, [isPopUpEnabled]);

  const [isPopUpEnabled, setIsPopUpEnabled] = useState(false);
  const navigate = useNavigate();
  const chnageRoute = (i) => {
    const existingOverlay = document.getElementById("global-overlay");
    if (existingOverlay) existingOverlay.remove();
    document.body.style.overflow = "unset";

    if (i === 1) navigate(data[0].btn1Redirect);
    else {
      navigate(data[0].btn2Redirect);
      if (setShowComp1 != null) setShowComp1(false);
    }
    setPopUpState(0);
    setIsPopUpEnabled(false);
  };

  const handlePopUp = (state) => {
    if (state === 1) {
      setIsPopUpEnabled(true);
      // Create overlay and add it to body
      document.body.style.overflow = "hidden";
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.id = "global-overlay";
      document.body.appendChild(overlay);
    } else {
      setIsPopUpEnabled(false);
      setPopUpState(0);
      // Remove overlay when popup closes
      const existingOverlay = document.getElementById("global-overlay");
      if (existingOverlay) existingOverlay.remove();
      document.body.style.overflow = "unset";
    }

    return () => {
      // Cleanup overlay if component unmounts
      const existingOverlay = document.getElementById("global-overlay");
      if (existingOverlay) existingOverlay.remove();
    };
  };

  return (
    <div
      className="detail-popUp"
      id="detail-popUp"
      style={!isPopUpEnabled ? { display: "none" } : {}}
    >
      <div className="close-btn" onClick={() => handlePopUp(0)}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <h1 className="global-h1">{data[0].heading}</h1>
      <p className="global-p">{data[0].content}</p>
      <div className="detail-popUp-container">
        <button
          onClick={() => chnageRoute(1)}
          className={chnageBtn != undefined ? "change_btn_color" : ""}
        >
          {data[0].btn1}
        </button>
        <button onClick={() => chnageRoute(2)}>{data[0].btn2}</button>
      </div>
    </div>
  );
};

export default PopUp;
