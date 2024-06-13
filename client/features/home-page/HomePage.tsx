import React from 'react';
import HomePageMainHero from './components/HomePageMainHero';
import HomePageTreeVisualizationPanel from './components/HomePageTreeVisualizationPanel';
import useDocumentTitle from '@/client/hooks/useDocumentTitle';

const HomePage = () => {
  useDocumentTitle();
  return (
    <>
      <HomePageMainHero />
      <HomePageTreeVisualizationPanel />
    </>
  );
};

export default HomePage;
