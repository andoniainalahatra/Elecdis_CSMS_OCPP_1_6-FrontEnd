import React from 'react'

export default function Boutton({label}) {
  return (
    <>
      <button type='submit' className='w-full h-[74px] bg-[#F2505D] rounded-md text-white text-lg font-medium hover:bg-[#df3846] hover:text-white'>{label}</button>
    </>
  )
}
