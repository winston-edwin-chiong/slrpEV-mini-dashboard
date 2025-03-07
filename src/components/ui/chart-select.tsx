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
import { ChartType } from "../awesome-chart";

export function ChartSelect({
  chart,
  onChartSelect,
}: {
  chart: ChartType;
  onChartSelect: (chart: ChartType) => void;
}) {
  return (
    <Select onValueChange={(value) => value !== "coming_soon" && onChartSelect(value as ChartType)} value={chart}>
      <SelectTrigger className="hover:bg-accent">
        <SelectValue placeholder="Select a chart!" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Charts!</SelectLabel>
          <SelectItem value="demand">{"Demand"}</SelectItem>
          <SelectItem disabled={true} value="coming_soon">{"More coming soon!"}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
