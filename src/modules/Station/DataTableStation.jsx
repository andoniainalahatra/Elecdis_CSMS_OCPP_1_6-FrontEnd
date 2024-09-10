
import DataTable from "@/components/Privates/forms/tables/DataTable";
import stationData from "./data";
import Columns from "@/components/Privates/forms/tables/Columns";
import ButtonAction from "@/components/Privates/forms/tables/ButtonAction";


const datas = ["id", "name", "location", "status", "power", "connector1", "connector2", "lastCommunication", "Actions"];
const columns = Columns(datas);
const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }]
const DataTableStation = () => {
  return (
    <DataTable columns={columns} datas={stationData} actions={actions} ButtonAction={ButtonAction} />

  );
}

export default DataTableStation;