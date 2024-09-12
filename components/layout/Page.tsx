import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Path } from "./Path";

export function Page({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={twMerge(
        "h-full w-full flex flex-col overflow-hidden scrollbar-thin scrollbar-track-background scrollbar-thumb-border scrollbar-thumb-rounded-full",
        className
      )}
      {...props}
    >
      <Path className="mb-2" />
      {children}
    </section>
  );
}
