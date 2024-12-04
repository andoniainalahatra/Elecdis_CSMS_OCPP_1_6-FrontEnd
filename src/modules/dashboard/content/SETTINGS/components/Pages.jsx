import React from 'react'
import ChangeConfiguration from './ChangeConfiguration'
import ChangeAvailability from './ChangeAvailability'
import GetCompositeSchedule from './GetCompositeSchedule'
import Reset from './Reset'
import SendLocalList from './SendLocalList'

const Pages = ({ currentSection, setSection }) => {
    return (
        <div className=''>
            {currentSection === "ChangeConfiguration" && <ChangeConfiguration setSection={setSection} />}
            {currentSection === "ChangeAvailability" && <ChangeAvailability setSection={setSection} />}
            {currentSection === "GetCompositeSchedule" && <GetCompositeSchedule setSection={setSection} />}
            {currentSection === "Reset" && <Reset setSection={setSection} />}
            {currentSection === "SendlocalList" && <SendLocalList setSection={setSection} />}
        </div>
    )
}

export default Pages