import React from 'react'

const ChangeConfiguration = ({ setSection }) => {


    return (
        <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md"
            style={{ backgroundColor: "rgba(9,16,26,0.7)" }}>

            <div className='flex items-center w-1/2 bg-white rounded-md h-1/2 max-md:w-screen max-md:h-screen '>

                <div className='mx-auto border w-[80%] flex flex-col items-center space-y-5 p-5'>

                    <span className=' text-[25px]'>CHANGER CONFIGURATION</span>

                    <div className='flex flex-col justify-center w-full font-semibold '>
                        <div className='flex items-center space-x-2'>
                            <span> Cle : </span>
                            <input className='h-[50px] outline-none border-b' type='text' placeholder='key' />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center w-full font-semibold'>
                        <div className='flex items-center w-full space-x-2'>
                            <span>Valuer : </span>
                            <input className='h-[50px] outline-none border-b' type='text' placeholder='value' />
                        </div>
                    </div>

                    <div className='flex justify-center text-white md:space-x-2 max-md:flex-col'>
                        <button onClick={() => setSection('')} className='border rounded-md hover:ring-2 hover:ring-black h-[50px] w-[200px] bg-green-700 hover:bg-gray-700'>
                            Valider
                        </button>
                        <button onClick={() => setSection('')} className='border rounded-md hover:ring-2 hover:ring-black h-[50px] w-[200px] bg-red-700 hover:bg-gray-700'>
                            Annuler
                        </button>
                    </div>

                </div>




            </div>
        </div>

    )
}

export default ChangeConfiguration