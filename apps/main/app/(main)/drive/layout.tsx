import Header from "@/components/header";

export default function DriveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-col overflow-hidden px-2">
        <Header />
        {children}
    </div>
  );
}
