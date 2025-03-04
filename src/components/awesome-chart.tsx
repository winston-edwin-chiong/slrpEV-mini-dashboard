"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

const defaultDateRange = {
  from: new Date(2022, 0, 20),
  to: new Date(2022, 2, 20),
};

const chartConfig = {} satisfies ChartConfig;

export function AwesomeChart() {
  const [selectedDateRange, setSelectedDateRange] =
    useState<DateRange>(defaultDateRange);
  const [selectedUnit, setSelectedUnit] =
    useState<ChartUnit>("energy_demand_kWh");

  const chartData = GetChartData({
    startDate: selectedDateRange.from as Date,
    endDate: selectedDateRange.to as Date,
    granularity: "hourly",
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Area Chart - Linear</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" hideLabel />}
              />
              <Area dataKey={selectedUnit} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <ChartSettings
        onDateSelect={setSelectedDateRange}
        date={selectedDateRange}
        onUnitSelect={setSelectedUnit}
        unit={selectedUnit}
      />
    </>
  );
}
