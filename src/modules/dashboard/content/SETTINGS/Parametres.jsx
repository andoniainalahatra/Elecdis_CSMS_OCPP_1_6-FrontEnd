import React, { useState } from 'react'
import BoutonSetting from './components/BoutonSetting'
import Pages from './components/Pages';

const Parametres = () => {
    const [currentSection, setSection] = useState('');
    return (
        <div className='w-screen h-screen p-2 '>

            <div className='flex-col justify-between flex-shrink space-x-2 space-y-2 mt-14'>
                <BoutonSetting label='Change Configuration' setSection={setSection} namePage='ChangeConfiguration' />
                <BoutonSetting label='Change Configuration' setSection={setSection} namePage='Administrateurs' />
                <BoutonSetting label='Change Configuration' setSection={setSection} namePage='Administrateurs' />
                <BoutonSetting label='Change Configuration' setSection={setSection} namePage='Administrateurs' />
                <BoutonSetting label='Change Configuration' setSection={setSection} namePage='Administrateurs' />
                <BoutonSetting label='Change Configuration' setSection={setSection} namePage='Administrateurs' />
                <BoutonSetting label='Change Configuration' setSection={setSection} namePage='Administrateurs' />
            </div>

            <Pages currentSection={currentSection} />
        </div>
    )
}

export default Parametres