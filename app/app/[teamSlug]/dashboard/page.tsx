import DashboardClient from "@/app/app/[teamSlug]/dashboard/_components/client";
import Container from "@/app/app/_components/container";
import Heading from "@/app/app/_components/heading";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;
  console.log(teamSlug);

  return (
    <Container>
      <div className="flex flex-col h-full">
        <Heading title="Dashboard" description="Overview of your activity" />
        <DashboardClient />
      </div>
    </Container>
  );
}
