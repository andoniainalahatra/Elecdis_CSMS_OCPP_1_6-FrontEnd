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
        className="peer input-style"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => value ? setIsFocused(true) : setIsFocused(false)}
        />
        <label
        htmlFor={id}
        className={`absolute left-2 text-base bg-white  px-2 py-0 transition-all duration-300 transform ${isFocused ? "-translate-y-3 scale-90 text-[#F2505D]" : "max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"}`}
         >
        {label}
        </label>
      </div>
    )
})
export default Input;

