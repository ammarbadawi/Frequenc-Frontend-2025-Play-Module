import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell as faBellRegular,
  faHeart as faHeartRegular,
  faUser as faUserRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faSearch, faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.scss";

const NAV_LINKS = [
  { to: "/create", label: "Create" },
  { to: "/connect", label: "Connect" },
  { to: "/experience", label: "Experience" },
  { to: "/play", label: "Play" },
];

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="main-header new-navbar">
      <div className="header-container new-navbar-container">
        <div className="logo-and-divider">
          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="frequenC logo" className="logo" />
          </Link>
          <span className="navbar-divider">|</span>
        </div>
        <nav className="main-nav new-navbar-nav">
          <ul className="nav-links new-navbar-links">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className={isActive(link.to) ? "active" : ""}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar-search-group">
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search"
            aria-label="Search"
          />
          <FontAwesomeIcon icon={faSearch} className="navbar-search-icon" />
        </div>
        <div className="navbar-icons-group">
          <Link to="/notifications" className="icon-link">
            <FontAwesomeIcon icon={faBellRegular} />
          </Link>
          <Link to="/favorites" className="icon-link">
            <FontAwesomeIcon icon={faHeartRegular} />
          </Link>
          <Link to="/cart" className="icon-link cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <Link to="/profile" className="icon-link">
            <FontAwesomeIcon icon={faUserRegular} />
          </Link>
        </div>
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu} 
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            <ul className="mobile-nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.to} className={isActive(link.to) ? "active" : ""}>
                  <Link to={link.to} onClick={toggleMobileMenu}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mobile-search">
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="mobile-icons">
              <Link to="/notifications" className="mobile-icon-link" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={faBellRegular} />
                <span>Notifications</span>
              </Link>
              <Link to="/favorites" className="mobile-icon-link" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={faHeartRegular} />
                <span>Favorites</span>
              </Link>
              <Link to="/cart" className="mobile-icon-link" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>Cart</span>
              </Link>
              <Link to="/profile" className="mobile-icon-link" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={faUserRegular} />
                <span>Profile</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
