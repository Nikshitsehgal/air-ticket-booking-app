import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewBookings, cancelBooking } from '../actions/bookingAction'; // Import actions
import { useNavigate } from 'react-router-dom';
import '../css/BookingList.css'; // Import the CSS file

const BookingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth); // Get current logged-in user from Redux
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    if (user) {
      console.log(user?.id, "user?.id")
      dispatch(viewBookings(user?.id)); // Fetch bookings for the logged-in user
    }
  }, [dispatch, user]);

  const handleCancelBooking = (bookingId) => {
    // Ask for confirmation before canceling the booking
    const isConfirmed = window.confirm('Are you sure you want to cancel this booking?');

    if (isConfirmed) {
      dispatch(cancelBooking(bookingId)); // Cancel the booking if confirmed
    }
  };

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="booking-list-container">
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className="no-bookings">You have no bookings.</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={booking.id} className="booking-item">
              <h3>Flight: {booking.flightId}</h3>
              <p>Date: {booking.bookingDate}</p>
              <p className="reference-number">Reference Number: {booking.referenceNumber}</p>
              {/* Display cancel button for each booking */}
              <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Air_India_Logo_2014.svg" alt="Air India"></img>
            </li>
            
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
