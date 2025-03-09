import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartUnit, readableChartUnits } from "../awesome-chart";

export function UnitsSelect({
  unit,
  onUnitSelect,
}: {
  unit: ChartUnit;
  onUnitSelect: (unit: ChartUnit) => void;
}) {
  return (
    <Select onValueChange={onUnitSelect} value={unit}>
      <SelectTrigger className="hover:bg-accent">
        <SelectValue placeholder="Select a unit!" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Units</SelectLabel>
          {Object.entries(readableChartUnits).map(([unit, label]) => (
            <SelectItem value={unit} key={unit}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
