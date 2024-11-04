import React from 'react'
import { RxReload } from "react-icons/rx";

function ButtonReprendreTransaction({idSession, idTag, idConnecteur, disabled}) {
  const reprendreSession = (e) =>{
    e.stopPropagation()
    console.log("idSession :", idSession, "idTag :", idTag, "idConnecteur :", idConnecteur);

  }
  return (
    <button disabled={disabled} onClick={(e) => reprendreSession(e)} className={`p-2 text-white ${disabled ? "bg-blue-200" :  "bg-blue-500 hover:bg-blue-600"}  rounded-xl`} >
      <RxReload color='#ffffff' />
    </button>
  )
}

export default ButtonReprendreTransaction
