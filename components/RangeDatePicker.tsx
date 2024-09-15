"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";

interface Props {
  from: Date;
  to: Date;
  setFromDate: SelectSingleEventHandler;
  setToDate: SelectSingleEventHandler;
}

export function RangeDatePicker({ from, to, setFromDate, setToDate }: Props) {
  return (
    <div className="flex flex-row gap-2 items-center justify-center lg:justify-end">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-fit justify-start text-left font-normal",
              !from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? format(from, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={from}
            onSelect={setFromDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      -
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-fit justify-start text-left font-normal",
              !to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {to ? format(to, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={to}
            onSelect={setToDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
