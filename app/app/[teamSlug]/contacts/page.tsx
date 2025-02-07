"use client";

import { use } from "react";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";
import { PlusIcon } from "lucide-react";

export default function ContactsPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = use(params);
  console.log(teamSlug);

  return (
    <Container>
      <Heading
        title={`Contacts (${0})`}
        description="Manage your contacts"
        redirect={{
          label: "Add Contact",
          href: `/app/${teamSlug}/contacts/add`,
          icon: PlusIcon,
        }}
      />
    </Container>
  );
}
