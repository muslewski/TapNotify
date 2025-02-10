import Container from "@/app/app/_components/container";
import AccountForm from "@/app/app/[teamSlug]/settings/account/_components/account-form";
import { getUserById } from "@/actions/database/users";
import { currentUserId } from "@/lib/auth";

export default async function SettingsPage() {
  const userId = await currentUserId();

  if (!userId) {
    return <div>Not authenticated</div>;
  }

  const user = await getUserById(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Container>
      <AccountForm initialData={user} />
    </Container>
  );
}
