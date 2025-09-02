// @ts-nocheck
import React, { useState } from "react";
import "../styles/payment.scss";
import unlock from "../assets/images/unlock.svg";
import done from "../assets/images/done.svg";
import chatIcon from "../assets/images/chat_bubble.svg";
import {
  ImageContainer,
  AddCard,
  Left2,
  PopUpBooking,
} from "../components/bookingInfoComponents";

const BookingInfo = ({ createMatchRoute }) => {
  const [isPopUpEnabled, setIsPopUpEnabled] = useState(false);
  const [isPendingEnabled, setIsPendingEnabled] = useState(false);

  const hanldeClick = (state) => {
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
    <>
      <div className="payment">
        <div className="left">
          <Left2
            isPendingEnabled={isPendingEnabled}
            setIsPendingEnabled={setIsPendingEnabled}
            createMatchRoute={createMatchRoute}
          />
          {/* <h1 className="global-h1">Booking Cancellation Policy</h1>
        <p className="global-p">Valid up until 24 hours after the booking</p>
        <h2 className="global-h2">Lorem ipsum</h2>
        <p className="global-p para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem lorem
          aliquam sed lacinia quis. Nibh dictumst vulputate odio pellentesque
          sit quis ac, sit ipsum. Sit rhoncus velit in sed massa arcu sit eu.
          Vitae et vitae eget lorem non dui. Sollicitudin ut mi adipiscing duis.
          Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum pulvinar
          non rutrum risus dui, risus. Purus massa velit iaculis tincidunt
          tortor, risus, scelerisque risus. In at lorem pellentesque orci aenean
          dictum dignissim in. Aenean pulvinar diam interdum ullamcorper. Vel
          urna, tortor, massa metus purus metus. Maecenas mollis in velit auctor
          cursus scelerisque eget.{" "}
        </p> */}

          <button>Back</button>
        </div>
        <div className="right">
          <div className="pCom1">
            <div className="section">
              <div className="row">
                <h5>Venue Name</h5>
                <p>60min | $6.50</p>
              </div>
              <p>Tennis | Doubles | Advance | Grass</p>
              <p>(Friday, September 2 at 1:00 Pm - 2:00 Pm)</p>
            </div>

            <div className="break"></div>

            <div className="section section_enhancer">
              <div className="row">
                <div style={{ display: "flex", gap: "10px" }}>
                  <img src={unlock} />{" "}
                  <span>
                    {createMatchRoute ? "Public Match" : "Open Match"}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    src={done}
                    style={createMatchRoute ? { display: "none" } : {}}
                  />{" "}
                  <span style={createMatchRoute ? { display: "none" } : {}}>
                    Court Booked
                  </span>
                </div>
              </div>
            </div>

            <div className="break"></div>

            <div className="section">
              <div className="row">
                <h5>Players</h5>
              </div>
              <div className="row">
                <div className="row_enhancer">
                  <ImageContainer />
                  <AddCard />
                </div>
                <div className="pipe"></div>
                <div className="row_enhancer">
                  <AddCard />
                  <ImageContainer />
                </div>
              </div>

              <div className="row">
                <h5>A</h5>
                <h5>B</h5>
              </div>
            </div>

            <div className="break"></div>

            <div className="section">
              <div
                className="row"
                style={createMatchRoute ? { justifyContent: "center" } : {}}
              >
                <div className="chat-btn">
                  <img src={chatIcon} />
                  <h5>Chat</h5>
                </div>
                <div className="registration">
                  <h5 style={createMatchRoute ? { display: "none" } : {}}>
                    End Registration
                  </h5>
                  <p style={createMatchRoute ? { display: "none" } : {}}>
                    (Thurday, September 3 at 5:00 Pm)
                  </p>
                </div>
              </div>
            </div>

            <div className="break"></div>

            <div className="section">
              {!isPendingEnabled ? (
                <button onClick={() => hanldeClick(1)}>
                  {createMatchRoute ? "Add Friends" : "Continue"}
                </button>
              ) : (
                <button className="cancel-booking">Cancel Booking</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPopUpEnabled ? (
        <PopUpBooking
          hanldeClick={hanldeClick}
          setIsPendingEnabled={setIsPendingEnabled}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default BookingInfo;
