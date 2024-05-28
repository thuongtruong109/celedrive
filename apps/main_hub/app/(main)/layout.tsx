import { SideNav } from "./side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="pt-12 flex space-x-8 space-y-8 min-h-[calc(100vh-6rem)]">
        <SideNav />
        <div className="w-full">{children}</div>
    </section>
  );
}
