import Page from '@/modules/Station/Page'
import React from 'react'
import BoutonAdd from '../../component/BoutonAdd'
import DataTableStation from '@/modules/Station/DataTableStation';

const PointsDecharges = () => {
    const handleClick = () => alert("hello");
    return (
        <div className=''>
            <div className='flex justify-between m-1'>
                <span className=' text-[24px] text-[#212B36]'>Stations</span>
                <BoutonAdd action={handleClick} />
            </div>
            <DataTableStation />
        </div>
    )
}

export default PointsDecharges