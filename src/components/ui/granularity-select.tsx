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
import { ChartGranularity } from "../awesome-chart";

export function GranularitySelect({
  granularity,
  onGranularitySelect,
}: {
  granularity: ChartGranularity;
  onGranularitySelect: (unit: ChartGranularity) => void;
}) {
  return (
    <Select onValueChange={onGranularitySelect} value={granularity}>
      <SelectTrigger className="hover:bg-accent">
        <SelectValue placeholder="Select a granularity!" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Granularity</SelectLabel>
          <SelectItem value="monthly">{"Monthly"}</SelectItem>
          <SelectItem value="daily">{"Daily"}</SelectItem>
          <SelectItem value="hourly">{"Hourly"}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
