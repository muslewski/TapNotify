"use client";

import logout from "@/actions/auth/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { reloadSession } from "@/lib/reload-session";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  User,
} from "@heroui/react";
import { useSession } from "next-auth/react";

export default function MyAccount() {
  const user = useCurrentUser(); // Client-side
  const { update } = useSession();

  // If user is not signed in, show Sign In button
  if (!user) {
    return (
      <Button as={Link} color="primary" variant="bordered" href="/sign-in">
        Sign In
      </Button>
    );
  }

  // If user is signed in, show Avatar dropdown
  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          classNames={{
            base: ["flex items-center gap-3 cursor-pointer"],
          }}
          avatarProps={{
            src: user.image ?? undefined,
            alt: user.name ?? "Avatar Image",
            showFallback: true,
            isBordered: true,
            size: "sm",
            color: "primary",
          }}
          name={user.name}
          description={<p className="text-primary">Manage Account</p>}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Menu">
        <DropdownItem
          key="logout"
          color="danger"
          onPress={() => {
            logout();
            update();
            reloadSession();
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
