import React from 'react'
import DataTable from '@/components/Privates/forms/tables/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectHistoriqueCp, selectPage } from '@/features/historiqueStatusCp/historiqueCpSelector';
import { HistoriqueCp } from '@/features/historiqueStatusCp/historiqueCpApi';
import Swal from 'sweetalert2';
import { PulseLoader } from 'react-spinners';
import { getHistoriqueCp, nextPage, previousPage, resetPage, totalPage } from '@/features/historiqueStatusCp/historiqueCpSlice';
import ButtonActionClient from '../GRC/components/BoutonActionClient';

const HistoriqueStatusCp = () => {
    const currentPage = useSelector(selectPage);


    const datas = [
        {
            accessorKey: "id_charge_point",
            header: "Id",

        },
        {
            accessorKey: "statut",
            header: "Statut",
        },
        {
            accessorKey: "time",
            header: "Temps",
        }
    ];

    // const columns = Columns(datas);
    const columns = datas;


    const { isPending, error, data } = HistoriqueCp(
        "cp/historique_status_chargepoint",
        "historiquStatusCp",
        currentPage,
        10
    );
    const dispatch = useDispatch();
    const historiqueData = useSelector(selectHistoriqueCp);
    const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }];

    if (isPending) {
        return (
            <div className="w-full flex justify-center items-center h-[70vh]">
                <PulseLoader color="#f87" />
            </div>
        );
    }
    if (error) {
        return Swal.fire({
            title: "Oops ! Erreur de connexion .",
            icon: "error",
        });
    }
    if (data) {
        dispatch(getHistoriqueCp(data));
    }


    return (
        <div>
            <div className="flex justify-between p-6">
                <span className=" text-[24px] text-[#212B36]">Historiques status charges points</span>
            </div>

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
            />
        </div>
    )
}

export default HistoriqueStatusCp