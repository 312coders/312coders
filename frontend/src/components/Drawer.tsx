import { Link } from "react-router-dom";
import { useMemo, useCallback, useState, useContext } from "react";
import { DrawerContext } from "../App";
import { MdClose, MdHome, MdInfo, MdGroups } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import '../pages/Home.css';

function Drawer () {
    const [hoverCloseBtn, setHoverCloseBtn] = useState(false);
    const [hoverHomeBtn, setHoverHomeBtn] = useState(false);
    const [hoverInfoBtn, setHoverInfoBtn] = useState(false);
    const [hoverGroupBtn, setHoverGroupBtn] = useState(false);
    const [hoverContactBtn, setHoverContactBtn] = useState(false);
    const drawer = useContext(DrawerContext);

    const toggleDrawer = useCallback(() => {
        drawer.setOpen(false);
    }, []);

    const closeBtnColor = useMemo(() => {
        if (hoverCloseBtn) return '#ef4444';
            else return 'white';
    }, [hoverCloseBtn]);

    return (
        <aside
            className="bg-black/50 fixed z-10 w-full h-screen overflow-hidden text-white"
        >
            <div
                className="bg-dark-blue dark:bg-slate-900 fixed right-0 w-3/4 h-screen py-12 flex flex-col items-center gap-3 drawer"
                style={drawer.open ? {right: 0} : {right: '100vw'}}
            >
                <button
                    className="absolute top-1 right-1"
                    onMouseEnter={() => setHoverCloseBtn(true)}
                    onMouseLeave={() => setHoverCloseBtn(false)}        
                    onClick={toggleDrawer}
                >
                    <MdClose
                        size="3em"
                        className="transition duration-500"
                        color={closeBtnColor}
                    />
                </button>
                <Link to="/">
                    <img
                    alt='312 Coders Logo'
                    src='/logo_mobile.webp'
                    style={{width: '75%', height: 'auto', margin: '0 auto'}}
                    />
                </Link>
                <nav className="flex flex-col w-full">
                    <Link
                        to="/"
                        className="flex items-center gap-3 p-3 text-lg transition duration-500 hover:bg-slate-900"
                        onMouseOver={() => setHoverHomeBtn(true)}
                        onMouseLeave={() => setHoverHomeBtn(false)}
                        onClick={() => drawer.setOpen(false)}
                    >
                        <MdHome
                            className="transition duration-500"
                            color={hoverHomeBtn ? '#ef4444' : 'white'}
                            size="2em"
                        />
                        <span
                            className={`transition duration-500 ${hoverHomeBtn ? 'text-nav-red' : 'text-white'}`}
                        >Home</span>
                    </Link>
                    <Link
                        to="/about"
                        className="flex items-center gap-3 p-3 text-lg transition duration-500 hover:bg-slate-900"
                        onMouseOver={() => setHoverInfoBtn(true)}
                        onMouseLeave={() => setHoverInfoBtn(false)}
                        onClick={() => drawer.setOpen(false)}
                    >
                        <MdInfo
                            className="transition duration-500"
                            color={hoverInfoBtn ? '#ef4444' : 'white'}
                            size="2em"
                        />
                        <span
                            className={`transition duration-500 ${hoverInfoBtn ? 'text-nav-red' : 'text-white'}`}
                        >About Us</span>
                    </Link>
                    <Link
                        to="/community"
                        className="flex items-center gap-3 p-3 text-lg transition duration-500 hover:bg-slate-900"
                        onMouseOver={() => setHoverGroupBtn(true)}
                        onMouseLeave={() => setHoverGroupBtn(false)}
                        onClick={() => drawer.setOpen(false)}
                    >
                        <MdGroups
                            className="transition duration-500"
                            color={hoverGroupBtn ? '#ef4444' : 'white'}
                            size="2em"
                        />
                        <span
                            className={`transition duration-500 ${hoverGroupBtn ? 'text-nav-red' : 'text-white'}`}
                        >Community</span>
                    </Link>
                    <Link
                        to="/discord"
                        className="flex items-center gap-3 p-3 text-lg transition duration-500 hover:bg-slate-900"
                        onMouseOver={() => setHoverContactBtn(true)}
                        onMouseLeave={() => setHoverContactBtn(false)}
                        onClick={() => drawer.setOpen(false)}
                    >
                        <FaDiscord
                            className="transition duration-500"
                            color={hoverContactBtn ? '#ef4444' : 'white'}
                            size="2em"
                        />
                        <span
                            className={`transition duration-500 ${hoverContactBtn ? 'text-nav-red' : 'text-white'}`}
                        >Contact</span>
                    </Link>
                </nav>
            </div>
        </aside>
    );
}

export default Drawer;