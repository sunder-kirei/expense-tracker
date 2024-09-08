"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface NavTileProps {
  href: string;
}

function NavTile({
  className,
  ...props
}: HTMLAttributes<HTMLElement> & NavTileProps) {
  const path = usePathname();

  return (
    <Link
      {...props}
      className={twMerge(
        "flex p-4 gap-x-4 w-48 rounded-lg font-semibold",
        path === props.href ? "bg-muted" : "",
        className
      )}
    />
  );
}

export default NavTile;
