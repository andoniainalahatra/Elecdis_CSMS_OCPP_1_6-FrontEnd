import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import ColorChartInformation from "@/components/ColorChartInformation";
import { useEffect, useMemo, useState } from "react";
import { usePercent } from "@/lib/hooks";


export default function StatistiqueBarChart({title, chartData, statiStiqueConfig}) {
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
    <div className="shadow-combined rounded-xl w-full h-full">
      <div className="flex justify-between w-full items-center px-6 py-5">
        <div>
          <h2 className="text-[#212B36] font-bold ">{title}</h2>
          <p className="text-[#637381] text-[14px]"><span className={`text-[${colorPercent}]`}>{percentVal}</span> que l'annees dernier</p>
        </div>
        <div>
          <Calendar />
        </div>
      </div>
      <ColorChartInformation config={statiStiqueConfig} padding="0" position="end" className="pl-6 pb-6 pr-7"/>
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
                fill="#F2505D" 
                barSize={8} 
                radius={3}
              />
              <Line
                type="monotone"
                dataKey="oldValue"
                stroke="#F29F05"
                strokeWidth={3}
                dot={false}

              />
              <Area 
                type="monotone"
                data={dataUpdate}
                dataKey="currentValue"
                stroke="#3D9DF2"
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
