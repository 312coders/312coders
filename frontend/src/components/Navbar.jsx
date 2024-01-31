import { Link } from "react-router-dom";
// import Hamburger from "./Hamburger";
import "./Navbar.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode, MdMenu, MdMenuOpen } from "react-icons/md";
import { IconContext } from "react-icons";

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
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [hoverBurgerBtn, setHoverBurgerBtn] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  const toggleHamburger = useCallback(() => {
    setHamburgerOpen(prevState => !prevState);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setHamburgerOpen(false);
  }, []);

  const showButton = () => {
    if (window.innerWidth <= 512) {
      setShowBurger(true);
    } else {
      setShowBurger(false);
    }

    setHamburgerOpen(false);
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

  return (
    <nav className="border-b border-slate-600 bg-dark-blue dark:bg-slate-900 flex justify-center h-16">
      { showBurger && 
        <div className="navbar flex justify-between items-center px-8 w-full max-w-96 h-full">
          <Link to="/">
            <img
              alt='312 Coders Logo'
              src='/logo_mobile.webp'
              style={{width: 'auto', height: '48px', marginTop: 0}}
            />
          </Link>
          <button
            onMouseEnter={() => setHoverBurgerBtn(true)}
            onMouseLeave={() => setHoverBurgerBtn(false)}
            onClick={toggleHamburger}
            className="flex justify-center items-center"
          >
            <IconContext.Provider value={{ size: "3em", className: "transition duration-500", color: burgerBtnColor }}>
              { !hamburgerOpen && <MdMenu /> }
              { hamburgerOpen && <MdMenuOpen /> }
            </IconContext.Provider>
          </button> 
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
                  // onClick={toggleHamburger}
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
