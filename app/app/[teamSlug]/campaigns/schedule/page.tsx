"use client";

import { use } from "react";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";
import UnderDevelopment from "@/app/app/_components/under-development";
import { CalendarDays } from "lucide-react";

export default function ScheduledCampaignsPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = use(params);
  console.log(teamSlug);

  return (
    <Container>
      <Heading
        mainIcon={CalendarDays}
        title="Scheduled Campaigns"
        description="View and manage campaigns that are set to send later."
      />
      <UnderDevelopment />
    </Container>
  );
}
