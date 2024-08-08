import { forwardRef } from 'react'
// eslint-disable-next-line react/display-name
const Input = forwardRef(({placeholder, type, value, onChange}, ref) => {
    return (
        <input 
        type={type}
        ref={ref} 
        placeholder={placeholder} 
        className='w-full h-[74px] rounded-md border-solid border-[#CDCBCB] border-2 indent-4 text-[#5a5858] text-xl focus:outline-none focus:border-[#F2505D]' 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
    )
})
export default Input;

