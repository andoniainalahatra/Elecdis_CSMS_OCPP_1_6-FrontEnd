import { Link } from 'react-router-dom'

export default function NavigateLink({route, label}) {
  return (
    <Link className='cursor-pointer text-[#d87c7c] text-xl' to={route}>{label}</Link>
  )
}
