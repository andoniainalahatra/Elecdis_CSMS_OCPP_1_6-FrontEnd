import React, { useState } from 'react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';
import { MoonLoader } from 'react-spinners';
import Swal from 'sweetalert2'; // Assure-toi d'importer Swal
import { usereset } from '../config/api';

const Reset = ({ setSection, IdStation }) => {
    const [data, setData] = useState({
        reset_type: '',
        charge_point_id: IdStation,
    });

    const { mutate: reset, isPending, isSuccess, isError } = usereset();

    const onSubmit = () => {
        if (data.reset_type && data.charge_point_id) {
            reset(data);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Attention',
                text: 'Veuillez vérifier vos données.',
            });
        }
    };

    if (isSuccess) {
        setSection('');
    }

    return (
        <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md">
            <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Restauration</h2>

                {/* Formulaire */}
                <div>
                    <label className="block mb-2" htmlFor="reset_type">
                        Type de réinitialisation
                    </label>
                    <select
                        id="reset_type"
                        value={data.reset_type}
                        onChange={(e) => setData({ ...data, reset_type: e.target.value })}
                        className="w-full p-2 mb-4 border"
                    >
                        <option value="">Sélectionner un type</option>
                        <option value="soft">Soft Reset</option>
                        <option value="hard">Hard Reset</option>
                    </select>
                </div>

                {/* Boutons */}
                <div className="flex justify-between">
                    <button
                        onClick={onSubmit}
                        disabled={isPending}
                        className="flex items-center px-4 py-2 text-white bg-green-500 rounded-lg disabled:bg-gray-400"
                    >
                        {isPending ? (
                            <MoonLoader size={16} color="#fff" />
                        ) : (
                            <>
                                <IoCheckmarkDoneSharp className="mr-2" />
                                Valider
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setSection('')}
                        className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg"
                    >
                        <MdOutlineCancel className="mr-2" />
                        Annuler
                    </button>
                </div>

                {/* Affichage de l'erreur si nécessaire */}
                {isError && (
                    <div className="mt-4 text-red-500">
                        Une erreur s'est produite lors de la réinitialisation. Veuillez réessayer.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reset;
