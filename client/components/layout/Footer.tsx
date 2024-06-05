import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '@/client/components/layout/layoutConfig';

const Footer: React.FC = () => {
  return (
    <>
      <div>©2024 Linkta L.L.C. All rights reserved.</div>

      <ul>
        {footerLinks.map((tab) => (
          <li key={`${tab.path}-${tab.tabname}`}>
            <Link to={tab.path}>{tab.tabname}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Footer;
