import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Clock, Gauge, Plug, UserRound, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mx-5 sm:mx-10 md:mx-20">
      <h1 className="mt-8 text-5xl md:text-7xl leading-relaxed uppercase font-extralight tracking-widest">
        <span>{"From 2020 to 2024 "}</span>
        <span className="group">
          <a
            target="_blank"
            href="https://sites.google.com/berkeley.edu/slrpev/about-slrpev"
          >
            <span className="transition-all duration-300 group-hover:opacity-60 text-blue-600 decoration-2">{"SLRP"}</span>
            <span className="transition-all duration-300 group-hover:opacity-60 text-yellow-600 decoration-2">{"EV"}</span>
          </a>
        </span>
        <span>{" delivered..."}</span>
      </h1>
      <div>
        <div className="mt-8 flex flex-row gap-8 flex-wrap items-center justify-center">
          <HomeCard
            icon={<UserRound className="w-10 h-10" strokeWidth={0.75} />}
            title="energy to"
            value="250+"
            footer="unique users"
          />
          <HomeCard
            icon={<Clock className="w-10 h-10" strokeWidth={0.75} />}
            title="total charging time of"
            value="740+"
            footer="days"
          />
          <HomeCard
            icon={<Plug className="w-10 h-10" strokeWidth={0.75} />}
            title="charging totaling"
            value="4300+"
            footer="sessions"
          />
          <HomeCard
            icon={<Zap className="w-10 h-10" strokeWidth={0.75} />}
            title="cumulative energy of"
            value="85000+"
            footer="kWh"
          />
          <HomeCard
            icon={<Gauge className="w-10 h-10" strokeWidth={0.75} />}
            title="cumulative range of"
            value="295000+"
            footer="e-miles"
          />
        </div>
      </div>
      <Link href="/charts" className="my-2 sm:my-4 transition-transform duration-300">
        <span className="group inline-flex hover:underline decoration-1 underline-offset-2 decoration-blue-600 transition-transform duration-300">
          {"See the data!"}
          <ChevronRight className="transition-transform duration-300 group-hover:translate-x-1"/>
        </span>
      </Link>
    </div>
  );
}

function HomeCard({
  icon,
  title,
  value,
  footer,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  footer: string;
}) {
  return (
    <Card className="flex flex-col items-center w-80">
      <CardHeader>
        <CardTitle className="flex flex-col items-center justify-center gap-2 font-extralight text-xl">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="font-extrabold tracking-widest text-5xl flex-grow flex items-center justify-center">
        <span>{value}</span>
      </CardContent>
      <CardFooter className="font-extralight text-xl">
        <span>{footer}</span>
      </CardFooter>
    </Card>
  );
}
