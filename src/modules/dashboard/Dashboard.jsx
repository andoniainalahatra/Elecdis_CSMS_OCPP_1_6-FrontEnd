import React, { useState } from 'react'
import MobileNav from './component/MobileNav';
import BarNav from './component/BarNav';
import Nav from './component/Nav';



const Dashboard = () => {
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    return (
        <div className=" overflow-x-hidden">
            <div>
                {/* NavBarMobile */}
                <MobileNav nav={nav} closeNav={closeNav} />
                {/* containair Section */}
                <div className='flex w-full h-[100vh] space-x-1 '>
                    <div className=' w-[300px]  bg-[#F9FAFB]  max-md:hidden p-4 overflow-auto custom-scrollbar'>
                        {/* Navigation */}
                        <Nav />
                    </div>

                    <div className='flex-grow bg-white relative'>
                        <BarNav openNav={openNav} />
                        <div className=' mt-[10vh] m-2'>
                            bjeopjeprhjreohjeoph
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard