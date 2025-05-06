// components/Header.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css'; // Assuming you'll add some styles for your header
import airline from '../images/airline.png' 
import { logout } from '../actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Get user from Redux state

  const handleLogout = () => {
    // Clear user from localStorage and logout in Redux
    localStorage.removeItem('user');
    dispatch(logout()); // Assuming you have a logout action
    navigate('/'); // Redirect to login page
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Left side: Logo */}
        <div className="logo">
          <img src= {airline} alt="Logo" />
        </div>

        {/* Center: Navigation Links */}
        <div className="nav-links">
          <a href="/flights">Search Flights</a>
          <a href="/bookings">My Bookings</a>
          {/* <a href="/cancel-booking">Cancel Booking</a> */}
        </div>

        {/* Right side: User Info */}
        <div className="user-info">
          {user ? (
            <>
              <span>Hello, {user?.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <span>Please log in</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
