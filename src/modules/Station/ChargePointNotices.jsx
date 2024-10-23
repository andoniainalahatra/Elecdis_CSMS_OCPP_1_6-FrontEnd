import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectDefaillance, selectPage} from "@/features/Defaillance/defaillanceSelector.js";
import {DefaillanceApi} from "@/features/Defaillance/defaillanceApi.js";
import {PulseLoader} from "react-spinners";
import Swal from "sweetalert2";
import {getDefaillance,resetPage,previousPage,nextPage,totalPage} from "@/features/Defaillance/defaillanceSlice.js";
import DataTable from "@/components/Privates/forms/tables/DataTable.jsx";
import ButtonAction from "@/components/Privates/forms/tables/ButtonAction.jsx";

const datas = [
    {accessorKey : "historique_id", header : "ID"}, {accessorKey : "historique_erreur", header : "Type erreur"}, {accessorKey : "historique_description", header : "Description"}, {accessorKey : "heure_erreur", header : "Heure"}, {accessorKey : "charge_point_id", header : "Id-ChargePoint"}, {accessorKey : "charge_point_model", header : "Modele"}, {accessorKey : "charge_point_vendors", header : "Fournisseur"},{accessorKey : "adresse", header : "Adresse"},{accessorKey : "Actions", header : "Actions"}
];


const columns = datas;
const actions = [{ name: "Non resolu"}];
const ChargePointNotices=() =>{

    const currentPage = useSelector(selectPage);
    const { isPending, error, data } = DefaillanceApi(
        "historique_defaillance/read_historique_defaillance",
        "repoDefaillance",
        currentPage,
        10
    );
    const dispatch = useDispatch();
    const defaillanceData = useSelector(selectDefaillance);

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
        dispatch(getDefaillance(data));
    }

    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                datas={defaillanceData}
                actions={actions}
                ButtonAction={ButtonAction}
                totalPage={totalPage}
                selectPage={currentPage}
                resetPage={resetPage}
                nextPage={nextPage}
                previousPage={previousPage}
            />
        </div>
    );
}

export default ChargePointNotices;