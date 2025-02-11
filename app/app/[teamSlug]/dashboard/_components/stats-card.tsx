"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export type StatsCardProps = {
  title: string;
  icon: React.ReactNode;
  value: number;
  subtitle: string;
  children?: React.ReactNode;
  onSeeAll?: () => void;
  buttonText?: string;
  showButton?: boolean;
};

export function StatsCard({
  title,
  icon,
  value,
  subtitle,
  children,
  onSeeAll,
  buttonText = `See all ${title.toLowerCase()}`,
  showButton = true,
}: StatsCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-3xl font-bold text-primary">{value}</div>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-4">{children}</div>
      </CardContent>
      {showButton && (
        <CardFooter className="mt-auto pt-6">
          <Button variant="outline" className="w-full" onClick={onSeeAll}>
            <span>{buttonText}</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
