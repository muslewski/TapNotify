import { useSession } from "next-auth/react";

// This hook returns the currently authenticated user for client-side
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
