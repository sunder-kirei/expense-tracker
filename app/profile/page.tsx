"use client";

import { Loader } from "@/components/layout/Loader";
import UserAvatar from "@/components/layout/nav/UserAvatar";
import {
  TableHead,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PatchUserInterface, PatchUserSchema } from "@/schema/PatchUser.schema";
import { useGetUserQuery, usePatchUserMutation } from "@/store/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditUserForm } from "./components/EditUserForm";

export default function ProfilePage() {
  const { data: user } = useGetUserQuery();

  return !user ? (
    <Loader />
  ) : (
    <div className="w-full h-full p-4 flex flex-col gap-y-16 items-center">
      <UserAvatar
        userImage={user.image ?? undefined}
        username={user.name ?? undefined}
        className="h-32 w-32  ring-4 ring-accent border-none"
      />
      <EditUserForm user={user} />
    </div>
  );
}
