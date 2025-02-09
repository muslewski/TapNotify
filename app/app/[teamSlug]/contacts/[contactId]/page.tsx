import { getPhoneNumberByPhoneId } from "@/actions/contacts";
import ContactForm from "@/app/app/[teamSlug]/contacts/[contactId]/_components/contact-form";
// import ContactForm from "@/app/app/[teamSlug]/contacts/[phoneId]/_components/contact-form";
import Container from "@/app/app/_components/container";

export default async function AddContactPage({
  params,
}: {
  params: Promise<{ teamSlug: string; contactId: string }>;
}) {
  const { contactId } = await params;

  const contact = await getPhoneNumberByPhoneId(contactId);

  return (
    <Container>
      <ContactForm initialData={contact ?? undefined} />
    </Container>
  );
}
