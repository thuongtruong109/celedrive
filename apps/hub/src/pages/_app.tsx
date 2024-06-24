import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "@/styles/globals.css";
import Header from "@/components/header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <main className="flex h-screen flex-col items-center justify-between overflow-hidden bg-bgc px-4">
        <Header />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default MyApp;
