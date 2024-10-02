import React from 'react'
import UserIcon from "@/assets/userIcone.png"
import { FiEdit } from "react-icons/fi";
function UserProfil() {
  return (
    <div className='w-full p-6'>
      <h2 className="text-[#212B36] text-xl mb-6">Information utilisateur</h2>
      <div className="w-full flex justify-between items-center">
        <div className="w-[15%] flex justify-between items-center">
            <div className="w-[50%]">
                <img src={UserIcon} className='w-[100%] h-auto rounded-full border-[#637381] border-4' alt="" />
            </div>
            <h3 className='text-[#637381] font-bold text-[18px] mt-4'>Jhon Doe</h3>
        </div>
        <button className="w-[10%] bg-[#F9FAFB] p-1 flex items-center justify-center gap-2 text-[#637381] border-[#637381] border-2 rounded-sm">
            Modifier
            <FiEdit size={14} color='#212B36' />
        </button>
      </div>
    </div>
  )
}

export default UserProfil
