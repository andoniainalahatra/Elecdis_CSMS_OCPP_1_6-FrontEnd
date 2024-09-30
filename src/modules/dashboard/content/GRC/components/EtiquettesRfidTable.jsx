import DataTable from '@/components/Privates/forms/tables/DataTable';
import Columns from '@/components/Privates/forms/tables/Columns';
import { nextPage, getRfid, previousPage, resetPage, totalPage } from '@/features/RFID/rfidSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectPage, selectRfid } from '@/features/RFID/rfidSelector';
import { useGetListRfid } from '@/features/RFID/rfidApi';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import ButtonActionRfid from './ButtonActionRfid';
import { useEffect } from 'react';

const EtiquettesRfidTable = () => {
  const datasColumn = ['id', 'rfid', 'user_name', 'Actions'];
  const columns = Columns(datasColumn);
  const actions = [{ name: 'detail' }, { name: 'edit' }, { name: 'delete' }];
  const dispatch = useDispatch();
  const stationData = useSelector(selectRfid);
  const currentPage = useSelector(selectPage);
  const { isPending, error, data } = useGetListRfid('rfid/all', 'dataRFID', currentPage, 10);

  // Utilise useEffect pour mettre à jour l'état lorsque les données sont prêtes
  useEffect(() => {
    if (data) {
      dispatch(getRfid(data));
    }
  }, [data, dispatch]); // Exécuter cet effet uniquement quand data ou dispatch change

  if (isPending) {
    return (
      <div className="w-full flex justify-center items-center h-[70vh]">
        <PulseLoader color="#F2505D" />
      </div>
    );
  }

  if (error) {
    Swal.fire({
      title: 'Oops ! Erreur de connexion.',
      icon: 'error',
    });
    return null; // Retourne null pour éviter un autre rendu avec l'erreur
  }

  return (
    <DataTable
      columns={columns}
      datas={stationData}
      actions={actions}
      ButtonAction={ButtonActionRfid}
      totalPage={totalPage}
      selectPage={currentPage}
      resetPage={resetPage}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export default EtiquettesRfidTable;
