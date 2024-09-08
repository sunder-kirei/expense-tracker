import {
  House,
  Bug,
  Kanban,
  Library,
  ChartNoAxesCombined,
  UsersRound,
  BadgeIndianRupee,
  Landmark,
} from "lucide-react";
import Link from "next/link";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import NavTile from "./NavTile";

export function VerticalNav({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <nav className={twMerge("sm:flex flex-col hidden", className)} {...props}>
      {/* show summary of all projects issue assigned to me and all projects issues in total, recently opened, analytics */}
      <NavTile href="/home">
        <House className="nav-tile__leading" />
        Home
      </NavTile>
      {/* Table of all the issues in the selected project */}
      <NavTile href="/transactions">
        <BadgeIndianRupee className="nav-tile__leading" />
        Transactions
      </NavTile>
      {/* drag-n-drop interface for your issues to change issue status */}
      <NavTile href="/accounts">
        <Landmark className="nav-tile__leading" />
        Accounts
      </NavTile>
      {/* charts for everything */}
      <NavTile href="/analytics">
        <ChartNoAxesCombined className="nav-tile__leading" />
        Analytics
      </NavTile>
      {/* people tab */}
      <NavTile href="/people">
        <UsersRound className="nav-tile__leading" />
        Profile
      </NavTile>
    </nav>
  );
}
