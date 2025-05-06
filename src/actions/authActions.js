import axios from 'axios';

// Action Types
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action Creators
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    // Send a request to the JSON server to validate the username and password
    const response = await axios.get(`${process.env.REACT_APP_RENDER_LINK}/users`); // Assuming you use 'GET' to fetch all users

    // Find user by matching username and password
    const user = response.data.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Store the user in localStorage (or sessionStorage)
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: 'Invalid username or password' });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: 'An error occurred during login' });
  }
};

// Action to check if the user is already authenticated
export const checkAuthentication = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } else {
    dispatch({ type: LOGIN_FAILURE, payload: 'No user authenticated' });
  }
};

// actions/authActions.js
// actions/authActions.js
export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};