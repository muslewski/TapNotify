"use client";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";
import { PlusIcon } from "lucide-react";
import { use } from "react";

export default function CampaignsPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = use(params);

  return (
    <Container>
      <Heading
        title={`Campaigns (${0})`}
        description="List of your campaigns"
        redirect={{
          label: "Create New",
          href: `/app/${teamSlug}/campaigns/create`,
          icon: PlusIcon,
        }}
      />
    </Container>
  );
}
