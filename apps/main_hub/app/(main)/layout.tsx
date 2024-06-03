import { SideNav } from "@/_components/side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="pt-10 flex space-x-2 min-h-[calc(100vh-6rem)]">
        <SideNav />
        <div className="w-full">{children}</div>
    </section>
  );
}
