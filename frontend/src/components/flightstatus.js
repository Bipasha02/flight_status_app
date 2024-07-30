import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightStatus = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await axios.get('/api/flight-status');
      setFlights(response.data);
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h1>Flight Status</h1>
      {flights.map(flight => (
        <div key={flight.id}>
          <p>{flight.flightNumber} - {flight.status}</p>
        </div>
      ))}
    </div>
  );
};

export default FlightStatus;
