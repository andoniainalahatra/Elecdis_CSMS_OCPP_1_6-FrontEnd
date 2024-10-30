import React from 'react'
import { RxReload } from "react-icons/rx";

function ButtonReprendreTransaction() {
  return (
    <button onClick={(e) => e.stopPropagation()} className='px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-xl' >
      <RxReload color='#ffffff' />
    </button>
  )
}

export default ButtonReprendreTransaction
