import React, { useEffect, useState } from 'react';
import DataTable from '@/components/Privates/forms/tables/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectHistoriqueCp, selectPage } from '@/features/historiqueStatusCp/historiqueCpSelector';
import { HistoriqueCp } from '@/features/historiqueStatusCp/historiqueCpApi';
import Swal from 'sweetalert2';
import { PulseLoader } from 'react-spinners';
import { getHistoriqueCp, nextPage, previousPage, resetPage, totalPage } from '@/features/historiqueStatusCp/historiqueCpSlice';
import useHistoriqueCp from './config/api';

const HistoriqueStatusCp = () => {
    const currentPage = useSelector(selectPage);
    const dispatch = useDispatch();
    const historiqueData = useSelector(selectHistoriqueCp);

    const [objet, setObjet] = useState({
        id_cp: '',
        status: '',
        start_time: '',
        end_time: ''
    });

    const columns = [
        { accessorKey: "id_charge_point", header: "Id Charge Point" },
        { accessorKey: "statut", header: "Statut" },
        { accessorKey: "time", header: "Temps" }
    ];

    const { isPending: pending, error: error1, data: data1 } = HistoriqueCp(
        "cp/historique_status_chargepoint",
        "historiquStatusCp",
        currentPage,
        10
    );

    const { isPending, error, data } = useHistoriqueCp(
        '/cp/search_historique_status_chargepoint',
        objet.id_cp,
        objet.status,
        objet.start_time,
        objet.end_time
    );

    // Gestion du chargement et des erreurs
    useEffect(() => {
        if (pending || isPending) {
            Swal.fire({
                title: "Chargement en cours...",
                icon: "info",
                showConfirmButton: false,
                allowOutsideClick: false
            });
        } else {
            Swal.close();
        }

        if (error1) {
            Swal.fire({
                title: "Oops ! Erreur de connexion.",
                icon: "error",
            });
        }
    }, [pending, isPending, error1, error]);

    // Gestion des appels API selon `objet`
    useEffect(() => {
        if (objet.status === '' || objet.status === 'All') {
            if (data1) {
                dispatch(getHistoriqueCp(data1));
            }
        } else if (objet.status === 'Available' || objet.status === 'Unavailable') {
            if (data) {
                dispatch(getHistoriqueCp(data));
            }
        }
    }, [data, data1, dispatch, objet.status]);

    return (
        <div>
            <div className="flex justify-between p-6">
                <span className="text-[24px] text-[#212B36]">Historiques status charges points</span>
            </div>
            <div className="p-6">
                <DataTable
                    columns={columns}
                    datas={historiqueData}
                    actions={null}
                    ButtonAction={null}
                    totalPage={totalPage}
                    selectPage={currentPage}
                    resetPage={resetPage}
                    nextPage={nextPage}
                    previousPage={previousPage}
                    filterHistoStatus={true}
                    setObjet={setObjet}
                />
            </div>
        </div>
    );
};

export default HistoriqueStatusCp;
