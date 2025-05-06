import React from 'react';
import { useDispatch } from 'react-redux';
// import FlightCard from '../components/FlightCard'; // Import the reusable FlightCard component
import '../css/FlightList.css';
import FlightCard from '../components/FlightCard';


const FlightList = ({ flights, onSelectFlight , passengers}) => {
  if (!flights || flights.length === 0) {
    return <p>No flights found. Please adjust your search criteria.</p>;
  }

  console.log(passengers, "passengers");

  return (
    <div className="flight-list-container">
      <h2>Available Flights</h2>
      <div className="flight-cards">
        {flights.map((flight) => (
          <FlightCard
            key={flight.id}  // Assuming each flight has a unique `id`
            flight={flight} 
            passengers= {passengers}  // Pass the flight data to FlightCard
            onSelect={() => onSelectFlight(flight)} // Handle flight selection
          />
        ))}
      </div>
    </div>
  );
};

export default FlightList;
