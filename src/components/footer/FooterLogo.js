import React from "react";
import logo from "../../assets/images/logo.svg";

export function FooterLogo() {
  const descriptionStyle = {
    color: 'white',
    opacity: 0.8,
    marginTop: '15px',
    fontSize: '14px'
  };

  return (
    <div className="mb-4">
      <img
        src={logo}
        alt="Frequenc Logo"
        className="h-[39px]"
      />
      <p style={descriptionStyle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
    </div>
  );
}