import { Context } from "@/common/config/configs/Context";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { BellAlertIcon, } from "@heroicons/react/20/solid";
import { FiSearch } from "react-icons/fi";
import UserIcon from "@/assets/userIcone.png"

import { useContext, useEffect, useRef, useState } from "react";

const BarNav = ({onSearch}) => {
  const { openNav } = useContext(Context);
  const [search, setSearch] = useState(false);
  const searchRef = useRef(null);
  console.log(openNav);
  

  const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
          setSearch(false);
      }
  };

  const handleSearch = (e) => {
    onSearch(e.target.value)
  }

  useEffect(() => {
      if (search) {
          document.addEventListener("click", handleClickOutside);
      } else {
          document.removeEventListener("click", handleClickOutside);
      }
      return () => {
          document.removeEventListener("click", handleClickOutside);
      };
  }, [search]);
  return (
    <div className="w-[100%] absolute top-0 py-[1.3vw] px-6">
      <div className="w-[100%] flex items-center justify-between  mx-auto h-[100%] text-white">
        <div className="w-[50%] flex justify-start items-end" ref={searchRef} >
          <FiSearch onClick={() => setSearch(true)} color="#666666" size={24} />
          <div
            className={`transition-all duration-300 ease-in-out ${
              search ? "w-[200px] opacity-100" : "w-0 opacity-0"
            }`}
          >
            {search && (
              <input
                type="text"
                className="text-[#666666] bg-transparent focus:outline-none text-lg indent-2 w-full"
                placeholder="recherche"
                autoFocus
                onChange={handleSearch}
              />
            )}
          </div>
        </div>
        <div className="w-[50%] flex justify-end items-center gap-4 ">
          <div className="relative text">
            <BellAlertIcon className="w-[1.5rem]  h-[1.5rem] cursor-pointer text-[#969292]" />
            <span
              className=" absolute bg-[#F2505D]  h-[1rem] w-[1rem] text-center rounded-full -top-2 -right-1 font-semibold flex items-center justify-center  text-[13px]"
            >
              6
            </span>
          </div>
          <div className="w-[1.8rem] h-[1.8rem] cursor-pointer border-2 border-[#D9D9D9] rounded-[50%]">
            <img className="w-full h-full" src={UserIcon} alt="" />
          </div>
          <div onClick={openNav} className="md:hidden" >
            <Bars3Icon className="w-[2rem] h-[2rem] cursor-pointer text-[#637381]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarNav;
