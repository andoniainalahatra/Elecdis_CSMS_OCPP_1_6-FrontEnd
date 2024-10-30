import DataTable from '@/components/Privates/forms/tables/DataTable';
import { useGetTransactionRechargeSpecific } from '@/features/TransactionRecharge/TransactionRechargeApi';
import { selectPage, selectTransactionRecharge } from '@/features/TransactionRecharge/TransactionRechargeSelector';
import { getTransactionRecharge, nextPage, previousPage, resetPage, totalPage } from '@/features/TransactionRecharge/TransactionRechargeSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import ButtonActionSession from './ButtonSession';

function TransactionRechargeTable({id}) {
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
        accessorKey: "Actions",
        header: "Actions",
      }
    ];
    const columns = datas;
    const actions = [{ name: "detail"}];
  
    const currentPage = useSelector(selectPage);
  
    const {
      isPending: loadingAll,
      error: errorAll,
      data: dataAll,
    } = useGetTransactionRechargeSpecific("historique_session/session_list", id, "repoSessionHistoriqueSpecific", currentPage, 10);
    
    const [data, setData] = useState();
    useEffect(() => {
      if (dataAll) {
        setData(dataAll);
      }
    }, [dataAll]);
  
    const dispatch = useDispatch();
    const sessionData = useSelector(selectTransactionRecharge);
    if (loadingAll ) {
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
      dispatch(getTransactionRecharge(data));
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
          resetPage={resetPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
  )
}

export default TransactionRechargeTable
