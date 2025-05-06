const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };

    case "LOGIN_SUCCESS":
      console.log("User logged in:", action.payload.id); // Log the payload
      return { ...state, user: action.payload, loading: false };

    case "LOGIN_FAILURE":
      return { ...state, error: action.payload, loading: false };

    case "LOGOUT":
      return {
        ...state,
        user: null, // Clear user from state
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
