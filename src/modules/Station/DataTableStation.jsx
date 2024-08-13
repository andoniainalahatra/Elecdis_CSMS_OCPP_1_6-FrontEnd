
import DataTable from "@/components/Privates/forms/tables/DataTable";
import stationData from "./data";
import Columns from "@/components/Privates/forms/tables/Columns";


const datas = ["id", "name", "location", "status", "power", "connector1", "connector2", "lastCommunication"];
const columns = Columns(datas);

const DataTableStation = () => {
  return (
    <DataTable columns={columns} datas={stationData} />
  );
}

export default DataTableStation;