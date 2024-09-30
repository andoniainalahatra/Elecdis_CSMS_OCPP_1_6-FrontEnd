import { dataHeures } from "@/_mock/DataSimulateForHeur";

import AverageCharge from "./AverageCharge";
import SessionBarChart from "./SessionBarChart";

export default function SessionChart() {
  
  const sessionConfig = {
    nombreSession: {
      label: "nombre de session",
      color: "#F2505D",
    },
    sessionMoyen: {
      label: "session moyenne",
      color: "#26BF78",
    },
  };
  const chartData = dataHeures;
  return (
    <div className="grid max-sm:grid-cols-1 max-sm:place-items-center grid-cols-3 gap-6 w-full my-5">
        <AverageCharge minSession={15} maxSession={120} averageSession={60} />
        <SessionBarChart sessionConfig={sessionConfig} data={chartData} />
    </div>
  );
}
