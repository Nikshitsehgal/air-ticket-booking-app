import { createStore, applyMiddleware , compose } from 'redux';
import {thunk} from 'redux-thunk';  // For handling async actions
import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import flightReducer from '../reducers/flightReducer';
import { bookingReducer } from '../reducers/bookingReducer';


const rootReducer = combineReducers({
    auth:authReducer,
    flights:flightReducer,
    booking:bookingReducer
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
const Store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
export default Store;