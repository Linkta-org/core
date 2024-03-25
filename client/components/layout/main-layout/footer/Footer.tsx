import React from 'react';
import { Link } from 'react-router-dom';
//TODO: Add Links
const Footer = () => {
  return (
    <>
      <div className="left-content">
        &copy; 2024 - LinkTa, LLC. All rights reserved.
      </div>

      <div className="right-content">
        <Link to="/cookies">Cookies Preferences</Link>
        <Link to="/security">Security</Link>
        <Link to="/legal">Legal</Link>
        <Link to="/privacy">Privacy</Link>
      </div>
    </>
  );
};

export default Footer;
