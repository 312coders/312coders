import { createContext, useEffect, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import About from "./pages/About";
import Alert from "./components/Alert";
import Community from "./components/Community";
import Discord from "./components/Discord";
import Drawer from "./components/Drawer";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AlertContextProvider } from "./hooks/useAlert";
import Home from "./pages/Home";

export const DrawerContext = createContext<any>({} as any);

const Layout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (open) document.body.classList.add('overflow-hidden');
      else document.body.classList.remove('overflow-hidden');
  }, [open]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <AlertContextProvider>
      <DrawerContext.Provider value={{ open, setOpen }}>
        { open && <Drawer /> }
        <Navbar />
        <main className="pt-16">
          <Outlet />
          <Alert />
        </main>
      </DrawerContext.Provider>
      <Footer />
    </AlertContextProvider>
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
        path: "/discord",
        element: <Discord />
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.querySelector('html')?.classList.add('dark');
}

export default App;
