import PublicNav from "@/components/nav/public-nav";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full">
      <PublicNav />
      {children}
    </div>
  );
}
