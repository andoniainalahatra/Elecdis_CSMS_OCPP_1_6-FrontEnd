import { logout } from "@/features/auth/authSlice";
import { MdLogout } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileButton({ isVisible }) {
  const dispatch = useDispatch();
  return (
    <div className={`bg-white flex flex-col justify-start items-center rounded-md shadow-sm absolute z-20 transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-full'} `} style={{ right: isVisible ? '0' : '-300%'}}>
      <div className="flex justify-start items-center gap-2 w-full hover:bg-[#000f001e] px-4 py-3">
        <RiUser3Line className="text-[20px] text-[#212B36]" />
        <Link to="/userProfile" className="text-[#9D9D9D]">
          Profile
        </Link>
      </div>
      <div className="flex justify-start items-center gap-2 w-full hover:bg-[#000f001e] px-4 py-3">
        <MdLogout className="text-[20px] text-[#212B36]" />
        <button className="text-[#9D9D9D]" onClick={() => dispatch(logout())} >
          Deconnecter
        </button>
      </div>
    </div>
  );
}
