import React, { useMemo } from "react"
import { Label, Pie, PieChart } from "recharts"


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import ColorChartInformation from "@/components/ColorChartInformation";


export default function DonuteChart({chartConfig, chartData, label, value}) {
  const totalValue = useMemo(() => {
    return chartData.reduce((sum, data) => sum + data.visitors, 0);
  },[chartData]
  ) 
  return (
  <div className="w-full p-5 flex flex-col shadow-combined rounded-xl max-w-full ">
  <h1 className="text-[#212B36] font-bold ">{label}</h1>
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
          dataKey="visitors"
          nameKey="browser"
          innerRadius={50} // Radius fixe
          outerRadius={100} // Outer radius fixe également
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
                      {value}
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
