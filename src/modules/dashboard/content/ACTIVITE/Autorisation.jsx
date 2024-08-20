import React from 'react'
import { FaPlus } from "react-icons/fa";


const Autorisation = () => {
    return (
        <div>Autorisation
            <div className='flex justify-between'>
                <span className=' text-[24px] text-[#212B36]'>Personnels</span>
                <button className=' text-white  h-[45px] bg-[#212B36] p-5 flex items-center font-bold test-[14px] rounded-md space-x-2'>
                    <FaPlus className='w-[1.3rem] h-[1.3rem]' />
                    <span>Ajouter nouveau</span>
                </button>
            </div>
        </div>
    )
}
export default Autorisation