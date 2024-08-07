import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const FloatingLabelInput = ({ id, label, type = "text" }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");
  
    return (
      <div className="relative w-full">
        <Input
          id={id}
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value !== "")}
          onChange={(e) => setValue(e.target.value)}
          className={`block w-full px-2.5 pb-2.5 pt-4 text-md bg-transparent border rounded-lg appearance-none focus:outline-none  focus-visible:ring-0 focus-visible:ring-white focus:border-primaryText peer ${
            isFocused || value ? "border-primaryChart" : "border-gray-300"
          }`}
          placeholder=" "
        />
        <Label
          htmlFor={id}
          className={`absolute text-sm duration-300 bg-white transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primaryChart peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
            isFocused || value ? "text-primaryChart" : "text-gray-500"
          }`}
        >
          {label}
        </Label>
      </div>
    );
  };
  
  export default FloatingLabelInput;