import React from 'react'
import { RxReload } from "react-icons/rx";

function ButtonReprendreTransaction({disabled}) {
  return (
    <button disabled={disabled} onClick={(e) => e.stopPropagation()} className={`p-2 text-white ${disabled ? "bg-blue-200" :  "bg-blue-500"} hover:bg-blue-600 rounded-xl`} >
      <RxReload color='#ffffff' />
    </button>
  )
}

export default ButtonReprendreTransaction
