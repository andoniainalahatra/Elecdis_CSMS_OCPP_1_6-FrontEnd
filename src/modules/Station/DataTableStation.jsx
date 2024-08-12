
import DataTable from "@/components/Privates/forms/tables/DataTable";
import stationData from "./data";
import Columns from "@/components/Privates/forms/tables/Columns";


const datas = ["name", "location", "status", "power", "connectors", "lastCommunication"];
const columns = Columns(datas);

const DataTableStation = () => {
  return (
    <DataTable columns={columns} datas={stationData} />
  );
}

export default DataTableStation;