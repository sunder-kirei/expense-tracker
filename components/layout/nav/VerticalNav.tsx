import {
  BadgeIndianRupee,
  ChartNoAxesCombined,
  House,
  Landmark,
  UsersRound,
} from "lucide-react";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import NavTile from "./NavTile";

export function VerticalNav({
  className,
  onClick,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <nav className={twMerge("sm:flex flex-col hidden", className)} {...props}>
      {/* show summary of all projects issue assigned to me and all projects issues in total, recently opened, analytics */}
      <NavTile href="/home" onClick={onClick}>
        <House className="nav-tile__leading" />
        Home
      </NavTile>
      {/* Table of all the issues in the selected project */}
      <NavTile href="/transactions" onClick={onClick}>
        <BadgeIndianRupee className="nav-tile__leading" />
        Transactions
      </NavTile>
      {/* drag-n-drop interface for your issues to change issue status */}
      <NavTile href="/accounts" onClick={onClick}>
        <Landmark className="nav-tile__leading" />
        Accounts
      </NavTile>
      {/* people tab */}
      <NavTile href="/profile" className="mt-auto" onClick={onClick}>
        <UsersRound className="nav-tile__leading" />
        Profile
      </NavTile>
    </nav>
  );
}
