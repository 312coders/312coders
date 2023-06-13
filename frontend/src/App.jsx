// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";

import Community from "./components/Community";
import Contact from "./components/Contact";
import Editor from './components/Editor';
import Footer from "./components/Footer";
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/edit" element={<Editor />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
