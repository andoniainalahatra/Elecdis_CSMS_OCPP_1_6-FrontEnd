import React from 'react'
import ChangeConfiguration from './ChangeConfiguration'
import ChangeAvailability from './ChangeAvailability'
import GetCompositeSchedule from './GetCompositeSchedule'
import Reset from './Reset'
import SendLocalList from './SendLocalList'

const Pages = ({ currentSection, setSection, IdStation }) => {
    return (
        <div className=''>
            {currentSection === "ChangeConfiguration" && <ChangeConfiguration setSection={setSection} IdStation={IdStation} />}
            {currentSection === "ChangeAvailability" && <ChangeAvailability setSection={setSection} IdStation={IdStation} />}
            {currentSection === "GetCompositeSchedule" && <GetCompositeSchedule setSection={setSection} IdStation={IdStation} />}
            {currentSection === "Reset" && <Reset setSection={setSection} IdStation={IdStation} />}
            {currentSection === "SendlocalList" && <SendLocalList setSection={setSection} IdStation={IdStation} />}
        </div>
    )
}

export default Pages