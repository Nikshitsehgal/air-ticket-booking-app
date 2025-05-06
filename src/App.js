import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./containers/Login";
import "./App.css";
import FlightSearch from "./containers/FlightSearch";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from "./actions/authActions";
import Header from "./containers/Header";
import FlightDetails from "./components/FlightDetails";
import BookingForm from "./components/BookingForm";
import Confirmation from "./containers/Confirmation";
import BookingList from "./containers/BookingList";

const App = () => {
  
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth); // From Redux state

  // Check if user is authenticated on app load
  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  // // Show loading screen while checking user authentication
  // if (loading) {
  //   return <div>Loading...</div>; // Show a loading message or spinner
  // }
  return (
    <Router>
      <div className="App">
        {/* Show header only if user is authenticated */}
        {user && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/flights"
            element={user ? <FlightSearch /> : <Navigate to="/" />}
          />
          <Route
            path="/flight/:id"
            element={user ? <FlightDetails /> : <Navigate to="/" />}
          />
          <Route
            path="/book/:id"
            element={ <BookingForm />}
          />
          <Route
            path="/bookings"
            element={ <BookingList />} // Protect the route with user check
          />
          <Route path="/confirmation/:id" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
