import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { RiDashboard2Fill } from "react-icons/ri";
import BoutonMobile from "./BoutonMobile";
import { FaHandsHelping } from "react-icons/fa";
import { HiDocumentCheck } from "react-icons/hi2";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineGroup } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { IoMdPersonAdd } from "react-icons/io";
import { MdLockReset } from "react-icons/md";
import { BsFillEvStationFill } from "react-icons/bs";
import { RiReservedFill } from "react-icons/ri";
import {
    ArrowsRightLeftIcon, BellIcon, BoltIcon, DocumentPlusIcon, DocumentTextIcon,
    IdentificationIcon, LockClosedIcon, MapPinIcon, UserGroupIcon
} from '@heroicons/react/16/solid'

const MobileNav = ({ nav, closeNav, setSection }) => {
    const animation = nav ? "translate-x-0" : "translate-x-[-100%]";
    return (
        <div
            // className={`fixed ${animation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-[#09101a]`}
            className={`fixed ${animation} transform transition-all duration-300 top-0 left-0 right-0 bottom-0 z-[10000] bg-[#09101a] backdrop-blur-md flex justify-center `}
            style={{ backgroundColor: "rgba(9, 16, 26, 0.7)" }}>

            <div className="w-[300px] h-[100vh] flex flex-col items-center justify-center ">
                <BoutonMobile IconButton={RiDashboard2Fill} label='Tableau de bord' setSection={setSection} namePage='TableauDeBord' />

                <span className='text-[#919EAB] ml-4'>ACTIVITE</span>
                <BoutonMobile IconButton={LockClosedIcon} label='Autorisations' setSection={setSection} namePage='Autorisations' />
                <BoutonMobile IconButton={RiReservedFill} label='Réservations' setSection={setSection} namePage='Réservations' />
                <BoutonMobile IconButton={BoltIcon} label='Sessions  de recharge' setSection={setSection} namePage='sessionRecharge' />
                <BoutonMobile IconButton={ArrowsRightLeftIcon} label='Transactions' setSection={setSection} namePage='Transaction' />
                <BoutonMobile IconButton={UserGroupIcon} label='Users' setSection={setSection} namePage='Users' />
                <BoutonMobile IconButton={IdentificationIcon} label='Etiquettes RFID' setSection={setSection} namePage='EtiquettesRFID' />
                <BoutonMobile IconButton={DocumentTextIcon} label='Réçus' setSection={setSection} namePage='Reçus' />
                <BoutonMobile IconButton={BsFillEvStationFill} label='Points de charges' setSection={setSection} namePage='PointsDecharges' />
                <BoutonMobile IconButton={MapPinIcon} label='Locations' setSection={setSection} namePage='Locations' />
                <BoutonMobile IconButton={BellIcon} label='CP Notices' setSection={setSection} namePage='CpNotices' />
                <BoutonMobile IconButton={DocumentPlusIcon} label='CP Templates' setSection={setSection} namePage='CpTemplates' />
                <BoutonMobile IconButton={FaHandsHelping} label='Partenaires' setSection={setSection} namePage='Partenaires' />
                <BoutonMobile IconButton={HiDocumentCheck} label='Contrats' setSection={setSection} namePage='Contrats' />
                <BoutonMobile IconButton={AiOutlineGroup} label='Groupes des tarifs' setSection={setSection} namePage='GroupesDestarifs' />
                <BoutonMobile IconButton={FaDollarSign} label='Tarifs' setSection={setSection} namePage='Tarifs' />
                <BoutonMobile IconButton={TbLogout2} label='Connexion' setSection={setSection} namePage='Connexion' />
                <BoutonMobile IconButton={IoMdPersonAdd} label='Inscription' setSection={setSection} namePage='Inscription' />
                <BoutonMobile IconButton={MdLockReset} label='Réinitialiser mot de passe' setSection={setSection} namePage='RéinitialiserMotDepasse' />


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