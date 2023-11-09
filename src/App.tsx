import React from 'react';
import './App.css';
import DetailsPanel from './components/DetailsPanel';
import DataLoader from './data/DataLoader';

function  App({dataLoader}: {dataLoader: DataLoader}) {
  const detailsViewData = dataLoader.getDetailsViewData();
  return (
    <DetailsPanel
      details={detailsViewData}
    />
  );
}

export default App;
