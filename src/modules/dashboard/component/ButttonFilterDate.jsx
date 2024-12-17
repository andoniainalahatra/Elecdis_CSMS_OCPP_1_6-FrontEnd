import { FiCalendar } from "react-icons/fi";

function ButttonFilterDate({text}) {
  return (
    <div className="px-4 text-[#6e6868]  rounded-sm flex justify-center items-center bg-[#f2f3f5]">
     <FiCalendar className="text-[12px]" /> <p className="ml-1 md:text-[12px] text-lg">{text}</p>
    </div>
  );
}

export default ButttonFilterDate;
