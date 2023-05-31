// import React from "react";
//import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar bg-dark-blue text-white pb-3">
        <nav>
          <ul className="flex justify-center md:justify-between max-w-4xl mx-auto px-7">
            <li className="ml-10 mr-8 mt-5">
              <Link to="/">Home</Link>
            </li>
            <li className="mr-8 mt-5">
              <Link to="/about">About</Link>
            </li>
            <li className="mr-8 mt-5">
              <Link to="/community">Community</Link>
            </li>
            <li className="mr-8 mt-5">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
