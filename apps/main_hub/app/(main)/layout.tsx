import { SideNav } from "./side-nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-12 flex gap-8">
        <SideNav />
        <div className="w-full">{children}</div>
    </div>
  );
}
