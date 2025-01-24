import { auth } from "@/auth";
import ClientProviders from "@/providers/client-providers";
import { SessionProvider } from "next-auth/react";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <SessionProvider session={session}>
        <ClientProviders>{children}</ClientProviders>
      </SessionProvider>
    </>
  );
}
