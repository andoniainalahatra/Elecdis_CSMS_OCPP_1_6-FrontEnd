import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const BoutonAdd = ({ open, Composant, setOpen }) => {
    return (
        <div className="">
            <button onClick={() => setOpen(n => !n)}
                className='text-white  h-[45px] bg-blue-700 shadow-md shadow-blue-200 hover:bg-purple-700 hover:shadow-md hover:shadow-purple-300 p-5 flex items-center font-semibold max-md:text-sm test-[14px]  rounded-full space-x-2 transition duration-300 ease-in-out'>
                <FaPlus className='w-[0.6rem] h-[0.6rem]' />

                <span>Ajouter nouveau</span>
            </button>
            {open && (
                <div className="flex">
                    <Composant setOpen={setOpen} />
                    <span
                        className="fixed z-50 cursor-pointer top-5 right-5"
                        onClick={() => setOpen(n => !n)}
                    >
                        <IoMdClose className="text-white hover:text-amber-400" size={50} />
                    </span>

                </div>)}
        </div>

    )
}

export default BoutonAdd