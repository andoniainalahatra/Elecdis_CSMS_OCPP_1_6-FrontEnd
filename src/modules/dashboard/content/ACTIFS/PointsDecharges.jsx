import BoutonAdd from "../../component/BoutonAdd";
import DataTableStation from "@/modules/Station/DataTableStation";
import CreateStation from "@/modules/Station/CreateStation.jsx";
import {useState} from "react";

const PointsDecharges = () => {
const [open,setOpen]=useState(false);
    return (
        <div className="w-full h-auto p-6">
            <div className="flex items-center justify-between w-full mb-6">
                <h2 className="text-[#212B36] text-xl">Charge Point</h2>
                <BoutonAdd  Composant={CreateStation}  setOpen={setOpen} open={open}/>
            </div>
            <DataTableStation />
        </div>
    );
};
export default PointsDecharges;
