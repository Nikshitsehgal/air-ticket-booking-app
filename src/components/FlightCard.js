import React from 'react';
import { Link } from 'react-router-dom';
import '../css/FlightCard.css'; // Assuming you have a separate CSS file for the FlightCard

const FlightCard = ({ flight , passengers}) => {
  console.log(passengers, "passengersFlightcard");
  return (
    <div className="flight-card">
      <div className="flight-card-header">
        <h3>{flight.departure} → {flight.arrival}</h3>
        <p className="flight-date">Date: {new Date(flight.date).toLocaleDateString()}</p>
      </div>

      <div className="flight-card-body">
        <div className="flight-info">
          <div className="flight-duration">
            <span className="icon"><i className="fas fa-clock"></i></span>
            <p>{flight.duration} hrs</p>
          </div>
          <div className="flight-price">
            <span className="icon"><i className="fas fa-dollar-sign"></i></span>
            <p>${flight.price}</p>
           
          </div>
        
        </div>
        <div>
          <p> Seats Left: {flight.availableseats}</p>
          </div>

        <div className="flight-actions">
        <Link 
            to={`/flight/${flight.id}?passengers=${passengers}`} // Pass passengers count in the query string
            className="view-details-btn"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
