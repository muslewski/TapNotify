import ProtectedNav from "@/components/nav/protected-nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen gap-12 flex flex-col md:flex-row">
      <ProtectedNav />
      {children}
    </div>
  );
}
