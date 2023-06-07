// import React from "react";
//import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar bg-dark-blue text-white pb-3  max-w-4xl m-auto">
        <nav>
          <ul className="flex justify-center md:justify-end md:text-xl max-w-4xl mx-auto px-7 items-center">
            <li className="mr-10 mt-5">
              <Link
                to="/"
                className="hover:text-red-500 transition duration-500"
              >
                Home
              </Link>
            </li>
            <li className="mr-10 mt-5">
              <Link
                to="/about"
                className="hover:text-red-500 transition duration-500"
              >
                About
              </Link>
            </li>
            <li className="mr-10 mt-5">
              <Link
                to="/community"
                className="hover:text-red-500 transition duration-500"
              >
                Community
              </Link>
            </li>
            <li className="mr-10 mt-5">
              <Link
                to="/contact"
                className="hover:text-red-500 transition duration-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
