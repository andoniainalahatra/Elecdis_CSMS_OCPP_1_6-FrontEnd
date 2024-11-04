import DataTable from "@/components/Privates/forms/tables/DataTable";
import { selectPage, selectSession } from "@/features/sessions/sessionSelector";
import {
  getSession,
  nextPage,
  previousPage,
  resetPageSession,
  totalPage,
} from "@/features/sessions/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useGetSession } from "@/features/sessions/sessionApi";
import { Context } from "@/common/config/configs/Context";
import { useContext, useEffect, useState } from "react";
import ButtonActionSession from "./ButtonSession";
import SessionDetails from "./SessionDetails";
import { useGetTransactionRecharge } from "@/features/TransactionRecharge/TransactionRechargeApi";

export default function SessionTable() {
  // const { filters } = useContext(Context);
  const datas = [
    {
      accessorKey : "id",
      header : "Id"
    },
    {
      accessorKey: "user_name",
      header: "Nom d'utilisateur",

    },
    {
      accessorKey: "rfid",
      header: "RFID",
    },
    {
      accessorKey: "start_time",
      header: "Date et heure de début",
    },
    {
      accessorKey: "end_time",
      header: "Date et heure de fin",
    },
    // {
    //   accessorKey: "consumed_energy",
    //   header: "Énergie consommée",
    // },
    // {
    //   accessorKey: "total_cost",
    //   header: "Coût total",
    // },
    {
      accessorKey: "state",
      header: "Statut",
    },
    {
      accessorKey: "Urgence",
      header: "Urgence",
    }
  ];
  const columns = datas;
  const actions = [{ name: "detail" }];
  const listFiltre = ["tous", "en cours", "terminé"];

  const currentPage = useSelector(selectPage);

  const {
    isPending: loadingAll,
    error: errorAll,
    data: dataAll,
  } = useGetTransactionRecharge("historique_session/", "repoSessionHistorique", currentPage, 10);
  // const {
  //   isPending: loadingCurrent,
  //   error: errorCurrent,
  //   data: dataCurrent,
  // } = useGetSession(
  //   "transaction/current/",
  //   "repoSessionCurrent",
  //   currentPage,
  //   10
  // );
  // const {
  //   isPending: loadingDOne,
  //   error: errorDone,
  //   data: dataDone,
  // } = useGetSession("transaction/done/", "repoSessionDone", currentPage, 10);

  const [data, setData] = useState();
  useEffect(() => {
    if (dataAll) {
      setData(dataAll);
    }
  }, [dataAll]);

  const dispatch = useDispatch();
  const sessionData = useSelector(selectSession);

  // useEffect(() => {
  //   if (filters.session === "All" || filters.session === "tous") {
  //     setData(dataAll);
  //   }
  //   if (filters.session === "en cours") {
  //     setData(dataCurrent);
  //   }
  //   if (filters.session === "terminé") {
  //     setData(dataDone);
  //   }
  // }, [filters, dataDone, dataCurrent, dataAll]);

 // if (loadingAll || loadingCurrent || loadingDOne) {
  if (loadingAll ) {
    return (
      <div className="w-full flex justify-center items-center h-[70vh]">
        <PulseLoader color="#f87" />
      </div>
    );
  }
  // if (errorAll || errorCurrent || errorDone) {
  if (errorAll) {
    return Swal.fire({
      title: "Oops ! Erreur de connexion .",
      icon: "error",
    });
  }

  if (data) {
    dispatch(getSession(data));
  }

  return (
    <div className="w-full overflow-x-auto">
      <DataTable
        columns={columns}
        datas={sessionData}
        actions={actions}
        ButtonAction={ButtonActionSession}
        totalPage={totalPage}
        selectPage={currentPage}
        resetPage={resetPageSession}
        nextPage={nextPage}
        previousPage={previousPage}
        onFilter={true}
        listFilter={listFiltre}
        filter="session"
        onClickRow={true}
        ComponentModal={SessionDetails}
      />
    </div>
  );
}
