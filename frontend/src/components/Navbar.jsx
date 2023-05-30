// import React from "react";
//import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar bg-dark-blue text-white">
        <nav>
          <ul className="flex">
            <li className="mr-8">
              <Link to="/">Home</Link>
            </li>
            <li className="mr-8">
              <Link to="/about">About</Link>
            </li>
            <li className="mr-8">
              <Link to="/community">Community</Link>
            </li>
            <li className="mr-8">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
