import { FaPlus } from "react-icons/fa";

const BoutonAdd = ({ action }) => {
    return (
        <button onClick={() => action()} className=' text-white  h-[45px] bg-[#212B36] hover:bg-[#0d1216] p-5 flex items-center font-semibold max-md:text-sm test-[14px]  rounded-md space-x-2'>
            <FaPlus className='w-[1.3rem] h-[1.3rem]' />
            <span>Ajouter nouveau</span>
        </button>
    )
}

export default BoutonAdd