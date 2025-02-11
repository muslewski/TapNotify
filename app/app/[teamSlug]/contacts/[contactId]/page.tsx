import {
  checkIfContactBelongsToTeam,
  getContactByContactId,
} from "@/actions/database/contacts";
import ContactForm from "@/app/app/[teamSlug]/contacts/[contactId]/_components/contact-form";
import Container from "@/app/app/_components/container";
import NotFound from "@/app/app/_components/not-found";

export default async function AddContactPage({
  params,
}: {
  params: Promise<{ teamSlug: string; contactId: string }>;
}) {
  const { contactId, teamSlug } = await params;

  const contact = await getContactByContactId(contactId);

  // If contact is not found and contactId is not "add", show 404
  if (!contact && contactId !== "add") {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  // Check if contact belongs to the team
  if (
    !(await checkIfContactBelongsToTeam(contactId, teamSlug)) &&
    contactId !== "add"
  ) {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  return (
    <Container>
      <ContactForm initialData={contact ?? undefined} />
    </Container>
  );
}
