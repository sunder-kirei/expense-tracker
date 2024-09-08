import {
  House,
  Bug,
  Kanban,
  Library,
  ChartNoAxesCombined,
  UsersRound,
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
      <NavTile href="/">
        <House className="nav-tile__leading" />
        Home
      </NavTile>
      {/* Table of all the issues in the selected project */}
      <NavTile href="/issues">
        <Bug className="nav-tile__leading" />
        Issues
      </NavTile>
      {/* drag-n-drop interface for your issues to change issue status */}
      <NavTile href="/kanban">
        <Kanban className="nav-tile__leading" />
        Kanban
      </NavTile>
      {/* list all projects with their overview */}
      <NavTile href="/projects">
        <Library className="nav-tile__leading" />
        Projects
      </NavTile>
      {/* charts for everything */}
      <NavTile href="/analytics">
        <ChartNoAxesCombined className="nav-tile__leading" />
        Analytics
      </NavTile>
      {/* people tab */}
      <NavTile href="/people">
        <UsersRound className="nav-tile__leading" />
        People
      </NavTile>
    </nav>
  );
}
