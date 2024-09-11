import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

export async function UserBadge() {
  const session = await auth();

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar
          userImage={session.user?.image ?? undefined}
          username={session.user?.name ?? undefined}
        />
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
