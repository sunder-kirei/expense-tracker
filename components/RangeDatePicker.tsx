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
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  from: Date;
  to: Date;
  setFromDate: SelectSingleEventHandler;
  setToDate: SelectSingleEventHandler;
  disabled?: boolean;
}

export function RangeDatePicker({
  from,
  to,
  setFromDate,
  setToDate,
  className,
  disabled = false,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        "flex flex-row gap-1 items-center justify-center md:justify-end",
        className
      )}
      {...props}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-fit justify-start text-left font-normal",
              !from && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{from ? format(from, "P") : "Pick a date"}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={from}
            onSelect={setFromDate}
            initialFocus
            disabled={disabled}
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
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{to ? format(to, "P") : "Pick a date"}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={to}
            onSelect={setToDate}
            initialFocus
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
