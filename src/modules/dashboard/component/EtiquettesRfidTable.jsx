import DataTable from '@/components/Privates/forms/tables/DataTable'
import Columns from '@/components/Privates/forms/tables/Columns';
// import { dataTransactionPayement } from '@/_mock/TransactionPayement';
import { nextPage, getRfid, previousPage, resetPage, totalPage,  } from '@/features/RFID/rfidSlice';
import ButtonAction from '@/components/Privates/forms/tables/ButtonAction';
import { useDispatch, useSelector } from 'react-redux';
import { selectPage, selectRfid } from '@/features/RFID/rfidSelector';
import { useGetListRfid } from '@/features/RFID/rfidApi';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const EtiquettesRfidTable = () => {
    const datasColumn = ["id", "rfid",  "user_name", "Actions"];
    const columns = Columns(datasColumn);
    const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }];
    const dispatch = useDispatch();
      const stationData = useSelector(selectRfid);
      const currentPage = useSelector(selectPage);
      const { isPending, error, data } = useGetListRfid(
        "rfid/all",
        "dataRFID",
        currentPage,
        10
      );
      if (isPending) {
        return (
          <div className="w-full flex justify-center items-center h-[70vh]">
            <PulseLoader color="#F2505D" />
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
        dispatch(getRfid(data));
      }
    return (
        <DataTable
      columns={columns}
      datas={stationData}
      actions={actions}
      ButtonAction={ButtonAction}
      totalPage={totalPage}
      selectPage={currentPage}
      resetPage={resetPage}
      nextPage={nextPage}
      previousPage={previousPage}
    />
    )
}

export default EtiquettesRfidTable