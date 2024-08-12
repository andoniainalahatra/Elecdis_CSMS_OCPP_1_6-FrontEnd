import React, { useState } from 'react'
import MobileNav from './component/MobileNav';
import BarNav from './component/BarNav';

import TableauDeBord from './content/T_BORD/TableauDeBord';
import Nav from './component/Nav';
import Reservation from './content/ACTIVITE/Reservation';
import SessionRecharge from './content/ACTIVITE/SessionRecharge';
import Transactions from './content/ACTIVITE/Transactions';
import Autorisation from './content/ACTIVITE/Autorisation';
import Users from './content/GRC/Users';
import EtiquettesRfid from './content/GRC/EtiquettesRfid';
import Reçus from './content/GRC/Reçus';
import PointsDecharges from './content/ACTIFS/PointsDecharges';
import Locations from './content/ACTIFS/Locations';
import CpNotices from './content/ACTIFS/CpNotices';
import CpTemplates from './content/ACTIFS/CpTemplates';
import Partenaires from './content/PARTENAIRES/Partenaires';
import Contrats from './content/PARTENAIRES/Contrats';
import GroupesDesTarifs from './content/TARIFS/GroupesDesTarifs';
import Tarifs from './content/TARIFS/Tarifs';
import Connexion from './content/AUTHENTIFICATIONS/Connexion';
import Inscription from './content/AUTHENTIFICATIONS/Inscription';
import RenitialiserMotDePasse from './content/AUTHENTIFICATIONS/RenitialiserMotDePasse';



const Dashboard = () => {
    const [nav, setNav] = useState(false);
    const [currentSection, setSection] = useState('TableauDeBord');
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);


    return (
        <div className=" overflow-x-hidden">
            <div>
                {/* NavBarMobile */}
                <MobileNav nav={nav} closeNav={closeNav} />
                {/* containair Section */}
                <div className='flex w-full h-[100vh] space-x-1 '>
                    <div className=' w-[280px]  bg-[#F9FAFB]  max-md:hidden p-4 overflow-auto custom-scrollbar'>
                        {/* Navigation */}
                        <Nav setSection={setSection} />
                    </div>

                    <div className='flex-grow bg-white relative'>
                        <BarNav openNav={openNav} />
                        <div className=' mt-[10vh] m-2'>
                            {currentSection === "TableauDeBord" && <TableauDeBord />}
                            {/* ACTIVITE */}
                            {currentSection === "Autorisations" && <Autorisation />}
                            {currentSection === "Réservations" && <Reservation />}
                            {currentSection === "sessionRecharge" && <SessionRecharge />}
                            {currentSection === "Transaction" && <Transactions />}
                            {/* GRC */}
                            {currentSection === "Users" && <Users />}
                            {currentSection === "EtiquettesRFID" && <EtiquettesRfid />}
                            {currentSection === "Reçus" && <Reçus />}
                            {/* ACTIFS */}
                            {currentSection === "PointsDecharges" && <PointsDecharges />}
                            {currentSection === "Locations" && <Locations />}
                            {currentSection === "CpNotices" && <CpNotices />}
                            {currentSection === "CpTemplates" && <CpTemplates />}
                            {/* PARTENAIRES */}
                            {currentSection === "Partenaires" && <Partenaires />}
                            {currentSection === "Contrats" && <Contrats />}
                            {/* TARIFS & VOUCHERS */}
                            {currentSection === "GroupesDestarifs" && <GroupesDesTarifs />}
                            {currentSection === "Tarifs" && <Tarifs />}
                            {/* AUTHENTIFICATIONS */}
                            {currentSection === "Connexion" && <Connexion />}
                            {currentSection === "Inscription" && <Inscription />}
                            {currentSection === "RéinitialiserMotDepasse" && <RenitialiserMotDePasse />}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard