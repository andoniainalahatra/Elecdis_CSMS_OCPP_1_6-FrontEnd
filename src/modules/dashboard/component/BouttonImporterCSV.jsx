
import { FaFileImport } from "react-icons/fa6";

function BouttonImporterCSV({action}) {
  return (
    <button onClick={() => action()} className="border-[#212B36] border-solid border-2 h-[45px] text-[#212B36] p-5 flex items-center font-semibold max-md:text-sm test-[14px]  rounded-md space-x-2">
      <FaFileImport color="#212B36" className="w-[1.3rem] h-[1.3rem]" />
      <span>Importer CSV</span>
    </button>
  );
}

export default BouttonImporterCSV;
