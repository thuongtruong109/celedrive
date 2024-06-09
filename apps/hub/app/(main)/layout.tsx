import { SideNav } from "@/_components/side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="py-10 flex space-x-2 md:space-x-4 min-h-[calc(100vh-6rem)]">
        <SideNav />
        <div className="w-full bg-white rounded-lg p-4 shadow-md">{children}</div>
    </section>
  );
}
