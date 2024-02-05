import { Link } from "react-router-dom";
import { useMemo, useCallback, useState, useContext } from "react";
import { DrawerContext } from "../App";
import { MdClose, MdHome, MdInfo, MdGroups } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import { IconContext } from "react-icons";

function Drawer () {
    const [hoverCloseBtn, setHoverCloseBtn] = useState(false);
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
            className="bg-slate-800 fixed z-10 w-3/4 h-full text-white"
            style={drawer.open ? {right: 0} : {right: '100vw'}}
        >
            <div className="drawer-content">
                <button
                    className="absolute top-3 right-3"
                    onMouseEnter={() => setHoverCloseBtn(true)}
                    onMouseLeave={() => setHoverCloseBtn(false)}        
                    onClick={toggleDrawer}
                >
                    <IconContext.Provider value={{ size: "3em", className: "transition duration-500", color: closeBtnColor }}>
                        <MdClose />
                    </IconContext.Provider>
                </button>
                <Link to="/">
                    <img
                    alt='312 Coders Logo'
                    src='/logo_mobile.webp'
                    style={{width: 'auto', height: '48px', marginTop: 0}}
                    />
                </Link>
                <nav className="flex flex-col">
                    <Link to="/" className="flex items-center gap-3">
                        <MdHome />
                        Home
                    </Link>
                    <Link to="/about" className="flex items-center gap-3">
                        <MdInfo />
                        About Us
                    </Link>
                    <Link to="/community" className="flex items-center gap-3">
                        <MdGroups />
                        Community
                    </Link>
                    <Link to="/discord" className="flex items-center gap-3">
                        <FaDiscord />
                        Contact
                    </Link>
                </nav>
            </div>
        </aside>
    );
}

export default Drawer;