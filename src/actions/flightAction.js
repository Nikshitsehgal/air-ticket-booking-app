
import axios from 'axios';
import apiClient from '../utils/apiClient';

// Action Types
const FLIGHT_REQUEST = 'FLIGHT_REQUEST';
const FLIGHT_SUCCESS = 'FLIGHT_SUCCESS';
const FLIGHT_FAILURE = 'FLIGHT_FAILURE';


// Action to fetch flights based on search criteria
export const fetchFlights = (departure, destination, date, passengers) => async (dispatch) => {
    dispatch({ type: FLIGHT_REQUEST });
  
    try {
        const response = await apiClient.get('/flights', {
            params: { 
              departure: departure,  // departure city
              arrival: destination,   // arrival city
              date: date,             // exact date match
              passengers: passengers  // number of passengers
            }
          });

      dispatch({ type: FLIGHT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FLIGHT_FAILURE, payload: error.message });
    }
  };