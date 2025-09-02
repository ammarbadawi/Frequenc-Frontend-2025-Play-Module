// @ts-nocheck
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/modify.css";
const Gameplacebox = () => {
  const navigate = useNavigate();

  return (
    <div class="col-md-6">
      <div class="boxshop">
        <div class="imagebox">
          <img src="images/img2.png" />
          <i class="fa fa-heart-o"></i>
        </div>
        <div class="nameshop" onClick={() => navigate("/details")}>
          <h2 className="modify_title">Venue Name 1</h2>
          <div class="ratings">
            4.4 <i class="fa fa-star active"></i>
          </div>
        </div>
        <div class="locations">
          H88W+225, Noida Golf Course, Sector 43, Noida, Uttar Pradesh 201303
        </div>
        <div class="searchbuttons">
          <span class="btnicon">Golf</span>
          <span class="btnicon">cricket</span>
          <span class="btnicon">Hockey</span>
          <span>+2</span>
        </div>
      </div>
    </div>
  );
};

export default Gameplacebox;
