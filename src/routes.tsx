// @ts-nocheck
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
import Login from "./pages/login";

// Temporary placeholder component for missing pages
const PlaceholderPage = ({ pageName }: { pageName: string }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>{pageName} Page</h1>
    <p>This page is under development.</p>
    <button onClick={() => window.history.back()}>Go Back</button>
  </div>
);

const RouteConfig = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace2" element={<Marketplace2 />} />
      <Route path="/details/:id" element={<DetailPage />} />
      <Route path="/booking-policy" element={<BookingPolicy />} />
      
      {/* Missing routes - replace PlaceholderPage with actual components when available */}
      <Route path="/connect" element={<PlaceholderPage pageName="Connect" />} />
      <Route path="/experience" element={<PlaceholderPage pageName="Experience" />} />
      <Route path="/play" element={<PlaceholderPage pageName="Play" />} />
      <Route path="/login" element={<Login />} />

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
      
      {/* 404 Route - should be last */}
      <Route path="*" element={
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <button onClick={() => window.location.href = '/'}>Go Home</button>
        </div>
      } />
    </Routes>
  );
};

export default RouteConfig;