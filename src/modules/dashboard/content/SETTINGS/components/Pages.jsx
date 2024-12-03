import React from 'react'
import ChangeConfiguration from './ChangeConfiguration'

const Pages = ({ currentSection }) => {
    return (
        <div>
            {currentSection === "ChangeConfiguration" && <ChangeConfiguration />}
        </div>
    )
}

export default Pages