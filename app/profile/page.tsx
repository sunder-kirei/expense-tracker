"use client";

import { Loader } from "@/components/layout/Loader";
import UserAvatar from "@/components/layout/nav/UserAvatar";
import { useGetUserQuery } from "@/store/services/api";
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
