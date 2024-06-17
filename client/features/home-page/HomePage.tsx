import React from 'react';
import HomePageMainHero from '@features/home-page/components/HomePageMainHero';
import HomePageTreeVisualizationPanel from '@features/home-page/components/HomePageTreeVisualizationPanel';
import useDocumentTitle from '@hooks/useDocumentTitle';

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
