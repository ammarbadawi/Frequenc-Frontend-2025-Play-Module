import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBell, 
  faShoppingCart, 
  faHeart, 
  faUser, 
  faBars, 
  faTimes 
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.scss";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle window resize to close mobile menu when screen gets larger
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      // Close mobile menu if screen gets larger than breakpoint
      if (window.innerWidth > 855 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Check if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section">
          <Link to="/">
            <img src={logo} alt="frequenC logo" className="logo" />
          </Link>
        </div>
        
        {/* Mobile menu toggle - only show when menu is closed */}
        {!mobileMenuOpen && (
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        )}
        
        {/* Desktop navigation */}
        <nav className="main-nav desktop-nav">
          <ul className="nav-links">
            <li className={isActive("/create") ? "active" : ""}>
              <Link to="/create">Create</Link>
            </li>
            <li className={isActive("/connect") ? "active" : ""}>
              <Link to="/connect">Connect</Link>
            </li>
            <li className={isActive("/experience") ? "active" : ""}>
              <Link to="/experience">Experience</Link>
            </li>
            <li className={isActive("/play") ? "active" : ""}>
              <Link to="/play">Play</Link>
            </li>
          </ul>
        </nav>
        
        {/* Desktop header actions */}
        <div className="header-actions desktop-actions">
          <div className="icon-group">
            <Link to="/notifications" className="icon-link">
              <FontAwesomeIcon icon={faBell} />
            </Link>
            <Link to="/cart" className="icon-link cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-count">2</span>
            </Link>
            <Link to="/favorites" className="icon-link">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
          </div>
          
          <Link to="/wallet" className="connect-wallet-btn">
            Connect Wallet
          </Link>
          
          <Link to="/profile" className="profile-link">
            <FontAwesomeIcon icon={faUser} className="user-icon" />
          </Link>
        </div>
        
        {/* Mobile menu overlay */}
        <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
          {/* Close button at top right */}
          <div className="mobile-close-btn" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          
          <nav className="mobile-nav">
            <ul className="mobile-nav-links">
              <li className={isActive("/create") ? "active" : ""}>
                <Link to="/create" onClick={closeMobileMenu}>Create</Link>
              </li>
              <li className={isActive("/connect") ? "active" : ""}>
                <Link to="/connect" onClick={closeMobileMenu}>Connect</Link>
              </li>
              <li className={isActive("/experience") ? "active" : ""}>
                <Link to="/experience" onClick={closeMobileMenu}>Experience</Link>
              </li>
              <li className={isActive("/play") ? "active" : ""}>
                <Link to="/play" onClick={closeMobileMenu}>Play</Link>
              </li>
            </ul>
            
            <div className="mobile-actions">
              <div className="mobile-icons">
                <Link to="/notifications" className="mobile-icon-link" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faBell} />
                  <span>Notifications</span>
                </Link>
                <Link to="/cart" className="mobile-icon-link" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>Cart</span>
                </Link>
                <Link to="/favorites" className="mobile-icon-link" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Favorites</span>
                </Link>
                <Link to="/profile" className="mobile-icon-link" onClick={closeMobileMenu}>
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </Link>
              </div>
              
              <Link to="/wallet" className="mobile-wallet-btn" onClick={closeMobileMenu}>
                Connect Wallet
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
