import Container from "@/app/app/_components/container";
import ContactClient from "@/app/app/[teamSlug]/contacts/_components/client";
import { getContactsByTeamSlug } from "@/actions/database/contacts";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;

  const contacts = await getContactsByTeamSlug(teamSlug);

  return (
    <Container>
      <ContactClient initialData={contacts} />
    </Container>
  );
}
