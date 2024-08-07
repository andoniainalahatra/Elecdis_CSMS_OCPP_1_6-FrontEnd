import React from 'react'
import { Link } from 'react-router-dom'

export default function NavigateLink({route, label}) {
  return (
    <Link className='text-[#d87c7c] border-b-[0.1px] transition border-[#d87c7c] text-xl' to={route}>{label}</Link>
  )
}
