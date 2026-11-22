// Navbar.jsx - the top bar with the logo and the three links.

import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="logo">BookShelf</NavLink>

        <nav className="nav-links">
          {/* NavLink adds the class "active" to the link of the current page.
              "end" on Home stops it from being active on every page, because every URL starts with "/" */}
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/books">Explore Books</NavLink>
          <NavLink to="/add-book">Add Book</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
