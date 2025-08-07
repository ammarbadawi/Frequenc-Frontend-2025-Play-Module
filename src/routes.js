import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home";
import Marketplace from "./pages/Marketpace";
import Marketplace2 from "./pages/Marketpace2";
import DetailPage from "./pages/detailpage";
import Payment from "./pages/payment";
import PaymentSuccess from "./pages/paymentSuccess";
import AddFriends from "./pages/addFriends";
import BookingInfo from "./pages/bookingInfo";
import BookingPolicy from "./pages/bookingPolicy";
import Profile from "./pages/profile";
import Cart from "./pages/cart";
import Favorites from "./pages/favorites";
import Notifications from "./pages/notifications";

const RouteConfig = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace2" element={<Marketplace2 />} />
      <Route path="/details/:id" element={<DetailPage />} />
      <Route path="/booking-policy" element={<BookingPolicy />} />
      
      {/* Protected Routes */}
      <Route path="/payment" element={
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      } />
      <Route path="/paymentSuccess" element={
        <ProtectedRoute>
          <PaymentSuccess />
        </ProtectedRoute>
      } />
      <Route path="/addFriends" element={
        <ProtectedRoute>
          <AddFriends />
        </ProtectedRoute>
      } />
      <Route path="/booking_info" element={
        <ProtectedRoute>
          <BookingInfo createMatchRoute={false} />
        </ProtectedRoute>
      } />
      <Route path="/booking_info_create" element={
        <ProtectedRoute>
          <BookingInfo createMatchRoute={true} />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default RouteConfig;
