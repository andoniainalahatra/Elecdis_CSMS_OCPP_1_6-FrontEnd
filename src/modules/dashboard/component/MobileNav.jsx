import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

const MobileNav = ({ nav, closeNav }) => {
    const animation = nav ? "translate-x-0" : "translate-x-[-100%]";
    return (
        <div
            // className={`fixed ${animation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-[#09101a]`}
            className={`fixed ${animation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-[#09101a] backdrop-blur-md`}
            style={{ backgroundColor: "rgba(9, 16, 26, 0.7)" }}
        >
            <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
                <div className="nav-link-mobile">HOME</div>
                <div className="nav-link-mobile">ABOUT</div>
                <div className="nav-link-mobile">CONTACT</div>
                <div className="nav-link-mobile">LOGIN</div>
                <div className="nav-link-mobile">SINGUP</div>
            </div>
            <div
                onClick={closeNav}
                className="absolute cursor-pointer top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-yellow-400"
            >
                <XMarkIcon />
            </div>
        </div>
    );
};
export default MobileNav;