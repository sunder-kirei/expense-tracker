"use client";

import { usePathname } from "next/navigation";

import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function Path({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const path = usePathname();
  const pathSansRoot = path?.split("/").slice(1);

  return (
    <Breadcrumb className={twMerge("capitalize", className)}>
      <BreadcrumbList>
        {pathSansRoot?.map((pathPart, idx) => (
          <React.Fragment key={pathPart}>
            <BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbLink
                href={"/" + pathSansRoot.slice(0, idx + 1).join("/")}
                className="text-foreground font-semibold hover:text-primary"
              >
                {pathPart}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
