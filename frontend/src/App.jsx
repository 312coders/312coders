// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";

import Community from "./components/Community";
import Contact from "./components/Contact";

import Footer from "./components/Footer";
import { useEffect } from "react";
import { app, api } from "./api";
import { BlogPost } from "./api/blog";
function App() {

  useEffect(() => {
    // if (!app) return;
    console.log('signing in')
    api.blog.getPosts().then(console.log);
    let post = new BlogPost({data: {content: 'je;;p'}})
    console.log(post)
  }, [])
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
