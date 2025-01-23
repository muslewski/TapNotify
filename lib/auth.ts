import { auth } from "@/auth";

// This function returns the currently authenticated user for server-side
export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

// This function returns the currently authenticated user ID
export const currentUserId = async () => {
  const user = await currentUser();

  return user?.id;
};
