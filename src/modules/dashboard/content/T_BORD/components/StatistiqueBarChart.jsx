import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import ColorChartInformation from "@/components/ColorChartInformation";
import { useEffect, useState } from "react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "Juillet", desktop: 186 },
  { month: "Aout", desktop: 305 },
  { month: "Septembre", desktop: 237 },
  { month: "Octobre", desktop: 73 },
  { month: "Novembre", desktop: 209 },
  { month: "Decembre", desktop: 214 },
];
const dataUpdate = chartData.map(data => ({
  ...data, 
  desktop : data.desktop + 10,
}))
const dataOld= chartData.map(data => ({
  ...data, 
  desktop : data.desktop / 5 * 9,
}))

const statiStiqueConfig = {
  oldvalue : {
    label : "Statistique ancien",
    color : "#F29F05"
  },
  currentValue : {
    label : "Statistique actuel",
    color : "#3D9DF2"
  },
  barconfig : {
    label : "Valeur exact actuel",
    color : "#F2505D"
  }
}

export default function StatistiqueBarChart() {
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
        <h2 className="text-[#212B36] font-bold ">Bar Chart Test</h2>
        <p>Un petit description</p>
      </div>
      <div>
        <Calendar />
      </div>
    </div>
    <ColorChartInformation config={statiStiqueConfig} padding="0" position="end" className="pr-9"/>
    <CardContent>
      <div className="w-full ">
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={chartData}>
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
              tickCount={10}
              domain={[0, "dataMax + 20"]}
              scale="linear"
            />
            <Tooltip cursor={false} />
            <Bar
              dataKey="desktop" 
              fill="#F2505D" 
              barSize={8} 
              radius={3}
            />
            <Area 
              type="monotone"
              data={dataUpdate}
              dataKey="desktop"
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
