import React from 'react';

export const FooterSection = ({ title, links }) => {
  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '24px'
  };

  const titleStyle = {
    color: 'white',
    fontSize: '20px',
    fontWeight: '600'
  };

  const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px'
  };

  const linkStyle = {
    color: 'white',
    opacity: '0.8',
    fontSize: '16px',
    transition: 'opacity 0.3s'
  };

  const handleLinkHover = (e) => {
    e.target.style.opacity = '1';
  };

  const handleLinkLeave = (e) => {
    e.target.style.opacity = '0.8';
  };

  return (
    <div style={sectionStyle}>
      <h2 style={titleStyle}>{title}</h2>
      <nav style={navStyle}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            style={linkStyle}
            onMouseEnter={handleLinkHover}
            onMouseLeave={handleLinkLeave}
          >
            {link.text}
          </a>
        ))}
      </nav>
    </div>
  );
};