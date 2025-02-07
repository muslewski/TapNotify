"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface HeadingProps {
  title: string;
  description: string;
  redirect?: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
}

export default function Heading({
  title,
  description,
  redirect,
}: HeadingProps) {
  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {redirect && (
          <Button className="bg-foreground hover:bg-muted-foreground" asChild>
            <Link href={redirect.href}>
              <redirect.icon className="mr-2 h-4 w-4" />
              {redirect.label}
            </Link>
          </Button>
        )}
      </div>
      <Separator />
    </>
  );
}
