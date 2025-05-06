import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { bookFlight } from '../actions/bookingAction'; // Import your action to book flight
import { isValidCardNumber, isValidExpiryDate, isValidCVV } from '../utils/validation'; // Import validation functions
import '../css/Booking.css';

const BookingForm = () => {
  const { id } = useParams(); // Get the flight ID from the URL
  const location = useLocation();
  const { user } = useSelector((state) => state.auth); 
  const userId = user?.id || null; // Fallback to null if user is not available
  console.log(userId, "userId");
  const { passengerCount } = location.state || {}; // Accessing state passed via navigate
  const navigate = useNavigate();

  // Redux setup
  const dispatch = useDispatch();
  const { loading, error, successMessage, bookingDetails } = useSelector(state => state.booking);

  const [flightDetails, setFlightDetails] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [remainingSeats, setRemainingSeats] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numPassengers, setNumPassengers] = useState(passengerCount || 1); // Default to passengerCount or 1 if not passed
  const [users, setUsers] = useState([]);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const flightResponse = await axios.get(`${process.env.REACT_APP_RENDER_LINK}/flights/${id}`);
        setFlightDetails(flightResponse.data);
        setRemainingSeats(flightResponse.data.availableseats);
        setTotalPrice(flightResponse.data.price * numPassengers);

        const userResponse = await axios.get(`${process.env.REACT_APP_RENDER_LINK}/users`);
        setUsers(userResponse.data);
      } catch (err) {
        console.error("Error fetching flight or user details:", err);
      }
    };

    fetchFlightDetails();
  }, [id, numPassengers]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setValidationError(''); // Reset validation error

    // Validate card number, expiry date, and CVV
    if (!isValidCardNumber(paymentInfo.cardNumber)) {
      setValidationError('Card number must be exactly 16 digits.');
      return;
    }

    if (!isValidExpiryDate(paymentInfo.expiryDate)) {
      setValidationError('Invalid expiry date. Please ensure the date is in the future (MM/YY).');
      return;
    }

    if (!isValidCVV(paymentInfo.cvv)) {
      setValidationError('CVV must be exactly 3 digits.');
      return;
    }

    // Check if the number of passengers exceeds available seats
    if (numPassengers > remainingSeats) {
      setValidationError('Not enough seats available.');
      return;
    }

    // Validate entered card details against users' cards in db.json
    const isValidCard = users.some((user) =>
      user.cards.some(
        (card) =>
          card.cardNumber === paymentInfo.cardNumber &&
          card.expiryDate === paymentInfo.expiryDate &&
          card.cvv === paymentInfo.cvv
      )
    );

    if (!isValidCard) {
      setValidationError('Invalid card details. Please try again.');
      return;
    }

    // Dispatch Redux action to book the flight
    const passengerDetails = {
      numPassengers,
      paymentDetails: paymentInfo
    };

    const bookingData = {
      flightId: id,
      passengerDetails,
      paymentDetails: paymentInfo
    };

    // Dispatch the action to book flight
    dispatch(bookFlight(id, passengerDetails, paymentInfo, user, totalPrice));
  };

  console.log(bookingDetails, "bookingDetails");
  // If booking is successful, redirect to confirmation
  useEffect(() => {
    if (bookingDetails && bookingDetails.referenceNumber) {
      setTimeout(() => {
        navigate(`/confirmation/${id}`, { state: { referenceNumber: bookingDetails.referenceNumber, totalPrice:bookingDetails.totalPrice } });
      }, 2000); // Redirect after 2 seconds
    }
  }, [bookingDetails, navigate, id]);

  // If still loading flight details, show loading state
  if (loading) return <div>Loading flight details...</div>;

  return (
    <div className="booking-container">
      <h2>Book Your Flight</h2>

      {flightDetails ? (
        <div>
          <p><strong>Flight:</strong> {flightDetails.departure} → {flightDetails.arrival}</p>
          <p><strong>Price per Passenger:</strong> ${flightDetails.price}</p>
          <p><strong>Seats Available:</strong> {remainingSeats}</p>
          <p><strong>Total Price for {numPassengers} passengers:</strong> ${totalPrice}</p>
        </div>
      ) : (
        <p>{error ? `Error: ${error}` : 'Loading flight details...'}</p>
      )}

      <form onSubmit={handleBookingSubmit}>
        <div className="payment-details">
          <h4>Payment Details</h4>
          <label>
            Card Number:
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              maxLength={16}
              required
            />
          </label>
          <label>
            Expiry Date (MM/YY):
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
              maxLength={5}  // MM/YY format
              placeholder="MM/YY"
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
              maxLength={3}
              required
            />
          </label>
        </div>

        <button type="submit" disabled={loading}>Confirm Booking</button>

        {validationError && <p className="error-message">{validationError}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
