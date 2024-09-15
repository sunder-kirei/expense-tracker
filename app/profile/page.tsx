"use client";

import UserAvatar from "@/components/layout/nav/UserAvatar";
import { Page } from "@/components/layout/Page";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserQuery } from "@/store/services/api";
import { EditUserForm } from "./components/EditUserForm";

export default function ProfilePage() {
  const { data: user } = useGetUserQuery();

  return (
    <Page>
      <div className="w-full h-full p-4 flex flex-col gap-y-16 items-center">
        {!user ? (
          <>
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-72 w-64" />
          </>
        ) : (
          <>
            <UserAvatar
              userImage={user.image ?? undefined}
              username={user.name ?? undefined}
              className="h-32 w-32  ring-4 ring-accent border-none"
            />
            <EditUserForm user={user} />
          </>
        )}
      </div>
    </Page>
  );
}
