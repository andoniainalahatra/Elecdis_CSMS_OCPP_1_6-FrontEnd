import React from 'react'
import DataTable from '@/components/Privates/forms/tables/DataTable';
// import stationData from "../content/ACTIVITE/components/data/userData";
import Columns from '@/components/Privates/forms/tables/Columns';
import ButtonAutorisation from '../content/ACTIVITE/components/ButtonAutorisation';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, previousPage, resetPage, totalPage } from '@/features/Stations/stationSlice';
import { getUser } from '@/features/Users/userSlice';
import { UserApi } from '@/features/Users/userApi';
import { selectPage, selectUser } from '@/features/Users/userSelector';
import { PulseLoader } from 'react-spinners';
import Swal from 'sweetalert2';


const AutorisationTable = () => {
    const datas = ["id", "first_name", "last_name", "email", "role", "role", "phone", "subscription", "partner", "Actions"];
    const columns = Columns(datas);
    const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }]

    const currentPage = useSelector(selectPage)
    const { isPending, error, data } = UserApi('users', 'repoUser', currentPage, 10)
    const dispatch = useDispatch();
    const userData = useSelector(selectUser);


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
    if (data) {
        dispatch(getUser(data));
    }

    return (
        <>

            <DataTable columns={columns} datas={userData} actions={actions} ButtonAction={ButtonAutorisation}
                totalPage={totalPage} selectPage={currentPage}
                resetPage={resetPage}
                nextPage={nextPage} previousPage={previousPage}
            />
        </>
    );

}

export default AutorisationTable
