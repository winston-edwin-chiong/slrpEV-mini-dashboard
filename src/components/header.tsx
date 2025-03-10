"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathName = usePathname();
  return (
    <header className="flex flex-row mx-5 md:mx-10 my-2 md:my-5 font-light text-[12px] sm:text-[16px] md:text-lg">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className={cn(
              pathName == "/"
                ? "underline decoration-blue-600"
                : "",
              "hover:underline hover:font-medium decoration-blue-600 decoration-2 underline-offset-4 opacity-70 hover:opacity-100 transition-all duration-300"
            )}
          >
            HOME
          </Link>
          <Link
            href="/charts"
            className={cn(
              pathName == "/charts"
                ? "underline decoration-blue-600"
                : "",
              "hover:underline hover:font-medium decoration-blue-600 decoration-2 underline-offset-4 opacity-70 hover:opacity-100 transition-all duration-300"
            )}
          >
            CHARTS
          </Link>
          <Link
            href="/datatable"
            className={cn(
              pathName == "/datatable"
                ? "underline decoration-blue-600"
                : "",
              "hover:underline hover:font-medium decoration-blue-600 decoration-2 underline-offset-4 opacity-70 hover:opacity-100 transition-all duration-300"
            )}
          >
            DATA
          </Link>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
