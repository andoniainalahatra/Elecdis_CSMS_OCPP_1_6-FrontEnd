import React from 'react'

export default function ErrorMessage({message}) {
  return (
    <div className='w-full text-left indent-2'>
        <p className='text-[#d87c7c]'>{message}</p>
    </div>
  )
}
