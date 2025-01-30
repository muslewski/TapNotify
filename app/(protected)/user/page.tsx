import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserRedirectPage() {
  const user = await currentUser();

  if (!user) {
    return <div>Sign in to view this page</div>;
  }

  redirect(`/user/${user.id}`);
}
