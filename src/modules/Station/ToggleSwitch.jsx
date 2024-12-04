import { useState } from "react";
import { IoMdLock, IoMdUnlock } from "react-icons/io";


const ToggleSwitch = ({ isChecked, onToggle }) => {
  return (
    <div className="flex items-center">
      <input
        id="toggle"
        type="checkbox"
        className="hidden peer"
        checked={isChecked}
        onChange={() => onToggle(!isChecked)}
      />
      <label
        htmlFor="toggle"
        className="w-20 h-9 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative cursor-pointer transition"
      >
        <span
          className={`w-8 h-8 bg-white rounded-full absolute top-0.5 left-0.5 transition flex justify-center items-center ${
            isChecked ? "translate-x-11" : ""
          }`}
        >
          {isChecked ? <IoMdUnlock /> : <IoMdLock />}
        </span>
      </label>
    </div>
  );
};
export default ToggleSwitch;
