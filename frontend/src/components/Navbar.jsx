import { Link } from "react-router-dom";
// import Hamburger from "./Hamburger";
import "./Navbar.css";
import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode, MdMenu, MdMenuOpen } from "react-icons/md";
import { IconContext } from "react-icons";
import { DrawerContext } from "../App";

function Navbar() {
  // DARK MODE //
  const [darkMode, setDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [hoverDarkBtn, setHoverDarkBtn] = useState(false);

  const darkBtnColor = useMemo(() => {
    if (hoverDarkBtn) return '#ef4444';
      else return 'white';
  }, [hoverDarkBtn]);

  function toggleDarkMode () {
    document.querySelector('html')?.classList.remove('dark');
    
    if (!darkMode) {
      document.querySelector('html')?.classList.add('dark');
      setDarkMode(true);
    } else setDarkMode(false);
  };

  // MOBILE MENU (BURGER BUTTON) //
  const [hoverBurgerBtn, setHoverBurgerBtn] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const drawer = useContext(DrawerContext);

  const closeMobileMenu = useCallback(() => {
    drawer.setOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    drawer.setOpen(prevState => !prevState);
  })

  const showButton = () => {
    if (window.innerWidth <= 512) {
      setShowBurger(true);
    } else {
      setShowBurger(false);
    }

    drawer.setOpen(false);
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", showButton);

    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  const burgerBtnColor = useMemo(() => {
    if (hoverBurgerBtn) return '#ef4444';
      else return 'white';
  }, [hoverBurgerBtn]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, []);

  return (
    <nav className="border-b border-slate-600 bg-dark-blue dark:bg-slate-900 flex justify-center h-16 fixed w-screen z-[1100]">
      { showBurger && 
        <div className="navbar flex justify-between items-center px-8 w-full max-w-96 h-full">
          <Link to="/" onClick={closeMobileMenu}>
            <img
              alt='312 Coders Logo'
              src='/logo_mobile.webp'
              style={{width: 'auto', height: '48px', marginTop: 0}}
            />
          </Link>
          <div className="flex gap-4">
            <button onMouseEnter={() => setHoverDarkBtn(true)} onMouseLeave={() => setHoverDarkBtn(false)} onClick={toggleDarkMode}>
              <IconContext.Provider value={{ size: "3em", className: "transition duration-500", color: darkBtnColor }}>
                { !darkMode && <MdOutlineDarkMode /> }
                { darkMode && <MdOutlineLightMode /> }
              </IconContext.Provider>
            </button> 
            <button
              onMouseEnter={() => setHoverBurgerBtn(true)}
              onMouseLeave={() => setHoverBurgerBtn(false)}
              onMouseDown={() => setHoverBurgerBtn(false)}
              onClick={toggleMobileMenu}
              className="flex justify-center items-center"
            >
              <IconContext.Provider value={{ size: "3em", className: "transition duration-500", color: burgerBtnColor }}>
                { !drawer.open && <MdMenu /> }
                { drawer.open && <MdMenuOpen /> }
              </IconContext.Provider>
            </button> 
          </div>
        </div>
      }
      { !showBurger && 
        <div className="navbar flex justify-between items-center px-7 w-full h-full">
          <button onMouseEnter={() => setHoverDarkBtn(true)} onMouseLeave={() => setHoverDarkBtn(false)} onClick={toggleDarkMode}>
            <IconContext.Provider value={{ size: "3em", className: "transition duration-500", color: darkBtnColor }}>
              { !darkMode && <MdOutlineDarkMode /> }
              { darkMode && <MdOutlineLightMode /> }
            </IconContext.Provider>
          </button> 
          <div className="pb-3 text-white w-full md:w-auto pl-5">
            <ul className="flex justify-center content-center md:text-xl">
              <li className="mr-10 mt-5">
                <Link
                  to="/"
                  className="hover:text-red-500 transition duration-500"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li className="mr-10 mt-5">
                <Link
                  to="/about"
                  className="hover:text-red-500 transition duration-500"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className="mr-10 mt-5">
                <Link
                  to="/community"
                  className="hover:text-red-500 transition duration-500"
                  onClick={closeMobileMenu}
                >
                  Community
                </Link>
              </li>
              <li className="mr-10 mt-5">
                <Link
                  to="/discord"
                  className="hover:text-red-500 transition duration-500"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div> 
        </div>
      }
    </nav>
  );
}

export default Navbar;
