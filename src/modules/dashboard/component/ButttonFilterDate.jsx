import { FiCalendar } from "react-icons/fi";

function ButttonFilterDate({text}) {
  return (
    <div className="px-2 py-1 text-[#6e6868]  rounded-sm flex justify-center items-center text-[14px] bg-[#e9edf1]">
     <FiCalendar /> <p className="ml-1">{text}</p>
    </div>
  );
}

export default ButttonFilterDate;
