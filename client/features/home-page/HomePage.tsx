import React from 'react';
import HomePageMainHero from '@features/home-page/components/HomePageMainHero';
import HomePageTreeVisualizationPanel from '@features/home-page/components/HomePageTreeVisualizationPanel';

const HomePage = () => {
  return (
    <>
      <HomePageMainHero />
      <HomePageTreeVisualizationPanel />
    </>
  );
};

export default HomePage;
