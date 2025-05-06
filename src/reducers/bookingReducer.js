import { 
    BOOK_FLIGHT_REQUEST, 
    BOOK_FLIGHT_SUCCESS, 
    BOOK_FLIGHT_FAILURE, 
    VIEW_BOOKINGS, 
    CANCEL_BOOKING 
  } from '../actions/bookingAction';
  
  const initialState = {
    loading: false,
    bookingDetails: null,
    bookings: [],
    error: null,
  };
  
  export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case BOOK_FLIGHT_REQUEST:
        return { ...state, loading: true };
      case BOOK_FLIGHT_SUCCESS:
        return { ...state, loading: false, bookingDetails: action.payload };
      case BOOK_FLIGHT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case VIEW_BOOKINGS:
        return { ...state, bookings: action.payload };
      case CANCEL_BOOKING:
        return { 
          ...state, 
          bookings: state.bookings.filter(booking => booking.id !== action.payload) 
        };
      default:
        return state;
    }
  };
  