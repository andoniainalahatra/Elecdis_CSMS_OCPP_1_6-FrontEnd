
import { FaFileImport } from "react-icons/fa6";

function BouttonImporterCSV({action}) {
  return (
    <button 
    onClick={action} 
    className="border-blue-700 hover:border-blue-700 hover:bg-blue-800 border-solid border-2 h-[45px] text-[#212B36] hover:text-white px-5 flex items-center font-semibold
      max-md:text-sm text-[14px] rounded-full space-x-8 relative shadow-sm shadow-blue-300 transition duration-300 ease-in-out"
  >
    <span>Importer CSV</span>
    <div className=""> </div>
  <div className="bg-blue-800 hover:bg-blue-800 h-[45px] w-[45px] absolute right-0 flex items-center justify-center rounded-full transition duration-300 ease-in-out ">
    <FaFileImport className="w-[1.3rem] h-[1.3rem] text-white group-hover:text-white" />
  </div>    
  </button>
  );
}

export default BouttonImporterCSV;
