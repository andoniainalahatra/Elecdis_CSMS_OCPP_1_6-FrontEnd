import DataTable from "@/components/Privates/forms/tables/DataTable";
import Columns from "@/components/Privates/forms/tables/Columns";
import ButtonAction from "@/components/Privates/forms/tables/ButtonAction";
import { StationApi } from "@/features/Stations/stationApi.js";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getStation,
  nextPage,
  previousPage,
  resetPage,
  totalPage,
} from "@/features/Stations/stationSlice.js";

import {
  selectPage,
  selectStation,
} from "@/features/Stations/stationSelector.js";

const datas = [
  "id",
  "adresse",
  "status",
  "charge_point_model",
  "charge_point_vendors",
  "Actions",
];
const columns = Columns(datas);
const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }];
const DataTableStation = () => {
  const currentPage = useSelector(selectPage);
  const { isPending, error, data } = StationApi(
    "cp/read_cp",
    "repoStation",
    currentPage,
    10
  );
  const dispatch = useDispatch();
  const stationData = useSelector(selectStation);

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
    dispatch(getStation(data));
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
  );
};

export default DataTableStation;
