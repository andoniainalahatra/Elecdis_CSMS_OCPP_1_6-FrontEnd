import React, { useState } from 'react'
import BoutonSetting from './components/BoutonSetting'
import Pages from './components/Pages';

const Parametres = ({ IdStation }) => {
    const [currentSection, setSection] = useState('');
    return (
        <div className='w-screen h-screen p-2 '>

            <div className='flex-col justify-between flex-shrink space-y-2 md:space-x-2 mt-14'>
                <BoutonSetting label='Change Configuration' setSection={setSection} namePage='ChangeConfiguration' />
                <BoutonSetting label='Change Availability' setSection={setSection} namePage='ChangeAvailability' />
                <BoutonSetting label='Get Composite Schedule' setSection={setSection} namePage='GetCompositeSchedule' />
                <BoutonSetting label='Réinitialisation' setSection={setSection} namePage='Reset' />
                <BoutonSetting label='Send local list' setSection={setSection} namePage='SendlocalList' />
            </div>

            <Pages currentSection={currentSection} setSection={setSection} IdStation={IdStation} />
        </div>
    )
}

export default Parametres