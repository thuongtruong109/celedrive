"use client";

import Image from "next/image";
import Link from "next/link";
import { IoFolderOpenOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiUserShared2Line, RiStackshareLine } from "react-icons/ri";

export default function LandingPage() {
  return (
      <section className="relative isolate px-6 pt-14 lg:px-8 max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl py-8 text-center flex flex-col items-center justify-center mx-auto h-full">
            <Image
              src="/logo.png"
              width="200"
              height="200"
              alt="file drive logo"
              className="inline-block mb-8 lg:mb-12 xl:mb-16"
            />

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              The easiest way to upload and share files
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Make and account and start managing your files in less than a
              minute.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard/files"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 flex items-center space-x-1 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <IoFolderOpenOutline />
                <span>My Hub</span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    className="text-sm font-semibold leading-6 text-gray-500"
                  >
                    <span>Start sharing</span>
                    <span aria-hidden="true">→</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/share/external" className="flex items-center space-x-1">
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
