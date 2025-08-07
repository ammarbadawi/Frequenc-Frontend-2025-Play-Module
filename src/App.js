import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom"; 
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/footer/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

import "swiper/css";

import RouteConfig from "./routes";
import "./styles/bootstrap.min.css";
import "./styles/global.css";
import "./styles/responsive.css";

function useBodyClass() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.body.classList.remove("non-home-page");
    
    if (location.pathname !== "/") {
      document.body.classList.add("interior-page");
    } else {
      document.body.classList.remove("interior-page");
    }
  }, [location]); 
}

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <BodyClassWrapper />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
};

const BodyClassWrapper = () => {
  useBodyClass();

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
