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
import { SharedServices } from "./shared";
import { LINK_SERVICE } from "./shared";

export default function LandingPage() {
  return (
    <section className="lg:px-8 mx-auto min-h-[calc(100vh-6rem)] sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl tracking-normal text-gray-900 sm:text-6xl lilita_font">
          The easiest way to upload and share files
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Join and start managing your files now.
        </p>
        <div className="mt-10 flex flex-col min-[470px]:flex-row items-center justify-center gap-6">
          <Link
            href={LINK_SERVICE.DRIVE_DASHBOARD}
            className="rounded-md bg-purple-500 hover:bg-purple-600 px-3 py-[9px] flex items-center space-x-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <IoFolderOpenOutline />
            <span>Access files</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="text-sm font-semibold leading-6 bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
              >
                <span>Start sharing</span>
                <LuChevronsRight />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {
                SharedServices.map((service) => (
                  <DropdownMenuItem key={service.id}>
                    <Link href={service.link} className="flex items-center space-x-1 w-full">
                      <service.icon />
                      <span>{ service.name }</span>
                    </Link>
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </section>
  );
}
