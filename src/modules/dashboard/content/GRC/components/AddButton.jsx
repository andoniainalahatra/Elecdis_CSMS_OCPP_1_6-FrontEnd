import { FaPlus } from 'react-icons/fa'

function AddButton({action}) {
  return (
    <button 
    onClick={action} 
    className='text-white  h-[45px] bg-blue-700 shadow-md shadow-blue-200 hover:bg-purple-700 hover:shadow-md hover:shadow-purple-300 p-5 flex items-center font-semibold max-md:text-sm test-[14px]  rounded-full space-x-2 transition duration-300 ease-in-out'
  >
    <FaPlus className="w-[1.3rem] h-[1.3rem] text-white" />
    <span>Ajouter Nouveau</span>
  </button>
  )
}

export default AddButton
