"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { GetChartData } from "@/lib/get-chart-data";
import ChartSettings from "./chart-settings";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { TooltipProps } from "recharts";

export type ChartUnit =
  | "energy_demand_kWh"
  | "avg_power_demand_kW"
  | "peak_power_kW";

export type ChartGranularity = "hourly" | "daily" | "monthly";

export type ChartType = "demand" | "coming soon!";

const defaultDateRanges: Record<ChartGranularity, DateRange> = {
  hourly: { from: new Date(2024, 4, 1), to: new Date(2024, 4, 5) },
  daily: { from: new Date(2024, 3, 14), to: new Date(2024, 4, 5) },
  monthly: { from: new Date(2022, 4, 5), to: new Date(2024, 4, 5) },
};

export const readableChartUnits: Record<ChartUnit, string> = {
  energy_demand_kWh: "Energy Demand (kWh)",
  avg_power_demand_kW: "Avg. Power Demand (kW)",
  peak_power_kW: "Peak Power (kW)",
};

const chartConfig = {
  energy_demand_kWh: {
    label: "Energy Demand (kWh)",
  },
  avg_power_demand_kW: {
    label: "Avg. Power Demand (kW)",
  },
  peak_power_kW: {
    label: "Peak Power (kW)",
  },
  time: {
    label: "Time",
  },
  day: {
    label: "Day",
  },
} satisfies ChartConfig;

export function AwesomeChart() {
  const [selectedUnit, setSelectedUnit] =
    useState<ChartUnit>("energy_demand_kWh");
  const [selectedGranularity, setSelectedGranularity] =
    useState<ChartGranularity>("daily");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(
    defaultDateRanges[selectedGranularity]
  );
  const [selectedChart, setSelectedChart] = useState<ChartType>("demand");

  const chartData = GetChartData({
    startDate: selectedDateRange.from as Date,
    endDate: selectedDateRange.to as Date,
    granularity: selectedGranularity,
    chartType: selectedChart,
  });

  return (
    <>
      <div>
        <ChartSettings
          onDateSelect={setSelectedDateRange}
          date={selectedDateRange}
          onUnitSelect={setSelectedUnit}
          unit={selectedUnit}
          onGranularitySelect={setSelectedGranularity}
          granularity={selectedGranularity}
          onChartSelect={setSelectedChart}
          chart={selectedChart}
          className="mr-2 md:mr-10 my-5 p-4"
        />
      </div>
      <div>
        <Card className="bg-primary-foreground">
          <CardHeader>
            <CardTitle className="font-light text-lg">{`${selectedGranularity.toLocaleUpperCase()} ${selectedChart.toLocaleUpperCase()}`}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="">
            <ChartContainer config={chartConfig} className="w-full max-h-100">
              <AreaChart accessibilityLayer data={chartData} className="">
                <CartesianGrid />
                <XAxis
                  dataKey="time"
                  tickFormatter={(value: string) => {
                    if (selectedGranularity === "hourly") {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      });
                    }
                    return value;
                  }}
                />
                <YAxis
                  dataKey={selectedUnit}
                  label={{
                    value: readableChartUnits[selectedUnit],
                    angle: -90,
                    dx: -20,
                  }}
                  padding={{ top: 20 }}
                />
                <ChartTooltip cursor={true} content={CustomTooltip} />
                <Area
                  dataKey={selectedUnit}
                  fill={`var(--chart-1)`}
                  stroke={`var(--chart-1)`}
                  fillOpacity={0.35}
                />
                <Area dataKey="day" stroke={`oklch(0, 0, 0, 0)`} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-foreground p-3 border border-primary-accent">
        <p className="font-semibold underline underline-offset-2 decoration-blue-600">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="my-0.5">
            <span className="capitalize">
              {`${
                readableChartUnits[entry.name as ChartUnit] ??
                (entry.name as string)
              }: `}
            </span>
            <span className="font-semibold">{`${(entry.value as number).toLocaleString()}`}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export type EVData = {
  sch_centsPerHr: number //
  vehicle_model: string //
  Duration: string //
  startChargeTime: string //
  choice: string //
  cumEnergy_Wh: number  //
  reg_centsPerHr: number //
  energyReq_Wh: string //
  finishChargeTime: string //
  Overstay: string //
}
