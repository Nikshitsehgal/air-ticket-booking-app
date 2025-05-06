
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/FlightSearch.css";
import { fetchFlights } from "../actions/flightAction";
import FlightList from "./FlightList";

const FlightSearch = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { flight, err, loading } = useSelector((state) => state.flights);
  console.log(flight, "flight");

  const handleSelectFlight = (flight) => {
    console.log('Flight selected:', flight);

  };

  // Convert date to dd-mm-yyyy format
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const formattedDate = formatDate(date); // Format the date to dd-mm-yyyy
    console.log("Sending date to API:", formattedDate);

    if (!departure || !arrival || !date) {
      setError("Please fill all fields.");
      return;
    }
    setError("");

    console.log(departure.toLowerCase(), "departure");

    // Dispatch the search flight action with individual parameters
    dispatch(fetchFlights(departure.toLowerCase(), arrival.toLowerCase(), formattedDate, passengers));
  };

  // Handle date change
  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    setDate(inputDate); // store the value in yyyy-mm-dd format
  };

  // Filter flights based on availability
  const filterFlightsBySeats = (flights, requiredSeats) => {
    return flights.filter(flight => flight.availableseats >= requiredSeats);
  };

  const availableFlights = flight ? filterFlightsBySeats(flight, passengers) : [];
  console.log(availableFlights, "availableFlights");

  return (
    <div className="flight-search-container">
      {/* Banner Section */}
      <div className="banner">
        <h1>Find Your Perfect Flight</h1>
        <p>Search and book your next flight in just a few clicks!</p>
      </div>

      {/* Flight Search Form */}
      <div className="search-form-container">
        <form className="flight-search-form" onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              placeholder="Departure City"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              placeholder="Arrival City"
            />
          </div>
          <div className="input-group">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              min="1"
              max="10"
              placeholder="Passengers"
            />
          </div>

          <button type="submit" className="search-btn">
            Search Flights
          </button>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}

      {/* Show loading or error messages */}
      {loading && <p>Loading flights...</p>}

      {/* Show Flight List with available flights based on seat availability */}
      <FlightList flights={availableFlights} onSelectFlight={handleSelectFlight} passengers={passengers} />
    </div>
  );
};

export default FlightSearch;

