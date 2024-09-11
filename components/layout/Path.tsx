"use client";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Path({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const path = usePathname();
  const pathSansRoot = path?.split("/").slice(1);

  return (
    <Breadcrumb className={twMerge("capitalize", className)}>
      <BreadcrumbList>
        {pathSansRoot?.map((pathPart, idx) => (
          <React.Fragment key={pathPart}>
            {idx === pathSansRoot.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-primary">
                  {pathPart}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={"/" + pathSansRoot.slice(0, idx + 1).join("/")}
                    className="text-foreground hover:text-primary"
                  >
                    {pathPart}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
