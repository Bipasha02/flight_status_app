import React from 'react';
import FlightStatus from './components/FlightStatus';
import NotificationSettings from './components/NotificationSettings';

const App = () => {
  return (
    <div>
      <FlightStatus />
      <NotificationSettings />
    </div>
  );
};

export default App;
