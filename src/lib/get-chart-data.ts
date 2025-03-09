import hourlydemand from "../../data/hourlydemand.json";
import dailydemand from "../../data/dailydemand.json";
import monthlydemand from "../../data/monthlydemand.json";
import { ChartGranularity, ChartType } from "@/components/awesome-chart";

interface DemandData {
  time: string;
  energy_demand_kWh: number;
  avg_power_demand_kW: number;
  peak_power_kW: number;
  day: string;
  month: string;
}
const hourlydemanddata = hourlydemand as DemandData[];
const dailydemanddata = dailydemand as DemandData[];
const monthlydemanddata = monthlydemand as DemandData[];

export function GetChartData({
  chartType,
  startDate,
  endDate,
  granularity,
}: {
  chartType: ChartType;
  startDate: Date;
  endDate: Date;
  granularity: ChartGranularity;
}) {
  let data;
  switch (chartType) {
    case "demand":
      switch (granularity) {
        case "hourly":
          data = hourlydemanddata.filter((item: { time: string }) => {
            return (
              new Date(item.time) >= startDate && new Date(item.time) <= endDate
            );
          });
          break;
        case "daily":
          data = dailydemanddata.filter((item: { time: string }) => {
            return (
              new Date(item.time) >= startDate && new Date(item.time) <= endDate
            );
          });
          break;

        case "monthly":
          data = monthlydemanddata.filter((item: { time: string }) => {
            return (
              new Date(item.time) >= startDate && new Date(item.time) <= endDate
            );
          });
          break;

        default:
          return [];
      }
      break;

    default:
      return [];
  }
  return data;
}
