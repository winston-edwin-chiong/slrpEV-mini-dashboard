import hourlydemand from "../../data/hourlydemand.json"
import dailydemand from "../../data/dailydemand.json"

export function GetChartData({startDate, endDate, granularity} : {startDate: Date, endDate: Date, granularity: "daily" | "hourly"}) {
    let data;
    switch (granularity) {
        case "daily":
            data = dailydemand.filter((item: {time: string}) => {
                return new Date(item.time) >= startDate && new Date(item.time) <= endDate;
            });
            break;
        case "hourly":
            data = hourlydemand.filter((item: {time: string}) => {
                return new Date(item.time) >= startDate && new Date(item.time) <= endDate;
            });
            break;
        
        default:
            return [];
        }
    return data;
}

