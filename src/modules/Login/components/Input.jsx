import { forwardRef, useState } from 'react'
// eslint-disable-next-line react/display-name
const Input = forwardRef(({id , type, value, onChange, label}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
    return (
       <div className='w-full relative'>
        <input 
        id={id}
        type={type}
        ref={ref} 
        className={`peer w-full h-[6vh] rounded-md border-solid border-[#CDCBCB] border-[0.5px] indent-2 text-[#5a5858] text-base focus:outline-none focus:border-[#F2505D]`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        />
        <label
        htmlFor={id}
        className={`absolute left-2 text-base bg-white  px-2 py-0 transition-all duration-300 transform ${isFocused ? "-translate-y-3 scale-90 text-[#F2505D]" : "translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"}`}
         >
        {label}
        </label>
      </div>
    )
})
export default Input;

