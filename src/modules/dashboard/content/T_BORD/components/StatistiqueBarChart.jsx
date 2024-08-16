import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis, Tooltip, Area } from "recharts";
import { CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

export default function StatistiqueBarChart() {
  return (
    <div className="shadow-combined bg-[#ffffff] rounded-xl w-full">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h2>Bar Chart Test</h2>
          <p>Un petit description</p>
        </div>
        <div>
          <Calendar />
        </div>
      </div>
      <CardContent>
        <ComposedChart width={577} className="w-full " height={300} data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickCount={10}
            domain={[0, "dataMax + 20"]}
            scale="linear"
          />
          <Tooltip cursor={false} />
          {/* Afficher la zone en premier pour la placer derrière les barres */}
          <Area 
            type="monotone"
            dataKey="desktop"
            stroke="#3D9DF2"
            strokeWidth={4}
            fill="rgba(242, 80, 93, 0.2)"
            dot={false} 
          />
          {/* Ensuite les barres pour qu'elles soient devant */}
          <Bar 
            dataKey="desktop" 
            fill="#F2505D" 
            barSize={20}  // Augmenter la taille des barres pour mieux les distinguer
            radius={3}  // Ajuster le rayon pour les rendre moins pointues
          />
        </ComposedChart>
      </CardContent>
    </div>
  );
}
