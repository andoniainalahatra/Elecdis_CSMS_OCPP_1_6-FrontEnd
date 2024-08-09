import { forwardRef, useState } from 'react'
// eslint-disable-next-line react/display-name
const Input = forwardRef(({placeholder,id , type, value, onChange, label}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
    return (
       <div className='w-full relative'>
        <input 
        id={id}
        type={type}
        ref={ref} 
        placeholder={isFocused ? null : placeholder } 
        className={`peer w-full h-[6vh] rounded-md border-solid border-[#CDCBCB] border-[0.5px] indent-2 text-[#5a5858] text-base focus:outline-none focus:border-[#F2505D] transition-transform duration-300`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        />
        <label
        htmlFor={id}
        className={`text-[#F2505D] ${isFocused ? "absolute left-2 text-[#F2505D] -top-3 text-base bg-white px-2 py-0 transition-all duration-300" : 'hidden'}`}
         >
        {label}
        </label>
      </div>
    )
})
export default Input;

