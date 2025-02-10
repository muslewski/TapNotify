import { getTeamBySlug } from "@/actions/database/teams";
import SettingsForm from "@/app/app/[teamSlug]/settings/_components/settings-form";
import Container from "@/app/app/_components/container";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;

  const team = await getTeamBySlug(teamSlug);

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <Container>
      <SettingsForm initialData={team} />
    </Container>
  );
}
