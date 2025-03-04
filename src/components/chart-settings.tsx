"use client";

import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./ui/date-picker-with-range";
import { UnitsSelect } from "./ui/units-select";
import { ChartUnit } from "./awesome-chart";

export default function ChartSettings({
  onDateSelect,
  onUnitSelect,
  date,
  unit,
}: {
  onDateSelect: (dateRange: DateRange) => void;
  onUnitSelect: (unit: ChartUnit) => void;
  date: DateRange;
    unit: ChartUnit;
}) {
  return (
    <div>
      <DatePickerWithRange onDateSelect={onDateSelect} date={date} />
      <UnitsSelect onUnitSelect={onUnitSelect} unit={unit}/>
    </div>
  );
}
