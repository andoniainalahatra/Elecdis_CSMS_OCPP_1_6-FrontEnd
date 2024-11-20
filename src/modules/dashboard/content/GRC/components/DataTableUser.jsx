import DataTable from "@/components/Privates/forms/tables/DataTable";
// import Columns from "@/components/Privates/forms/tables/Columns";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { nextPage, previousPage, resetPage, totalPage } from "@/features/Admin/userSlice";

import { ClientApi, ClientApiNewWithPagination } from "../config/client/clientApi";
import { selectClient, selectPage } from "../config/client/clientSelector";
import { getClient, nextPage, previousPage, resetPage, totalPage } from "../config/client/clientSlice";
import ButtonActionClient from "./BoutonActionClient";
import UserProfil from "@/components/UserProfil";
import { useEffect, useState } from "react";
import { selectFilterCalendarTable } from "../../T_BORD/features/filterCalendarSelector";
import { isFullDate, isMonthPresent } from "@/lib/utils";

// const datas = [
//     "id", "first_name", "last_name", "email", "role", "phone", "subscription", "Actions"
// ];

const datas = [
    {
        accessorKey: "id",
        header: "Id",

    },
    {
        accessorKey: "first_name",
        header: "Nom",
    },
    {
        accessorKey: "last_name",
        header: "Prenom",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "phone",
        header: "Telephone",
    },
    {
        accessorKey: "subscription",
        header: "Souscription",
    },
    {
        accessorKey: "Actions",
        header: "Actions",
    },
];

// const columns = Columns(datas);
const columns = datas;
const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }];
const DataTableUser = () => {
    
    const dispatch = useDispatch();
    const date = useSelector(selectFilterCalendarTable);
    // console.log("date:",date)

    const currentPage = useSelector(selectPage);

    const [data, setData] = useState();
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    let userData = useSelector(selectClient);

    // Appel API pour tous les clients
    const {
        data: dataForAll,
        isPending: isPendingforAll,
        error: errorForAll,
    } = ClientApi("users/client", "clientList", currentPage, 10);

    const {
        data: dataForNew,
        isPending: isPendingForNew,
        error: errorForNew
    } = ClientApiNewWithPagination("users/new_clients", month, year, "newClient", currentPage, 10);

    useEffect(() => {
        if (data) {
            dispatch(getClient(data));
        }
    }, [data, dispatch]);

   
    useEffect(() => {
        if (isMonthPresent(date)) {
            const [newYear, newMonth] = date.split("-");
            setMonth(parseInt(newMonth, 10));
            setYear(newYear);
            setData(dataForNew);  // Données des nouveaux clients
        }
         else {
            // Si aucun filtre de mois n'est présent, afficher tous les clients
            setData(dataForAll);
        }
    }, [date, dataForAll, dataForNew]);
    
    // Vous pouvez aussi ajouter une condition pour ne pas appeler `clientList` si `dataForNew` existe
    

    useEffect(() => {
        if (!isFullDate(date) && !isMonthPresent(date)) {
            setYear(date)
            setData(dataForNew)
        }
    }, [date, dataForNew])
    // Affichage du chargement
    if (isPendingforAll || isPendingForNew) {
        return (
            <div className="w-full flex justify-center items-center h-[70vh]">
                <PulseLoader color="#f87" />
            </div>
        );
    }

    // Gestion des erreurs de connexion
    if (errorForAll || errorForNew) {
        Swal.fire({
            title: "Oops ! Erreur de connexion.",
            icon: "error",
        });
        return null;
    }

    // Affichage du tableau de données
    return (
        <DataTable
            columns={columns}
            datas={userData}
            actions={actions}
            ButtonAction={ButtonActionClient}
            totalPage={totalPage}
            selectPage={currentPage}
            resetPage={resetPage}
            nextPage={nextPage}
            previousPage={previousPage}
            onClickRow={true}
            calendarFilter="filterClientTable"
            ComponentModal={UserProfil}
        />
    );
};

export default DataTableUser;