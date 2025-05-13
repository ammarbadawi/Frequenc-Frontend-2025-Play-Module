import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Marketplace from "./pages/Marketpace";
import Marketplace2 from "./pages/Marketpace2";
import DetailPage from "./pages/detailpage";
import Payment from "./pages/payment";
import PaymentSuccess from "./pages/paymentSuccess";
import AddFriends from "./pages/addFriends";
import BookingInfo from "./pages/bookingInfo";
const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace2" element={<Marketplace2 />} />
      <Route path="/details" element={<DetailPage />} />
      <Route path="/payment" element={<Payment />} />
      <Route
        path="/booking_info"
        element={<BookingInfo createMatchRoute={false} />}
      />
      <Route
        path="/booking_info_create"
        element={<BookingInfo createMatchRoute={true} />}
      />
      <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      <Route path="/addFriends" element={<AddFriends />} />
    </Routes>
  );
};

export default RouteConfig;
