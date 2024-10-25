import { FiCalendar } from "react-icons/fi";

function ButttonFilterDate({text}) {
  return (
    <div className="lg:px-1 md:px-1 px-2 text-[#6e6868]  rounded-sm flex justify-center items-center bg-[#e9edf1]">
     <FiCalendar className="text-[12px]" /> <p className="ml-1 md:text-[12px] text-lg">{text}</p>
    </div>
  );
}

export default ButttonFilterDate;
