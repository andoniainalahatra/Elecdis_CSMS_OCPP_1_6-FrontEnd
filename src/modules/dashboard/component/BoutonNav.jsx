import React from 'react';
import { NavLink } from 'react-router-dom';

const BoutonNav = ({ IconButton, label, setSection, namePage }) => {
    return (
        <button className='flex items-center h-[50px] bg-opacity-60 p-2 rounded-md space-x-2 hover:shadow-[#e4dfdf] hover:text-[#F2505D] hover:shadow-sm hover:bg-[#ffebeb] w-full'
            onClick={() => { setSection(namePage) }}>
            {IconButton && <IconButton className="w-[1.5rem] h-[1.5rem] cursor-pointer" />}
            <span>{label}</span>
        </button>
    );
}

export default BoutonNav;
