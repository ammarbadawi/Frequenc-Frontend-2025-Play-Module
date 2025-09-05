// @ts-nocheck
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell as faBellRegular,
  faHeart as faHeartRegular,
  faUser as faUserRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faSearch, faShoppingCart, faBars, faTimes, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.scss";
import { useAuth } from "../contexts/AuthContext";
import notificationsService from "../services/notificationsService";

const NAV_LINKS = [
  { to: "/connect", label: "Connect" },
  { to: "/experience", label: "Experience" },
  { to: "/play", label: "Play" },
];

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const isActive = (path) => location.pathname === path;
  const [unread, setUnread] = useState(0);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await notificationsService.getNotificationCount();
        const count = typeof data === 'number' ? data : (data?.count || 0);
        if (mounted) setUnread(count);
      } catch { if (mounted) setUnread(0); }
    };
    if (user) load();
    return () => { mounted = false; };
  }, [user]);

  React.useEffect(() => {
    if (!user) return;
    const unsubscribe = notificationsService.subscribeStream((evt) => {
      // For simplicity, just refresh count on any event
      (async () => {
        try {
          const data = await notificationsService.getNotificationCount();
          const count = typeof data === 'number' ? data : (data?.count || 0);
          setUnread(count);
        } catch { }
      })();
    });
    return () => { try { unsubscribe && unsubscribe(); } catch { } };
  }, [user]);

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
          {user ? (
            <>
              <Link to="/notifications" className="icon-link" style={{ position: 'relative' }}>
                <FontAwesomeIcon icon={faBellRegular} />
                {unread > 0 && (
                  <span style={{ position: 'absolute', top: -4, right: -6, background: '#e00', color: '#fff', borderRadius: '10px', padding: '0 6px', fontSize: 10 }}>{unread}</span>
                )}
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
              <button
                onClick={logout}
                className="icon-link logout-btn"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                title="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </>
          ) : (
            <Link to="/login" className="icon-link">
              <FontAwesomeIcon icon={faUserRegular} />
            </Link>
          )}
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
              {user ? (
                <>
                  <Link to="/notifications" className="mobile-icon-link" onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={faBellRegular} />
                    <span>Notifications</span>
                  </Link>
                  <Link to="/bookings" className="mobile-icon-link" onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={faUserRegular} />
                    <span>My Bookings</span>
                  </Link>
                  <Link to="/my-games" className="mobile-icon-link" onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={faUserRegular} />
                    <span>My Games</span>
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
                  <button
                    onClick={() => { logout(); toggleMobileMenu(); }}
                    className="mobile-icon-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/login" className="mobile-icon-link" onClick={toggleMobileMenu}>
                  <FontAwesomeIcon icon={faUserRegular} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
