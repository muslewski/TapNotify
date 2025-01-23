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
} from "@heroui/react";
import { useSession } from "next-auth/react";

export default function MyAccount() {
  const user = useCurrentUser(); // Client-side
  const { update } = useSession();

  if (!user) {
    return (
      <Button as={Link} color="primary" variant="bordered" href="/sign-in">
        Sign In
      </Button>
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          color="primary"
          isBordered
          src={user.image ?? undefined}
          showFallback
          alt={user.name || "Avatar Image"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
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
