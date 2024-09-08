import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { UserBadge } from "./UserBadge";

export async function HorizontalNav({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={twMerge(
        "flex justify-between w-full py-4 px-8 text-xl h-16",
        className
      )}
      {...props}
    >
      <div className="flex gap-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full aspect-square"
        >
          <path d="m8 2 1.88 1.88" />
          <path d="M14.12 3.88 16 2" />
          <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
          <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
          <path d="M12 20v-9" />
          <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
          <path d="M6 13H2" />
          <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
          <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
          <path d="M22 13h-4" />
          <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
        </svg>
        <span className="text-nowrap">app_title</span>
      </div>
      <UserBadge />
    </nav>
  );
}
