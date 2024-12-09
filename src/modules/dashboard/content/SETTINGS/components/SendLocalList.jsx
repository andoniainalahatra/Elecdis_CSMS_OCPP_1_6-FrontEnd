import React, { useState } from 'react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';
import { usesendLocalList } from '../config/api';
import Swal from 'sweetalert2';
import { MoonLoader } from 'react-spinners';

const SendLocalList = ({ setSection, IdStation }) => {
    const [data, setData] = useState({
        update_type: '',
        charge_point_id: IdStation,
    });

    // Requête pour récupérer les données adminData

    const { mutate: changeAvailability, isPending, isSuccess } = usesendLocalList();

    const onSubmit = () => {
        if (data.update_type && data.charge_point_id) {
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
        setSection('');
    }


    return (
        <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md">
            <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Modifier la disponibilité</h2>

                {/* Formulaire */}
                <div>
                    <label className="block mb-2" htmlFor="state_type">Type de mis  jour</label>
                    <select
                        id="state_type"
                        value={data.state_type}
                        onChange={(e) => setData({ ...data, update_type: e.target.value })}
                        className="w-full p-2 mb-4 border"
                    >
                        <option value="">Sélectionner un état</option>
                        <option value="FULL">FULL</option>
                        <option value="DIFFERENTIAL">DIFFERENTIAL</option>
                    </select>
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
    );
};
export default SendLocalList