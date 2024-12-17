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
        <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md">

            <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md">
                <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-4 text-xl font-bold">Modifier la Configuration</h2>

                    {/* Formulaire */}
                    <div>
                        <label className="block mb-2" htmlFor="connectorId">Cle</label>
                        <input className="w-full p-2 mb-4 border" type='text' placeholder='key'
                            value={data.key}
                            onChange={(e) => setData({ ...data, key: e.target.value })} />

                        <label className="block mb-2" htmlFor="state_type">Valuer</label>
                        <input className='w-full p-2 mb-4 border' type='text' placeholder='value'
                            value={data.value}
                            onChange={(e) => setData({ ...data, value: e.target.value })} />
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-between">
                        <button
                            className="flex items-center px-4 py-2 text-white bg-green-500 rounded"
                            onClick={onSubmit}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <MoonLoader size={15} color="#fff" />
                            ) : (
                                <IoCheckmarkDoneSharp />
                            )}
                            {isPending ? ' En cours' : 'Valider'}
                        </button>
                        <button
                            className="flex items-center px-4 py-2 text-white bg-red-500 rounded"
                            onClick={() => setSection('')}
                        >
                            <MdOutlineCancel />
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangeConfiguration