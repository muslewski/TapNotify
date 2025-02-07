"use client";

import { use } from "react";

import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";

export default function AddContactPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = use(params);
  console.log(teamSlug);

  return (
    <Container>
      <Heading title="Add Contact" description="Create a new contact" />
    </Container>
  );
}
