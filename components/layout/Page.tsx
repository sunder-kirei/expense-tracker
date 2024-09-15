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
        "min-h-screen h-fit w-full flex flex-col overflow-hidden scrollbar-thin scrollbar-track-background scrollbar-thumb-border scrollbar-thumb-rounded-full",
        "p-4 sm:pt-20 sm:pl-52 relative",
        className
      )}
      {...props}
    >
      <Path className="mb-2" />
      {children}
    </section>
  );
}
