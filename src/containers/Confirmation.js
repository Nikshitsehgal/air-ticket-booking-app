import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Confirmation = () => {
  const { id } = useParams();  // Get the flight ID from the URL
  const location = useLocation();
  const { referenceNumber, flightId , totalPrice} = location.state || {}; 
  
  console.log(totalPrice, "totalPrice");
  // The reference number and flight ID passed via navigate

  const [flightDetails, setFlightDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const flightResponse = await axios.get(`${process.env.REACT_APP_RENDER_LINK}/flights/${id}`);
        setFlightDetails(flightResponse.data);
        setBookingDetails(flightResponse.data);
        console.log(flightResponse.data, "flightResponse.data");
      } catch (err) {
        console.error("Error fetching flight details:", err);
      }
    };

    fetchFlightDetails();
  }, [flightId]);

  if (!flightDetails) return <div>Loading flight details...</div>;

  return (
    <div className="confirmation-container">
      <h2>Booking Confirmation</h2>
      <p><strong>Booking Reference:</strong> {referenceNumber}</p>
      <p><strong>Flight:</strong> {flightDetails.departure} → {flightDetails.arrival}</p>
      <p><strong>Flight Number:</strong> {flightDetails.flightNumber}</p>
      <p><strong>Departure Time:</strong> {flightDetails.departureTime}</p>
      <p><strong>Arrival Time:</strong> {flightDetails.arrivalTime}</p>
      <p><strong>Total Seats Left:</strong> {flightDetails.availableseats}</p>
      <p><strong>Total Price:</strong> ${totalPrice}</p>
      <p><strong>Thank you for booking with us!</strong></p>
    </div>
  );
};

export default Confirmation;
