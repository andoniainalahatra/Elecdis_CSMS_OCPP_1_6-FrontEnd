import { forwardRef, useState, useEffect, useRef } from 'react';

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ id, type = 'text', value = '', onChange, label }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = ref || useRef(null);

  useEffect(() => {
    if (value && inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, [value, inputRef]);
  const hasValue = Boolean(value);

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        ref={inputRef}
        className="peer input-style"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <label
        htmlFor={id}
        className={`absolute left-2 text-base bg-white px-2 py-0 transition-all duration-300 transform ${isFocused || hasValue
          ? '-translate-y-3 scale-90 text-[#F2505D]' // Garde le label réduit si l'input est focus ou a une valeur
          : 'max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-[1rem] scale-100 text-simpleText'
          }`}
      >
        {label}
      </label>
    </div>
  );
});

export default Input;
