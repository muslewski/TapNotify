"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaGoogle, FaFacebookF, FaGithub, FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

interface OAuthProps {
  callbackUrl: string;
}

interface Provider {
  id: "google" | "facebook" | "apple" | "twitter" | "github" | "discord";
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const providers: Provider[] = [
  {
    id: "google",
    label: "Google",
    description: "Knows more about you than your best friend.",
    icon: FaGoogle,
  },
  {
    id: "facebook",
    label: "Facebook",
    description: "Where you stay connected… and overshare.",
    icon: FaFacebookF,
  },
  {
    id: "twitter",
    label: "Twitter",
    description: "Where 280 characters change the world.",
    icon: BsTwitterX,
  },
  {
    id: "github",
    label: "Github",
    description: "A home for code and the occasional merge conflict.",
    icon: FaGithub,
  },
  {
    id: "discord",
    label: "Discord",
    description: "Server surfing simulator.",
    icon: FaDiscord,
  },
];

export default function OAuth({ callbackUrl }: OAuthProps) {
  const handleSignIn = (provider: Provider["id"]) => {
    signIn(provider, {
      redirectTo: callbackUrl,
    });
  };

  return (
    <TooltipProvider delayDuration={50}>
      <div className="flex gap-6 flex-wrap justify-start max-w-xs w-fit-content">
        {providers.map((provider) => {
          const Icon = provider.icon;

          return (
            <Tooltip key={provider.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSignIn(provider.id)}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                color="primary"
                className="p-2 rounded-lg bg-primary text-primary-foreground text text-sm"
              >
                <p>{provider.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
