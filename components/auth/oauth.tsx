"use client";

import { signIn } from "next-auth/react";
import { Tooltip, Button, ButtonGroup } from "@heroui/react";
import { FaGoogle, FaFacebookF, FaGithub, FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import TooltipContent from "@/components/ui/tooltip-content";

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
    <ButtonGroup>
      {providers.map((provider) => {
        const Icon = provider.icon;

        return (
          <Tooltip
            key={provider.id}
            placement="bottom"
            className="bg-gradient-to-tr from-primary-300/20 backdrop-blur-sm border border-primary-50/75"
            content={
              <TooltipContent
                label={provider.label}
                description={provider.description}
              />
            }
          >
            <Button onPress={() => handleSignIn(provider.id)}>
              <Icon className="size-4" />
            </Button>
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
}
