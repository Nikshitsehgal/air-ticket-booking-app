import axios from 'axios';

// Action Types
export const BOOK_FLIGHT_REQUEST = 'BOOK_FLIGHT_REQUEST';
export const BOOK_FLIGHT_SUCCESS = 'BOOK_FLIGHT_SUCCESS';
export const BOOK_FLIGHT_FAILURE = 'BOOK_FLIGHT_FAILURE';
export const VIEW_BOOKINGS = 'VIEW_BOOKINGS';
export const CANCEL_BOOKING = 'CANCEL_BOOKING';

// Book Flight Action (async using Redux Thunk)

export const bookFlight = (flightId, passengerDetails, paymentDetails, userId, totalPrice) => async (dispatch) => {
    dispatch({ type: BOOK_FLIGHT_REQUEST });
  
    try {
      // Step 1: Generate a booking reference number based on the current timestamp
      const referenceNumber = `BOOK-${Date.now()}`;
  
      // Prepare the booking data (including the generated reference number)
      const bookingData = {
        flightId,
        passengerDetails,
        paymentDetails,
        userId,
        totalPrice,
        referenceNumber,  // Attach the reference number to the booking data
        bookingDate: new Date().toISOString(),  // Current date as booking date
      };
  
      // Step 2: Simulate sending the booking data to the backend (mock API call)
      // We're assuming this is sending the booking data to a mock server like json-server
      const response = await axios.post(`${process.env.REACT_APP_RENDER_LINK}/bookings`, bookingData);
  
      // Step 3: Fetch the current flight details to update available seats
      const flightResponse = await axios.get(`${process.env.REACT_APP_RENDER_LINK}/flights/${flightId}`);
      const updatedFlight = {
        ...flightResponse.data,
        availableseats: flightResponse.data.availableseats - passengerDetails.numPassengers,  // Decrease available seats
      };
  
      // Step 4: Update the flight data with the new available seats (send the updated flight data back)
      await axios.put(`${process.env.REACT_APP_RENDER_LINK}/flights/${flightId}`, updatedFlight);
  
      // Dispatch success action with the booking response, including the reference number and updated flight details
      dispatch({
        type: BOOK_FLIGHT_SUCCESS,
        payload: {
            ...response.data,          // Booking response with the reference number
            referenceNumber,           // Ensure reference number is passed here
            flightDetails: updatedFlight,  // Include the updated flight info with available seats
        },
      });
  
    } catch (error) {
      dispatch({
        type: BOOK_FLIGHT_FAILURE,
        payload: error.message,
      });
    }
  };
  
  
// View Bookings Action (fetch user's past bookings)
export const viewBookings = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_RENDER_LINK}/bookings`);
    // Filter bookings by the logged-in user's ID (assuming userId is now just an ID string)
    const userBookings = response.data.filter((booking) => booking.userId.id === userId); // Check the userId object
    dispatch({
      type: VIEW_BOOKINGS,
      payload: userBookings,  // Only dispatch the user's bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};

// Cancel Booking Action
export const cancelBooking = (bookingId) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.REACT_APP_RENDER_LINK}/bookings/${bookingId}`);
    dispatch({
      type: CANCEL_BOOKING,
      payload: bookingId,  // Removed bookingId
    });
  } catch (error) {
    console.error('Error canceling booking:', error);
  }
};
