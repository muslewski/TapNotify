"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Chrome,
  Facebook,
  Twitter,
  Github,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

interface OAuthProps {
  callbackUrl: string;
}

interface Provider {
  id: "google" | "facebook" | "apple" | "twitter" | "github" | "discord";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgHover: string;
}

const providers: Provider[] = [
  {
    id: "google",
    label: "Continue with Google",
    icon: Chrome,
    color: "text-red-500",
    bgHover: "hover:bg-red-50 dark:hover:bg-red-950/30",
  },
  {
    id: "facebook",
    label: "Continue with Facebook",
    icon: Facebook,
    color: "text-blue-600",
    bgHover: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
  },
  {
    id: "twitter",
    label: "Continue with Twitter",
    icon: Twitter,
    color: "text-sky-500",
    bgHover: "hover:bg-sky-50 dark:hover:bg-sky-950/30",
  },
  {
    id: "github",
    label: "Continue with GitHub",
    icon: Github,
    color: "text-gray-900 dark:text-gray-100",
    bgHover: "hover:bg-gray-50 dark:hover:bg-gray-800/30",
  },
  {
    id: "discord",
    label: "Continue with Discord",
    icon: MessageSquare,
    color: "text-indigo-500",
    bgHover: "hover:bg-indigo-50 dark:hover:bg-indigo-950/30",
  },
];

export default function OAuth({ callbackUrl }: OAuthProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: Provider["id"]) => {
    setIsLoading(provider);
    await signIn(provider, {
      callbackUrl,
    });
    setIsLoading(null);
  };

  return (
    <Card className="space-y-6 border-dashed border-muted b p-10">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Choose your preferred social account for secure sign-in experience.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {providers.map((provider, index) => {
          const Icon = provider.icon;
          const loading = isLoading === provider.id;

          return (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              className=" min-w-fit"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleSignIn(provider.id)}
                disabled={loading}
                className={`
                  w-[250px] h-11 
                  flex items-center justify-start gap-3
                  text-sm font-medium
                  transition-all duration-200
                  ${provider.bgHover}
                  hover:border-border/50
                  active:scale-[0.98]
                `}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Icon className={`h-5 w-5 ${provider.color} flex-shrink-0`} />
                )}
                <span className="text-foreground/80">{provider.label}</span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
