"use client";

import { DateRange } from "react-day-picker";
import { UnitsSelect } from "./ui/units-select";
import { ChartGranularity, ChartType, ChartUnit } from "./awesome-chart";
import { GranularitySelect } from "./ui/granularity-select";
import { CalendarDatePicker } from "./ui/calendar-date-picker";
import { ChartSelect } from "./ui/chart-select";
import React from "react";
import { cn } from "@/lib/utils";

export default function ChartSettings({
  onDateSelect,
  onUnitSelect,
  onGranularitySelect,
  onChartSelect,
  date,
  unit,
  granularity,
  chart,
  className
}: {
  onDateSelect: (dateRange: DateRange) => void;
  onUnitSelect: (unit: ChartUnit) => void;
  onGranularitySelect: (unit: ChartGranularity) => void;
  onChartSelect: (chart: ChartType) => void;
  date: DateRange;
  unit: ChartUnit;
  granularity: ChartGranularity;
  chart: ChartType;
  className?: string;
}) {
  return (
    <div className={cn(className, "flex flex-col gap-4")}>
      <div className="flex flex-wrap gap-4 justify-center">
        <GranularitySelect
          onGranularitySelect={onGranularitySelect}
          granularity={granularity}
        />
        <ChartSelect chart={chart} onChartSelect={onChartSelect} />
        <UnitsSelect onUnitSelect={onUnitSelect} unit={unit} />
      </div>
      <CalendarDatePicker onDateSelect={onDateSelect} date={date} variant={"outline"}/>
    </div>
  );
}
