"use client";

import MagicLink from "@/components/auth/magic-link";
import OAuth from "@/components/auth/oauth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

export default function LoginCard() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  return (
    <Card className="border-2 bg-gradient-to-tr from-card to-background">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-semibold">Let&apos;s Get Started</h2>
        <p className="text-sm text-muted-foreground">
          Pick a sign-in method that works best for you:
        </p>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 py-10 px-12">
        <OAuth callbackUrl={callbackUrl} />
      </CardContent>
      <Separator />
      <CardFooter className="space-y-6 py-10 px-12">
        <MagicLink callbackUrl={callbackUrl} />
      </CardFooter>
    </Card>
  );
}
