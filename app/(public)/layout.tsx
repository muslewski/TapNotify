import PublicNav from "@/components/nav/public-nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-stretch">
      <PublicNav />
      {children}
    </div>
  );
}
