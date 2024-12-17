import React, { useState } from 'react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';
import { usechangeAvailability } from '../config/api';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import Swal from 'sweetalert2';
import { MoonLoader } from 'react-spinners';

const ChangeAvailability = ({ setSection, IdStation }) => {
    const [data, setData] = useState({
        state_type: '',
        connectorId: '',
        charge_point_id: IdStation,
    });

    // Requête pour récupérer les données adminData
    const {
        isPending: isrepostat,
        data: adminData,
        error: errorStat,
    } = useQuery({
        queryKey: ["repoStat", IdStation],
        queryFn: () =>
            axiosInstance.get(`/cp/read_cp/${IdStation}`).then((res) => res.data),
        refetchInterval: 1000,
    });

    const { mutate: changeAvailability, isPending, isSuccess } = usechangeAvailability();

    const onSubmit = () => {
        if (data.state_type && data.connectorId && data.charge_point_id) {
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

    if (isrepostat) {
        return <div className="flex items-center justify-center h-screen"><MoonLoader color="#36d7b7" /></div>;
    }
    if (errorStat) {
        return <div className="text-red-500">Une erreur est survenue, veuillez réessayer.</div>;
    }

    return (
        <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md">
            <div className="w-1/3 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Modifier la disponibilité</h2>

                {/* Formulaire */}
                <div>
                    <label className="block mb-2" htmlFor="connectorId">Connecteur</label>
                    <select
                        id="connectorId"
                        value={data.connectorId}
                        onChange={(e) => setData({ ...data, connectorId: e.target.value })}
                        className="w-full p-2 mb-4 border"
                    >
                        <option value="">Sélectionner un connecteur</option>
                        {adminData && adminData.map((item) => (
                            <option key={item.id_connecteur} value={item.id_connecteur}>
                                {item.id_connecteur}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2" htmlFor="state_type">État</label>
                    <select
                        id="state_type"
                        value={data.state_type}
                        onChange={(e) => setData({ ...data, state_type: e.target.value })}
                        className="w-full p-2 mb-4 border"
                    >
                        <option value="">Sélectionner un état</option>
                        <option value="available">Disponible</option>
                        <option value="unavailable">Indisponible</option>
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

export default ChangeAvailability;
