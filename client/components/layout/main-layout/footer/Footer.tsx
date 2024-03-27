import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '@/client/components/layout/main-layout/layoutConfig';

const Footer: React.FC = () => {
  return (
    <>
      <div>©2024 Linkta L.L.C. All rights reserved.</div>

      <ul>
        {footerLinks.map((tab, index) => (
          <li key={index}>
            <Link to={tab.path}>{tab.tabname}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Footer;
