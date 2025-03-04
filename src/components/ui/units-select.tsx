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
import { ChartUnit } from "../awesome-chart";

export function UnitsSelect({
  unit,
  onUnitSelect,
}: {
  unit: ChartUnit;
  onUnitSelect: (unit: ChartUnit) => void;
}) {
  return (
    <Select onValueChange={onUnitSelect} value={unit}>
      <SelectTrigger>
        <SelectValue placeholder="Select a unit!" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Units</SelectLabel>
          <SelectItem value="avg_power_demand_kW">
            {"Avg. Power Demand (kw)"}
          </SelectItem>
          <SelectItem value="energy_demand_kWh">
            {"Energy Demand (kwH)"}
          </SelectItem>
          <SelectItem value="peak_power_kW">{"Peak Power (kW)"}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
