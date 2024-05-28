"use client";

import { LuChevronsRight } from "react-icons/lu";
import Link from "next/link";
import { IoFolderOpenOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Button } from "@/_components/ui/button";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiUserShared2Line, RiStackshareLine } from "react-icons/ri";

export default function LandingPage() {
  return (
    <section className="lg:px-8 mx-auto pb-8 pt-20 sm:pt-36 md:pt-48 lg:pt-60 xl:pt-72 sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-center flex flex-col items-center">
        <h1 className="text-4xl tracking-normal text-gray-900 sm:text-6xl lilita_font">
          The easiest way to upload and share files
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Make and account and start managing your files in less than a
          minute.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/dashboard/files"
            className="rounded-md bg-purple-600 px-3 py-2.5 flex items-center space-x-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <IoFolderOpenOutline />
            <span>Access files</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="text-sm font-semibold leading-6 text-gray-500"
              >
                <span>Start sharing</span>
                <LuChevronsRight />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/share/external" className="flex items-center space-x-1 w-full">
                  <HiOutlineUserGroup />
                  <span>External</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/share/internal-single" className="flex items-center space-x-1">
                  <RiUserShared2Line />
                  <span>Internal single</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/share/internal-multi" className="flex items-center space-x-1">
                  <RiStackshareLine />
                  <span>Internal multi</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </section>
  );
}
