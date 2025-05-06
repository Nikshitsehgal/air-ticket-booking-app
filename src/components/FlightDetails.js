import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/FlightDetail.css';  // Updated CSS for better styling
import { useLocation } from 'react-router-dom';

const FlightDetails = () => {
  const { id, } = useParams(); // Get the flight ID from the URL
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // For redirecting to the booking page
   // Get the current location object from the URL
   const location = useLocation();
  // Get query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const passengersBook = queryParams.get('passengers'); // Get the 'passengers' query param
  console.log(passengersBook, "passengersOnBookFlight");

  useEffect(() => {
    // Fetch flight details from the JSON Server API based on the flight ID
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_RENDER_LINK}/flights/${id}`);
        setFlight(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching flight details');
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Function to handle the booking
  const handleBooking = () => {
    // Navigate to the booking page (replace '/book' with the actual route)
    navigate(`/book/${flight.id}`, { state: { passengerCount: passengersBook} });
    
  };

  return (
    <div className="flight-details-container">
      <div className="flight-card">
        <div className="flight-header">
          <h2>{flight.departure} → {flight.arrival}</h2>
          <p className="flight-date">{new Date(flight.date).toLocaleDateString()}</p>
        </div>

        <div className="flight-details">
          <div className="flight-info">
            <div className="flight-duration">
              <i className="fas fa-clock"></i>
              <p>{flight.duration} hrs</p>
            </div>
            <div className="flight-price">
              <i className="fas fa-dollar-sign"></i>
              <p>${flight.price}</p>
            </div>
          </div>

          <div className="flight-amenities">
            <h4>Amenities:</h4>
            <ul>
              {flight.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>

          <div className="flight-info-extra">
            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p><strong>Aircraft:</strong> {flight.aircraft}</p>
            <p><strong>Gate:</strong> {flight.gate}</p>
            <p><strong>Terminal:</strong> {flight.terminal}</p>
          </div>
        </div>

        {/* Book Button */}
        <div className="booking-btn">
          <button className="book-btn" onClick={handleBooking}>
            Book This Flight
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
