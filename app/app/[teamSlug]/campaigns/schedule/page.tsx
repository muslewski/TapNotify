"use client";

import { use } from "react";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";
import UnderDevelopment from "@/app/app/_components/under-development";

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
        title="Scheduled Campaigns"
        description="Manage your upcoming campaigns"
      />
      <UnderDevelopment />
    </Container>
  );
}
