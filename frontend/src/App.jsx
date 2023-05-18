// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
