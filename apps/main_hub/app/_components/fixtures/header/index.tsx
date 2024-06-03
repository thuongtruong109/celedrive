import { Button } from "@/_components/ui/button";
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import './index.css'
import { MdOutlineFingerprint } from "react-icons/md";

const Header: FC = () => {
  return (
    <header className="relative z-10 py-2 items-center container mx-auto justify-between flex">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/logo.png" width="30" height="30" alt="logo" />
          <span className="gradient-text text-2xl font-semibold hidden min-[480px]:block">Celedrive</span>
        </Link>

        {/* <SignedIn>
          <Button variant={"outline"}>
            <Link href="/dashboard/files">Your Files</Link>
          </Button>
        </SignedIn> */}

        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button variant={"outline"}>
                <MdOutlineFingerprint />
                <span>Sign In</span>
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
    </header>
  );
}

export default memo(Header);