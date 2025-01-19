import PublicNav from "@/components/nav/public-nav";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <PublicNav />
      {children}
    </div>
  );
}
