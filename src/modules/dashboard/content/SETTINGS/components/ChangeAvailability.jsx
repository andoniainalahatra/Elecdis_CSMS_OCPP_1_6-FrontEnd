import React, { useState } from 'react'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { MdOutlineCancel } from 'react-icons/md'
import { usechangeAvailability } from '../config/api';

const ChangeAvailability = ({ setSection, IdStation }) => {
    const [data, setData] = useState({
        state_type: '',
        id_connector: '',
        charge_point_id: IdStation
    });
    console.log(data)

    const { mutate: changeAvailability, isPending, isSuccess } = usechangeAvailability();

    const onSubmit = () => {
        if (data.state_type && data.id_connector && data.charge_point_id) {
            changeAvailability(data); // Envoi des données correctes
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
                    <span className=' text-[25px]'>CHANGER AVAILABILITE</span>
                    <div className='flex flex-col justify-center w-full font-semibold '>
                        {/* permet de modifier l'etat d'un connecteur : deux états possible : Inoperative ou Operative */}
                        <div className='flex items-center w-full space-x-2'>
                            <span> Type d'etat : </span>
                            {/* <input className='h-[50px] outline-none border-b' type='text' placeholder='state_type'
                                onChange={(e) => setData({ ...data, state_type: e.target.value })} /> */}

                            <select className='h-[50px] outline-none border-b' onChange={(e) => setData({ ...data, state_type: e.target.value })}>
                                <option value=''></option>
                                <option value='Inoperative '>Inoperative</option>
                                <option value='Operative '>Operative</option>
                            </select>

                        </div>
                    </div>
                    <div className='flex flex-col justify-center w-full font-semibold'>
                        <div className='flex items-center w-full space-x-2'>
                            <span>Id Connecteur : </span>
                            <input className='h-[50px] outline-none border-b' type='text' placeholder='id_connector'
                                onChange={(e) => setData({ ...data, id_connector: e.target.value })} />
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

export default ChangeAvailability