import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function NoData({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <div
      className={cn(
        "w-full h-full bg-foreground/10 p-4 grid place-items-center text-4xl rounded-md aspect-square",
        className
      )}
      {...props}
    >
      no data 🫠
    </div>
  );
}
