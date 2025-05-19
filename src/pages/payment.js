import React, { useState } from "react";
import "../styles/payment.scss";
import PComp1 from "../components/paymentComp/pComp1";
import PComp2 from "../components/paymentComp/pComp2";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [showComp1, setShowComp1] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="payment">
      <div className="left">
        <h1 className="global-h1">Booking Cancellation Policy</h1>
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
        </p>

        <button onClick={handleBack}>Back</button>
      </div>
      <div className="right">
        {showComp1 ? (
          <PComp1 showComp1={showComp1} setShowComp1={setShowComp1} />
        ) : (
          <PComp2 />
        )}
      </div>
    </div>
  );
};

export default Payment;
