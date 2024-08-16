import * as React from "react"
import { Label, Pie, PieChart } from "recharts"


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export default function DonuteChart({chartConfig, chartData, label, value}) {
  const totalValue = chartData.reduce((sum, data) => sum + data.visitors, 0);
  return (
    <div className="w-full p-5 flex flex-col shadow-combined rounded-xl max-w-full bg-[#ffffff]">
      <h1 className="">{label}</h1>
      <div className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={100}
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
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
          
        </ChartContainer>
      </div>
      <div className="w-full h-1px border-slate-300 p-3 flex items-center justify-start flex-wrap gap-4">
      {Object.entries(chartConfig).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center justify-start flex-wrap gap-1">
            <div className="p-1 rounded-sm" style={{ backgroundColor: color }}></div>
            <p className="text-simpleText text-[14px]">: {label}</p>
          </div>
      ))}
      </div>
      
    </div>
  )
}
