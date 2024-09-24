import Columns from '@/components/Privates/forms/tables/Columns';
import DataTable from '@/components/Privates/forms/tables/DataTable'
import { selectPage, selectSession } from '@/features/sessions/sessionSelector';
import { getSession, nextPage, previousPage, resetPage, totalPage } from '@/features/sessions/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import ButtonAutorisation from './ButtonAutorisation';
import { useGetSession } from '@/features/sessions/sessionApi';

export default function SessionTable() {
    const datas = ["id", "user_name", "tag", "charge_point_id", "connector_id", "start_time", "end_time", "metter_start", "metter_stop", ];
    const columns = Columns(datas);
    const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }]

    const currentPage = useSelector(selectPage)
    const { isPending, error, data } = useGetSession('transaction/all/', 'repoSession', currentPage, 10)
    const dispatch = useDispatch();
    const sessionData = useSelector(selectSession);


    if (isPending) {
        return (
            <div className="w-full flex justify-center items-center h-[70vh]">
                <PulseLoader color="#f87" />
            </div>)
    }
    if (error) {
        return (Swal.fire({
            title: 'Oops ! Erreur de connexion .',
            icon: "error"
        }))
    }
    console.log(data);
    
    if (data) {
        dispatch(getSession(data));
    }


    return (
        <div>
            <DataTable columns={columns} datas={sessionData} actions={actions} ButtonAction={ButtonAutorisation}
                totalPage={totalPage} selectPage={currentPage}
                resetPage={resetPage}
                nextPage={nextPage} previousPage={previousPage}
            />
        </div>


    );

}

