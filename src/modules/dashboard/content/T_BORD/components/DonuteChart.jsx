import { useMemo } from "react"
import { Label, Pie, PieChart } from "recharts"


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import ColorChartInformation from "@/components/ColorChartInformation";
/**
 * Composant 'DonuteChart'
 * @param {string} title - titre de la graphique
 * @param {Object} chartConfig - un objet contient la configuration de la graphique comme : "{object : { label : <string>, color : "hexadecimalCode" }, object : { label : <string>, color : "hexadecimalCode" }, object : { label : <string>, color : "hexadecimalCode" }}"
 * @param {Object[]} chartData - tableau d'objet
 * @returns {JSX.Element} - return un tableau graphique contenant une courbe pour montrer la nouvelle valeur et une courbe pour montrer l'ancien valeur et un BarChart pour montrer la valeur exact de la nouvelle valeur
 */

export default function DonuteChart({chartConfig, chartData, title, label}) {
  const totalValue = useMemo(() => {
    return chartData.reduce((sum, data) => sum + data.value, 0);
  },[chartData]
  ) 
  return (
  <div className="w-full p-5 flex flex-col shadow-combined rounded-xl max-w-full bg-white max-sm:w-full ">
  <h1 className="text-[#212B36] font-bold ">{title}</h1>
  <div className="pb-0 h-auto w-full">
    <ChartContainer
      config={chartConfig}
      className="w-full mx-auto aspect-square max-h-full"
    >
      <PieChart width={300} height={300} className="mx-auto">
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="status"
          innerRadius={50}
          outerRadius={100}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalValue}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {label}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  </div>
  <ColorChartInformation config={chartConfig} padding={0} className="" position="start" />
</div>


  )
}
