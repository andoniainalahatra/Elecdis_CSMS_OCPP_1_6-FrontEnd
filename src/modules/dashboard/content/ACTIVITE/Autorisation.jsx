import React from 'react'
import BoutonAdd from '../../component/BoutonAdd';
import AutorisationTable from '../../component/AutorisationTable';


const Autorisation = () => {

    const handleClick = () => {
        alert("hello");
    };
    return (
        <div>
            <div className='flex justify-between m-1'>
                <span className=' text-[24px] text-[#212B36]'>Personnels</span>
                <BoutonAdd action={handleClick} />
            </div>
            <AutorisationTable />
        </div>
    )
}
export default Autorisation