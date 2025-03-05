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
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GetChartData } from "@/lib/get-chart-data";
import ChartSettings from "./chart-settings";
import { useState } from "react";
import { DateRange } from "react-day-picker";

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

const chartConfig = {} satisfies ChartConfig;

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
  });

  const handleSelectDateRange = (dateRange: DateRange) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneYear = 365 * oneDay;
    if (
      dateRange.to &&
      dateRange.from &&
      Math.abs(dateRange.to.getTime() - dateRange.from.getTime()) < oneDay
    ) {
      setSelectedGranularity("hourly");
    } else if (
      dateRange.to &&
      dateRange.from &&
      Math.abs(dateRange.to.getTime() - dateRange.from.getTime()) < oneYear
    ) {
      setSelectedGranularity("monthly");
    }
    setSelectedDateRange(dateRange);
  };

  return (
    <div className="flex flex-col mx-4 mb-10 sm:mx-0">
      <div>
        <ChartSettings
          onDateSelect={handleSelectDateRange}
          date={selectedDateRange}
          onUnitSelect={setSelectedUnit}
          unit={selectedUnit}
          onGranularitySelect={setSelectedGranularity}
          granularity={selectedGranularity}
          onChartSelect={setSelectedChart}
          chart={selectedChart}
          className="mx-10 my-5 p-4"
        />
      </div>
      <div>
        <Card className="py-4 md:py6 shadow-2xl">
          <CardHeader>
            <CardTitle>Area Chart - Linear</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="m-0">
            <ChartContainer config={chartConfig}>
              <AreaChart accessibilityLayer data={chartData}>
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
                    dx: -10,
                  }}
                  padding={{ top: 20 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area dataKey={selectedUnit} />
                <Area dataKey="time" />
                <Area dataKey="day" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
