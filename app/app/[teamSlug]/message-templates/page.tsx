"use client";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";
import { PlusIcon } from "lucide-react";
import { use } from "react";

export default function MessageTemplatesPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = use(params);

  return (
    <Container>
      <Heading
        title={`Message Templates (${0})`}
        description="Manage your message templates"
        redirect={{
          label: "Create New",
          href: `/app/${teamSlug}/campaigns/message-templates/create`,
          icon: PlusIcon,
        }}
      />
    </Container>
  );
}
