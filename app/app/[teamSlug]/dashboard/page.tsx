import DashboardClient from "@/app/app/[teamSlug]/dashboard/_components/client";
import Container from "@/app/app/_components/container";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;
  console.log(teamSlug);

  return (
    <Container>
      <DashboardClient />
    </Container>
  );
}
