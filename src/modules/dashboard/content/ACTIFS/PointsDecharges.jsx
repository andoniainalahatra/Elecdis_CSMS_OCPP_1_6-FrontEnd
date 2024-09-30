import BoutonAdd from "../../component/BoutonAdd";
import DataTableStation from "@/modules/Station/DataTableStation";

const PointsDecharges = () => {
  const handleClick = () => alert("hello");
  return (
    <div className="w-full h-auto p-6">
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-[#212B36] text-xl">Charge Point</h2>
        <BoutonAdd action={handleClick} />
      </div>
      <DataTableStation />
    </div>
  );
};
export default PointsDecharges;
