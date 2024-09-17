
import DataTable from "@/components/Privates/forms/tables/DataTable";
import stationData from "./data";
import Columns from "@/components/Privates/forms/tables/Columns";
import ButtonAction from "@/components/Privates/forms/tables/ButtonAction";
import Example from "./data";


const datas = ["id", "adresse", "Actions"];
const columns = Columns(datas);
const actions = [{ name: "detail" }, { name: "edit" }, { name: "delete" }]
const DataTableStation = () => {
  return (
    <DataTable columns={columns} datas={Example} actions={actions} ButtonAction={ButtonAction} />

  );
}

export default DataTableStation;