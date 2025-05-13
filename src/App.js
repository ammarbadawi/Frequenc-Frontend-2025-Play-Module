import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom"; // Import the necessary hooks
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
    // If it's not the home page, add a class to body
    if (location.pathname !== "/") {
      document.body.classList.add("non-home-page");
    } else {
      document.body.classList.remove("non-home-page");
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

  return (
    <div id="main">
      <Header />
      <RouteConfig />
      <Footer />
    </div>
  );
};

export default App;
