import React from 'react';
import OverviewCards from '../components/OverviewCards.jsx';
import OffersGrid from '../components/OffersGrid.jsx';
import ToastMessage from '../components/ToastMessage.jsx';

const UserDashboard = () => {
  return (
    <>
      {/* Toast Message */}
      <ToastMessage />
      
      {/* Overview Cards */}
      <OverviewCards />
      
      {/* Offers Grid */}
      <OffersGrid />
    </>
  );
};

export default UserDashboard;