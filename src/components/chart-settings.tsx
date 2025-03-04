"use client";

import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./ui/date-picker-with-range";
import { UnitsSelect } from "./ui/units-select";
import { ChartGranularity, ChartUnit } from "./awesome-chart";
import { GranularitySelect } from "./ui/granularity-select";
import { Button } from "./ui/button";

export default function ChartSettings({
  onDateSelect,
  onUnitSelect,
  onGranularitySelect,
  date,
  unit,
  granularity,
}: {
  onDateSelect: (dateRange: DateRange) => void;
  onUnitSelect: (unit: ChartUnit) => void;
  onGranularitySelect: (unit: ChartGranularity) => void;
  date: DateRange;
  unit: ChartUnit;
  granularity: ChartGranularity;
}) {
  return (
    <div>
      <DatePickerWithRange onDateSelect={onDateSelect} date={date} />
      <UnitsSelect onUnitSelect={onUnitSelect} unit={unit} />
      <GranularitySelect
        onGranularitySelect={onGranularitySelect}
        granularity={granularity}
      />
      {["2020", "2021", "2022", "2023", "2024"].map((year) => (
        <Button
          onClick={() =>
            onDateSelect({
              from: new Date(`${year}-01-01`),
              to: new Date(`${year}-12-31`),
            })
          }
          key={year}
          variant={"outline"}
        >
          {year}
        </Button>
      ))}
    </div>
  );
}
