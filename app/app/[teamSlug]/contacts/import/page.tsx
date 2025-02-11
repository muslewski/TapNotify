"use client";

import { use } from "react";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";
import UnderDevelopment from "@/app/app/_components/under-development";
import { ImportIcon } from "lucide-react";

export default function ImportContactsPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = use(params);
  console.log(teamSlug);

  return (
    <Container>
      <Heading
        title="Import Contacts"
        mainIcon={ImportIcon}
        description="Import your contacts from external sources"
      />
      <UnderDevelopment />
    </Container>
  );
}
