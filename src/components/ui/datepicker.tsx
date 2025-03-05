import { Input } from "./input"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import React, { useState } from "react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Calendar } from "./calendar"

export function DatePicker({ date, setDate } : { date: Date, setDate: (date: Date) => void }) {
    const [stringDate, setStringDate] = useState<string>(format(date, "MM/dd/yyyy"))
    const [errorMessage, setErrorMessage] = useState<string>("")
  
    return (
      <Popover>
        <div className="relative w-[280px]">
          <Input
            type="string"
            value={stringDate}
            onChange={(e) => {
              setStringDate(e.target.value)
              const parsedDate = new Date(e.target.value)
              if (parsedDate.toString() === "Invalid Date") {
                setErrorMessage("Invalid Date")
              } else {
                setErrorMessage("")
                setDate(parsedDate)
              }
            }}
          />
          {errorMessage !== "" && (
            <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
              {errorMessage}
            </div>
          )}
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (!selectedDate) return
              setDate(selectedDate)
              setStringDate(format(selectedDate, "MM/dd/yyyy"))
              setErrorMessage("")
            }}
            defaultMonth={date}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }