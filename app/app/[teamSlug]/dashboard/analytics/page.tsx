"use client";

import { use } from "react";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";
import UnderDevelopment from "@/app/app/_components/under-development";
import { ChartSplineIcon } from "lucide-react";

export default function AnalyticsPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = use(params);
  console.log(teamSlug);

  return (
    <Container>
      <Heading
        title="Analytics"
        mainIcon={ChartSplineIcon}
        description="View detailed insights"
      />
      <UnderDevelopment />
    </Container>
  );
}
