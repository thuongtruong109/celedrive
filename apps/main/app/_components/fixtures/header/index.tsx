import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import './index.css'
import { GoQuestion } from "react-icons/go";

const Header: FC = () => {
  return (
    <header className="relative z-10 py-2 items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/logo.png" width="30" height="30" alt="logo" />
          <span className="gradient-text text-2xl font-semibold hidden min-[480px]:block">Celedrive</span>
        </Link>

        <Link
            href="/guide"
            className="rounded-md bg-slate-200 hover:bg-slate-300 px-3 py-[9px] flex items-center space-x-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          <GoQuestion />
          <span>Guide</span>
        </Link>
    </header>
  );
}

export default memo(Header);