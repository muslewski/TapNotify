"use client";

import { use } from "react";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";
import UnderDevelopment from "@/app/app/_components/under-development";
import { KeyIcon } from "lucide-react";

export default function ApiKeysPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = use(params);
  console.log(teamSlug);

  return (
    <Container>
      <Heading
        title="API Keys"
        mainIcon={KeyIcon}
        description="Manage your API credentials"
      />
      <UnderDevelopment />
    </Container>
  );
}
