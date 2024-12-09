import React, { useState } from 'react'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { MdOutlineCancel } from 'react-icons/md'
import { useChangeConfiguration } from '../config/api'
import { MoonLoader } from 'react-spinners'

const ChangeConfiguration = ({ setSection, IdStation }) => {
    const [data, setData] = useState({
        key: '',
        value: '',
        charge_point_id: IdStation
    });

    console.log(data)

    const { mutate: changeConfiguration, isPending, isSuccess } = useChangeConfiguration();

    const onSubmit = () => {
        if (data.key && data.value && data.charge_point_id) {
            changeConfiguration(data); // Envoi des données correctes
        } else {
            Swal.fire({
                icon: "warning",
                title: "Attention",
                text: "Veuillez vérifier vos données.",
            });
        }
    };

    if (isSuccess) {
        setSection('')
    }


    return (
        <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md"
            style={{ backgroundColor: "rgba(9,16,26,0.7)" }}>

            <div className='flex items-center w-1/2 bg-white rounded-md h-1/2 max-md:w-screen max-md:h-screen '>

                <div className='mx-auto border w-[80%] flex flex-col items-center space-y-5 p-5'>

                    <span className=' text-[25px]'>CHANGER CONFIGURATION</span>

                    <div className='flex flex-col justify-center w-full font-semibold '>
                        <div className='flex items-center space-x-2'>
                            <span> Cle : </span>
                            <input className='h-[50px] outline-none border-b' type='text' placeholder='key'
                                value={data.key}
                                onChange={(e) => setData({ ...data, key: e.target.value })} />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center w-full font-semibold'>
                        <div className='flex items-center w-full space-x-2'>
                            <span>Valuer : </span>
                            <input className='h-[50px] outline-none border-b' type='text' placeholder='value'
                                value={data.value}
                                onChange={(e) => setData({ ...data, value: e.target.value })} />
                        </div>
                    </div>

                    <div className='flex justify-center space-x-2 text-white '>
                        <button onClick={() => onSubmit()} className='border rounded-md hover:ring-2 hover:ring-black h-[50px]  bg-green-700 hover:bg-gray-700'>
                            {isPending ? <MoonLoader
                                color="#ffffff"
                                loading={true}
                                size={20}
                            /> : <IoCheckmarkDoneSharp size={50} />
                            }
                        </button>
                        <button onClick={() => setSection('')} className='border rounded-md hover:ring-2 hover:ring-black h-[50px]  bg-red-700 hover:bg-gray-700'>
                            <MdOutlineCancel size={50} />
                        </button>
                    </div>

                </div>




            </div>
        </div>

    )
}

export default ChangeConfiguration