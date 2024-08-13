import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { RiDashboard2Fill } from "react-icons/ri";
import BoutonMobile from "./BoutonMobile";

const MobileNav = ({ nav, closeNav, setSection }) => {
    const animation = nav ? "translate-x-0" : "translate-x-[-100%]";
    return (
        <div
            // className={`fixed ${animation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-[#09101a]`}
            className={`fixed ${animation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-[#09101a] backdrop-blur-md flex justify-center `}
            style={{ backgroundColor: "rgba(9, 16, 26, 0.7)" }}>

            <div className="w-[300px] h-[100vh] flex flex-col items-center justify-center ">
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />

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