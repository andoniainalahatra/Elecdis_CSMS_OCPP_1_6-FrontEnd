import React from 'react'
import BoutonAdd from '../../component/BoutonAdd'
import Page from '@/modules/Station/Page';

const Clients = () => {
    const handleClick = () => alert("hello");
    return (
        <div>
            <div className='flex justify-between m-1'>
                <span className=' text-[24px] text-[#212B36]'>Liste des clients</span>
                <BoutonAdd action={handleClick} />
            </div>
            <Page />
        </div>
    )
}

export default Clients