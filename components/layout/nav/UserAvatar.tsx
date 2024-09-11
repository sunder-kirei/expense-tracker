import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

interface Props extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  userImage: string | undefined;
  username: string | undefined;
}

export default function UserAvatar({
  userImage,
  username,
  className,
  ...props
}: Props) {
  return (
    <Avatar className={cn("border cursor-pointer", className)} {...props}>
      <AvatarImage src={userImage} />
      <AvatarFallback className="uppercase">
        {username
          ?.split(" ")
          ?.map((seg) => seg[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}
