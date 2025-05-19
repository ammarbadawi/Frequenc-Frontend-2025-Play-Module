import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom"; // Import the necessary hooks
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/footer/Footer";

// Import Swiper styles
import "swiper/css";

import RouteConfig from "./routes";
import "./styles/bootstrap.min.css";
import "./styles/global.css";
import "./styles/responsive.css";
// Custom hook to handle adding/removing class to body

// const { pathname } = useLocation();

function useBodyClass() {
  const location = useLocation(); // Get current route

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when route changes
  }, [location]);

  useEffect(() => {
    // Remove the non-home-page class completely to prevent header style overrides
    document.body.classList.remove("non-home-page");
    
    // We'll use a different class that doesn't affect the header
    if (location.pathname !== "/") {
      document.body.classList.add("interior-page");
    } else {
      document.body.classList.remove("interior-page");
    }
  }, [location]); // Runs when location changes
}

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      {/* Ensure the entire app is wrapped with BrowserRouter */}
      <BodyClassWrapper /> {/* Move the hook usage to a wrapper */}
    </BrowserRouter>
  );
};

// Wrapper component to use the custom hook
const BodyClassWrapper = () => {
  useBodyClass(); // Custom hook to manage body class

  // Add a style to ensure proper layout with footer visible
  const mainStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  return (
    <div id="main" style={mainStyle}>
      <Header />
      <div style={{ flex: 1 }}>
        <RouteConfig />
      </div>
      <Footer />
    </div>
  );
};

export default App;
