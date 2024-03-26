import React from 'react';
import { Link } from 'react-router-dom';
//TODO: Add Links
const Footer = () => {
  return (
    <>
      <div>©2024 Linkta L.L.C. All rights reserved.</div>

      <div>
        <ul>
          <li>
            <Link to="/cookies">Cookie Preferences</Link>
          </li>
          <li>
            <Link to="/security">Security</Link>
          </li>
          <li>
            <Link to="/legal">Legal</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
