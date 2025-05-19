import React from 'react';
import { SocialIcons } from './SocialIcons';
import { FooterSection } from './FooterSection';

export const Footer = () => {
  const planEventsLinks = [
    { text: 'Sell Tickets Online', href: '#' },
    { text: 'Event Planning', href: '#' },
    { text: 'Sell Concert Tickets Online', href: '#' },
    { text: 'Event Payment System', href: '#' },
    { text: 'Community Engagement', href: '#' },
    { text: 'Post your event online', href: '#' },
    { text: 'Solutions for Professional Services', href: '#' },
  ];

  const companyLinks = [
    { text: 'About Us', href: '#' },
    { text: 'Help', href: '#' },
    { text: 'FAQ', href: '#' },
    { text: 'Contact US', href: '#' },
    { text: 'Blog', href: '#' },
  ];

  const usefulLinks = [
    { text: 'Create Event', href: '#' },
    { text: 'Sell Tickets Online', href: '#' },
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms & Conditions', href: '#' },
  ];

  const footerStyle = {
    width: '100%',
    backgroundColor: '#03103B',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '29px 27px'
  };

  const containerStyle = {
    maxWidth: '1110px',
    width: '100%'
  };

  const sectionContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    justifyContent: 'space-between'
  };

  const logoSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '24px',
    maxWidth: '300px'
  };

  const logoContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px'
  };

  const logoImgContainerStyle = {
    width: '127px',
    height: '39px',
    position: 'relative'
  };

  const descriptionStyle = {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'normal'
  };

  const dividerStyle = {
    width: '100%',
    height: '1px',
    backgroundColor: 'white',
    opacity: '0.6',
    margin: '40px 0'
  };

  const copyrightStyle = {
    color: 'white',
    opacity: '0.8',
    fontSize: '16px',
    textAlign: 'center'
  };

  return (
    <footer style={footerStyle} className="footer">
      <div style={containerStyle}>
        <div style={sectionContainerStyle}>
          <div style={logoSectionStyle}>
            <div style={logoContainerStyle}>
              <div style={logoImgContainerStyle}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/320267c4859a94dfb3c51a7711129a8e2fc3479a"
                  alt=""
                  style={{width: '47px', height: '39px', position: 'absolute', left: 0, top: 0}}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/602f7fad6a2783427d1dc445a2b1a5f3655080be"
                  alt=""
                  style={{width: '76px', height: '28px', position: 'absolute', left: '51px', top: '5px'}}
                />
              </div>
              <p style={descriptionStyle}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <SocialIcons />
          </div>

          <FooterSection title="Plan Events" links={planEventsLinks} />
          <FooterSection title="Our Company" links={companyLinks} />
          <FooterSection title="Useful Links" links={usefulLinks} />
        </div>

        <div style={dividerStyle} />
        
        <div style={copyrightStyle}>
          Copyright © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};
