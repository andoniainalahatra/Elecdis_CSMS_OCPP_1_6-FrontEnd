import DataTable from "@/components/Privates/forms/tables/DataTable";
import ButtonAction from "@/components/Privates/forms/tables/ButtonAction";
import { StationApi } from "@/features/Stations/stationApi.js";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
    getReservation,
    nextPage,
    previousPage,
    resetPage,
    totalPage,
} from "@/features/Reservation/ReservationSlice";

import { selectPage, selectReservation } from "@/features/Reservation/ReservationSelector";
import { ReservationApi } from "@/features/Reservation/ReservationAPI";


const datas = [
    { accessorKey: "reservationId", header: "ID-Reservation" }, { accessorKey: "connectorId", header: "Id-connecteur" }, { accessorKey: "IdTag", header: "IdTag" }, { accessorKey: "charge_point_id", header: "Id-ChargePoint" }, { accessorKey: "Actions", header: "Actions" }
];
const columns = datas;
const actions = [{ name: "edit" }, { name: "delete" },{name:"cancel"}];

const DataTableReservation = () => {
    const currentPage = useSelector(selectPage);
    const { isPending, error, data } = ReservationApi(
        "cp/read_cp",
        "repoStation",
        currentPage,
        10
    );

    const dispatch = useDispatch();
    const reservationData = useSelector(selectReservation);

    if (isPending) {
        return (
            <div className="w-full flex justify-center items-center h-[70vh]">
                <PulseLoader color="#f87" />
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
        dispatch(getReservation(data));
    }

    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                datas={reservationData}
                actions={actions}
                ButtonAction={ButtonAction}
                totalPage={totalPage}
                selectPage={currentPage}
                resetPage={resetPage}
                nextPage={nextPage}
                previousPage={previousPage}
                onClickRow={false}
                // ComponentModal={DetailStation}
            />
        </div>
    );
};

export default DataTableReservation;
