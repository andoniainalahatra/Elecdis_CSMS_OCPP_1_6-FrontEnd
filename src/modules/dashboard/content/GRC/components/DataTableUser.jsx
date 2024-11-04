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
import { Context } from "@/common/config/configs/Context";
import { useContext, useEffect, useState } from "react";

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
const listFilter=["nouveau","tous"]
const DataTableUser = () => {
    const month=new Date().getMonth()
    const year=new Date().getFullYear()
    const currentPage = useSelector(selectPage);
    const {filters}=useContext(Context)
    const [data,setData]=useState()
    const { 
            data:dataForAll 
           ,isPending:isPendingforAll,
            error:errorForAll
          } = ClientApi(
        "users/client",
        "clientList",
        currentPage,
        10
    );

    const {
           data: dataForNew ,
           isPending: isPendingForNew,
           error: errorForNew} =
           ClientApiNewWithPagination(
          `users/new_clients`,month,year,
          "newClient",currentPage,10

    )
//     const {
//         data: dataForNew ,
//         isPending: isPendingForNew,
//         error: errorForNew
//     } =
//         ClientApiNew(
//        `users/new_clients/?month=${month}&year=${year}`,
//        "newClient"
//  )


    const dispatch = useDispatch();
    const userData = useSelector(selectClient);
  
    useEffect(() => {
        if (filters.listClient === "tous") {
          setData(dataForAll);
        }
        if (filters.listClient === "nouveau") {
          setData(dataForNew);
        }
      }, [filters, dataForNew, dataForAll]);

    if (isPendingforAll || isPendingForNew) {
        return (
            <div className="w-full flex justify-center items-center h-[70vh]">
                <PulseLoader color="#f87" />
            </div>
        );
    }
    // console.log(data)
    if (errorForAll || errorForNew) {
        return Swal.fire({
            title: "Oops ! Erreur de connexion .",
            icon: "error",
        });
    }
    if (data) {
        dispatch(getClient(data));
    }

   
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
            filter="listClient"
            listFilter={listFilter}
            onFilter={true}
            ComponentModal={UserProfil}
        />
    );
};

export default DataTableUser;
