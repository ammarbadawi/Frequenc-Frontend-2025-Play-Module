// @ts-nocheck
import React, { useState } from "react";
import card from "../../assets/images/card.svg";
import PopUp from "../popUp";
const PComp1 = ({ showComp1, setShowComp1 }) => {
  // for popUp
  const [popUpState, setPopUpState] = useState(0);
  const chnageBtn = true;
  const popUpData = [
    {
      heading: "Add Your Friends",
      content:
        "You Opted to divide the payment with your friends but you did not add any.Remember, if you don’t add them before the match starts you will be billed for the total reservation fee.",
      btn1: "Add Friends",
      btn2: "Not Now",
      btn1Redirect: "/addFriends",
      btn2Redirect: "/payment",
    },
  ];

  const [isSquareSelected, setIsSquareSelected] = useState(false);
  const [isSquareSelected2, setIsSquareSelected2] = useState(false);
  const handleSquare = (i) => {
    if (i === 1) {
      setIsSquareSelected((prev) => !prev);
      setIsSquareSelected2(false);
    } else {
      setIsSquareSelected2((prev) => !prev);
      setIsSquareSelected(false);
    }
  };
  return (
    <>
      <div className="pCom1">
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
          <div className="row">
            <div className="checkbox">
              <div
                className={isSquareSelected ? "square square-fill" : "square"}
                onClick={() => handleSquare(1)}
              >
                {isSquareSelected ? "✔" : ""}
              </div>
              <div className="paym-card-img">
                <img src={card} />
              </div>
              <h5>Pay your part</h5>
            </div>
            <p>$7</p>
          </div>
          <div className="box">
            If other players do not pay before September 2, 12:00 noon you will
            be charged additional $7
          </div>
          <p className="add-players">Add Players</p>
        </div>

        <div className="break"></div>

        <div className="section">
          <div className="row">
            <div className="checkbox">
              <div
                className={isSquareSelected2 ? "square square-fill" : "square"}
                onClick={() => handleSquare(2)}
              >
                {isSquareSelected2 ? "✔" : ""}
              </div>
              <div className="paym-card-img">
                <img src={card} />
              </div>
              <h5>Pay Everything</h5>
            </div>
            <p>$14</p>
          </div>
          <div className="box">You</div>
        </div>

        <div className="break"></div>

        <div className="section">
          <div className="row">
            <h5>
              Subtotal <br />{" "}
              <span style={{ fontSize: "0.75rem" }}>
                Service fees and tax incl.
              </span>{" "}
            </h5>
            <p style={{ color: "#7930D8" }}>$7.29</p>
          </div>

          <button onClick={() => setPopUpState(1)}>
            Continue Payment $7.29
          </button>
        </div>
      </div>

      {/* pop for add friends screen */}
      <PopUp
        popUpState={popUpState}
        setPopUpState={setPopUpState}
        data={popUpData}
        chnageBtn={chnageBtn}
        setShowComp1={setShowComp1}
      />
    </>
  );
};

export default PComp1;
