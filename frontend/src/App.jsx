// import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
// import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

import Community from "./components/Community";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EditPage from './pages/EditPage';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/community",
        element: <Community />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/edit/:id",
        element: <EditPage />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
