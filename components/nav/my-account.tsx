"use client";

import logout from "@/actions/auth/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { reloadSession } from "@/lib/reload-session";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MyAccountProps {
  alignContent?: "start" | "end" | "center";
}

export default function MyAccount({ alignContent = "end" }: MyAccountProps) {
  const user = useCurrentUser(); // Client-side
  const { update } = useSession();

  // If user is not signed in, show Sign In button
  if (!user) {
    return (
      <Button variant="outline" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    );
  }

  // If user is signed in, show Avatar dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name ?? "User avatar"}
            />
            <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align={alignContent} forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/user/${user.id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/">Home Website</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-warning"
          onSelect={() => {
            logout();
            update();
            reloadSession();
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
