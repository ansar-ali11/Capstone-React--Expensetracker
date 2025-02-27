import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Dashboard</Link>
        <Link to="/add-expense" className="navbar-link">Add Expense</Link>
        <Link to="/expenses" className="navbar-link">Expense List</Link> {/* Ensure this links to /expenses */}
      </div>
    </nav>
  );
};

export default NavBar;
