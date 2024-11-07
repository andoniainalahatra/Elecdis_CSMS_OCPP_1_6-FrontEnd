import DataTable from "@/components/Privates/forms/tables/DataTable";

import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { selectPage, selectSession } from "@/components/features/SpecificSession/sessionSpecificSelector";
import { useGetSpecificSession } from "@/components/features/SpecificSession/sessionSpecificApi";
import { getSession, nextPage, previousPage, resetPageSession, totalPage } from "@/components/features/SpecificSession/sessionSpecificSlice";
import { useEffect, useState } from "react";
import SessionDetails from "./SessionDetails";
import ButtonActionSession from "./ButtonSession";

export default function UserTableSpecificSession({ id }) {
  const datas = [
    {
      accessorKey: "user_name",
      header: "Nom d'utilisateur",

    },
    {
      accessorKey: "rfid",
      header: "RFID",
    },
    {
      accessorKey: "charge_point_id",
      header: "ID de la borne",
    },
    {
      accessorKey: "connector_id",
      header: "ID Connecteur",
    },
    {
      accessorKey: "start_time",
      header: "Date et heure de début",
    },
    {
      accessorKey: "end_time",
      header: "Date et heure de fin",
    },
    {
      accessorKey: "consumed_energy",
      header: "Énergie consommée",
    },
    {
      accessorKey: "total_cost",
      header: "Coût total",
    },
    {
      accessorKey: "statuts",
      header: "Statut",
    },
    {
      accessorKey: "Urgence",
      header: "Urgence",
    },
  ];
  const columns = datas;
  const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }];
  const listFiltre = ["tous", "en cours", "terminé"];

  const currentPage = useSelector(selectPage);

  const {
    isPending: loadingAll,
    error: errorAll,
    data: dataAll,
  } = useGetSpecificSession("transaction", id, "specificSession", currentPage, 10);

  const [data, setData] = useState();
  useEffect(() => {
    if (dataAll) {
      setData(dataAll);
    }
  }, [dataAll]);

  const dispatch = useDispatch();
  const sessionData = useSelector(selectSession);


  if (loadingAll) {
    return (
      <div className="w-full flex justify-center items-center h-[70vh]">
        <PulseLoader color="#f87" />
      </div>
    );
  }
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
        onFilter={false}
        listFilter={listFiltre}
        filter="session"
        ComponentModal={SessionDetails}
        onClickRow={true}
      />
  );
}
