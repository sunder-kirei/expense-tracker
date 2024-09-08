import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export async function UserBadge() {
  const session = await auth();

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border cursor-pointer">
          <AvatarImage src={session.user?.image ?? undefined} />
          <AvatarFallback className="uppercase">
            {session.user?.name
              ?.split(" ")
              ?.map((seg) => seg[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <Link href="/api/auth/signout">Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/api/auth/signin">Sign in</Link>
  );
}
