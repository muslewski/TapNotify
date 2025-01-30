import { currentUser } from "@/lib/auth";
import db from "@/lib/prisma";

interface UserPageParams {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserPage(props: UserPageParams) {
  const params = await props.params;
  const currentSessionUser = await currentUser();

  // Check if user id exists and belongs to authenticated user
  const dbUser = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  // Check if current session user is authenticated
  if (!currentSessionUser) {
    return <div>Sign in to view this page</div>;
  }

  // If user is not found, show error message
  if (!dbUser) {
    return <div>User not found</div>;
  }

  // If user is found, but does not belong to authenticated user, display public profile
  if (dbUser.id !== currentSessionUser.id) {
    return <div>Public User Page {dbUser.name}</div>;
  }

  // If page belongs to authenticated user, show options
  if (dbUser.id === currentSessionUser.id) {
    return <div>Private User Page {dbUser.name}</div>;
  }
}
