export default async function AccountSections({
  params,
}: {
  params: Promise<{
    sectionSlug: string;
  }>;
}) {
  const { sectionSlug } = await params;
  return <div>Account Sections for {sectionSlug}</div>;
}
