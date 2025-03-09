"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { UnitsSelect } from "./ui/units-select";
import { ChartGranularity, ChartType, ChartUnit } from "./awesome-chart";
import { GranularitySelect } from "./ui/granularity-select";
import { CalendarDatePicker } from "./ui/calendar-date-picker";
import { ChartSelect } from "./ui/chart-select";
import { cn } from "@/lib/utils";
import { Settings, ChevronDown, ChevronUp } from "lucide-react";

export default function ChartSettings({
  onDateSelect,
  onUnitSelect,
  onGranularitySelect,
  onChartSelect,
  date,
  unit,
  granularity,
  chart,
  className,
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(className, "relative border border-primary-accent")}>
      <div
        className="absolute top-0 right-4 -translate-y-1/2 bg-background px-2 font-light cursor-pointer border hover:bg-accent transition-colors duration-150"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span>
          {isCollapsed ? (
            <ChevronDown size={20} strokeWidth={1} />
          ) : (
            <ChevronUp size={20} strokeWidth={1} />
          )}
        </span>
      </div>
      <div className="inline-flex items-center absolute top-0 left-4 -translate-y-1/2 bg-background px-2 font-light">
        <span className="mr-1">
          <Settings size={20} strokeWidth={0.75} />
        </span>
        <span>{"CHART SETTINGS"}</span>
      </div>
      <div
        className={cn(
          "relative flex flex-col gap-4 transition-all duration-150",
          isCollapsed
            ? "max-h-0 opacity-0 overflow-hidden"
            : "max-h-screen opacity-100"
        )}
      >
        <span className="font-extralight text-[14px] dark:font-thin">
          Granularity, Chart Type, Units
        </span>
        <div className="flex flex-wrap gap-4 justify-start">
          <GranularitySelect
            onGranularitySelect={onGranularitySelect}
            granularity={granularity}
          />
          <ChartSelect chart={chart} onChartSelect={onChartSelect} />
          <UnitsSelect onUnitSelect={onUnitSelect} unit={unit} />
        </div>
        <span className="font-extralight text-[14px] dark:font-thin">Dates</span>
        <CalendarDatePicker
          onGranularitySelect={onGranularitySelect}
          onDateSelect={onDateSelect}
          date={date}
          variant={"outline"}
          className="w-max"
        />
      </div>
    </div>
  );
}
