import CalendarFilterDay from "../../component/CalendarFilterDay";
import CalendarFilterMonth from "../../component/CalendarFilterMonth";
import CalendarFilterYear from "../../component/CalendarFilterYear";
import BoxSection from "./components/BoxSection";
import ChartSection from "./components/ChartSection";

const TableauDeBord = ({ setSection }) => {
  return (
    <div className="w-full h-auto p-6">
      <h2 className="text-[24px] text-[#212B36] mb-12">
        Accueil/Tableau de bord
      </h2>
      <div className="flex items-center justify-start gap-2 mb-4">
        <p className="text-gray-600"><span className="underline">Filtrer </span> :</p>
        <div className="flex items-center justify-center gap-2">
          <div>
            <CalendarFilterDay />
          </div>
          <div>
            <CalendarFilterMonth />
          </div>
          <div>
            <CalendarFilterYear />
          </div>
        </div>
      </div>
      <BoxSection setSection={setSection} />
      <ChartSection />
    </div>
  );
};

export default TableauDeBord;
