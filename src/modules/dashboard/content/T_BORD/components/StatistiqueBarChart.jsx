import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import ColorChartInformation from "@/components/ColorChartInformation";
import { useEffect, useMemo, useState } from "react";
import { usePercent } from "@/lib/hooks";
import ButtonFilter from "./ButtonFilter";

/**
 * Composant 'StatistiqueBarChart'
 * @param {string} title - titre de la graphique
 * @param {Object} statiStiqueConfig - un objet contient la configuration de la graphique comme : "{oldvalue : { label : "", color : "hexadecimalCode" }, currentValue : { label : "", color : "hexadecimalCode" }, barconfig : { label : "", color : "hexadecimalCode" }}"
 * @param {Object[]} chartData - tableau d'objet qui doit avoir une propriete "currentValue" pour les nouveaux données et "oldValue" pour les ancien données comme : [
    { month: "January", currentValue: 186, oldValue : 362}, ... ],
 * @returns {JSX.Element} - return un tableau graphique contenant une courbe pour montrer la nouvelle valeur et une courbe pour montrer l'ancien valeur et un BarChart pour montrer la valeur exact de la nouvelle valeur
 */
const filter = ["Mensuel", "Trimestriel", "Semestriel", "Annuel"]
export default function StatistiqueBarChart({title, chartData, statiStiqueConfig}) {
  const { oldvalue, currentValue, barconfig } = statiStiqueConfig
  const { percentVal, colorPercent } = usePercent(chartData)
  const dataUpdate = useMemo(() => {
   return chartData.map(data => ({
      ...data, 
      currentValue : data.currentValue + 10,
    }))
  }, [chartData]);
  const [tickLength, setTickLength] = useState(3);
  useEffect(() => {
    const updateTickLength = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 500) {
        setTickLength(1);
      } else if (screenWidth <= 768) {
        setTickLength(2);
      } else if (screenWidth <= 1366) {
        setTickLength(3);
      } else {
        setTickLength(4); 
      }
    
    };

    updateTickLength(); 
    window.addEventListener('resize', updateTickLength);

    
    return () => window.removeEventListener('resize', updateTickLength);
  }, []);
  return (
    <div className="shadow-combined rounded-xl w-full h-full bg-white">
      <div className="flex justify-between w-full items-center flex-wrap px-6 py-5">
        <div>
          <h2 className="text-[#212B36] font-bold ">{title}</h2>
          <p className="text-[#637381] text-[14px]"><span className={`text-[${colorPercent}]`}>{percentVal}</span> que l'annees dernier</p>
        </div>
        <div className="flex justify-between items-center w-[120px]">
          <ButtonFilter listFilter={filter} />
          <Calendar />
        </div>
      </div>
      <ColorChartInformation config={statiStiqueConfig} padding="0" position="center" className="pl-6 pb-6 pr-7"/>
      <CardContent>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={chartData} >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, tickLength)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickCount={6} // Ajustez ceci en fonction de la hauteur de votre graphique et de l'incrément souhaité
                domain={[0, 500]} // Définissez le domaine jusqu'à la valeur maximale désirée
                interval={0} // Ajoutez cette ligne pour forcer l'affichage de tous les ticks
                scale="linear"
              />
              <Tooltip cursor={false} />
              <Bar
                dataKey="currentValue" 
                fill={barconfig.color} 
                barSize={8} 
                radius={3}
              />
              <Line
                type="monotone"
                dataKey="oldValue"
                stroke={oldvalue.color}
                strokeWidth={3}
                dot={false}

              />
              <Area 
                type="monotone"
                data={dataUpdate}
                dataKey="currentValue"
                stroke={currentValue.color}
                strokeWidth={3}
                fill="rgba(242, 80, 93, 0.2)"
                dot={false} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
  </div>
  
  );
}
