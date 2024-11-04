import { useEffect, useMemo, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ColorChartInformation from "@/components/ColorChartInformation";

export default function DonuteChart({
  chartConfig,
  chartData = [],
  title,
  label,
}) {
  const totalValue = useMemo(() => {
    if (!chartData || chartData.length === 0) return 0;
    return chartData.reduce((sum, data) => sum + data.value, 0);
  }, [chartData]);

  const [radius, setRadius] = useState({ innerRadius: 20, outerRadius: 30 });

  useEffect(() => {
    // Fonction pour ajuster les rayons en fonction de la largeur de l'écran
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      // Calculer les valeurs de radius dynamiquement en fonction de la largeur de l'écran
      const dynamicInnerRadius = Math.max(50, screenWidth * 0.06); // 6% de la largeur de l'écran, avec un minimum de 50
      const dynamicOuterRadius = Math.max(60, screenWidth * 0.09); // 9% de la largeur de l'écran, avec un minimum de 60

      setRadius({
        innerRadius: dynamicInnerRadius,
        outerRadius: dynamicOuterRadius,
      });
    };

    // Appeler la fonction une première fois pour ajuster les valeurs dès le chargement
    handleResize();

    // Écouter les changements de taille de la fenêtre
    window.addEventListener("resize", handleResize);

    // Nettoyage de l'événement lors du démontage du composant
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-sm:w-full p-5 flex flex-col items-center shadow-combined rounded-xl h-full bg-white">
      {/* Titre */}
      <h1 className="text-[#212B36] font-bold text-center">{title}</h1>

      {/* Conteneur du graphique */}
      <div className="w-full flex justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className="mt-5 w-full max-w-full h-[50vh] max-sm:h-[40vh]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={radius.innerRadius}
              outerRadius={radius.outerRadius}
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
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      {/* Légende avec les couleurs */}
      <ColorChartInformation
        config={chartConfig}
        padding={0}
        className="mt-[.8vw]"
        position="center"
      />
    </div>
  );
}
