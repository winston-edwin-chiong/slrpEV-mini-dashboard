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

const defaultDateRanges: Record<ChartGranularity, DateRange> = {
  hourly: { from: new Date(2022, 0, 1), to: new Date(2022, 0, 15) },
  daily: { from: new Date(2022, 0, 1), to: new Date(2022, 0, 31) },
  monthly: { from: new Date(2021, 0, 1), to: new Date(2022, 11, 1) },
};

const chartConfig = {} satisfies ChartConfig;

export function AwesomeChart() {
  const [selectedUnit, setSelectedUnit] =
    useState<ChartUnit>("energy_demand_kWh");
  const [selectedGranularity, setSelectedGranularity] =
    useState<ChartGranularity>("hourly");
  const [selectedDateRange, setSelectedDateRange] =
    useState<DateRange>(defaultDateRanges[selectedGranularity]);
  const [fromDate, setFromDate] = useState<Date>(defaultDateRanges[selectedGranularity].from as Date);
  const [toDate, setToDate] = useState<Date>(defaultDateRanges[selectedGranularity].to as Date);

  const chartData = GetChartData({
    startDate: selectedDateRange.from as Date,
    endDate: selectedDateRange.to as Date,
    granularity: selectedGranularity,
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
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" />
              <YAxis dataKey={selectedUnit} />
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
      <ChartSettings
        onDateSelect={setSelectedDateRange}
        date={selectedDateRange}
        onUnitSelect={setSelectedUnit}
        unit={selectedUnit}
        onGranularitySelect={setSelectedGranularity}
        granularity={selectedGranularity}
        onFromDateSelect={setFromDate}
        onToDateSelect={setToDate}
        fromDate={fromDate}
        toDate={toDate}
      />
    </>
  );
}
