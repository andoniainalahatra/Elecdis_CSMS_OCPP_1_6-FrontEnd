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
import ButtonActionSession from "./ButtonSession";
import SessionDetails from "./SessionDetails";
import { useGetTransactionRecharge } from "@/features/TransactionRecharge/TransactionRechargeApi";
import { useEffect, useState } from "react";

export default function SessionTable() {
  const formatDate = (date) => {
    const dateFormate = date.toLocaleDateString("fr-FR");
    const [day, month, year] = dateFormate.split("/");
    return `${year}-${month}-${day}`;
  };
  const dateNow = new Date();
  const [objet, setObjetFilter] = useState({
    debut_energy: 0,
    fin_energy: 200,
    start_cost: 0,
    end_cost: 200000,
    start_time: "2022-01-01",
    end_time: formatDate(dateNow),
  });
  console.log(objet);
  const [status, setStatus] = useState("all");
  console.log(status);

  const datas = [
    {
      accessorKey: "id",
      header: "Id",
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
    {
      accessorKey: "total_energy_unit",
      header: "Énergie consommée",
    },
    {
      accessorKey: "total_price_unit",
      header: "Coût total",
    },
    {
      accessorKey: "state",
      header: "Statut",
    },
    {
      accessorKey: "Urgence",
      header: "Urgence",
    },
  ];
  const columns = datas;
  const actions = [{ name: "detail" }];

  const currentPage = useSelector(selectPage);

  const {
    isPending: loadingAll,
    error: errorAll,
    data: dataAll,
  } = useGetTransactionRecharge(
    "transaction/search_transactions",
    "reposTransaction",
    status,
    objet.start_time,
    objet.end_time,
    objet.start_cost,
    objet.end_cost,
    objet.debut_energy,
    objet.fin_energy,
    currentPage,
    10
  );

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
        filter="session"
        onClickRow={true}
        ComponentModal={SessionDetails}
        setObjetFilter={setObjetFilter}
        filterSession={true}
        setStatus={setStatus}
      />
    </div>
  );
}
