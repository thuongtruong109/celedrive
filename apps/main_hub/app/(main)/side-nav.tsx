"use client";

import { Button } from "@/_components/ui/button";
import clsx from "clsx";
import { FileIcon, StarIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav() {
  const pathname = usePathname();

  const menu = [
    [
      {
        icon: FileIcon,
        label: "Dashboard",
        href: "/dashboard/files",
      },
      {
        icon: StarIcon,
        label: "Favorites",
        href: "/dashboard/favorites",
      },
      {
        icon: TrashIcon,
        label: "Trash",
        href: "/dashboard/trash",
      },
    ],
    [
      {
        icon: FileIcon,
        label: "External",
        href: "/share/external",
      },
      {
        icon: StarIcon,
        label: "Internal single",
        href: "/share/internal-single",
      },
      {
        icon: TrashIcon,
        label: "Internal multi",
        href: "/share/internal-multi",
      },
    ],
  ]

  return (
    <nav className="w-40 flex flex-col sapce-y-2 divide-y divide-slate-300/50">
      {
        menu.map((items, index) => (
          <ul key={index} className="w-40 flex flex-col sapce-y-2">
            {items.map((item) => (
              <li key={item.label}>
                <Link href="/dashboard/files" className={clsx("flex gap-2 w-full hover:bg-purple-500 hover:text-white px-2.5 py-2 rounded-md", {"text-blue-500": pathname.includes("/dashboard/files")})}>
                  <item.icon />
                  <span>{item.label}</span>
               </Link>
              </li>
            ))}
          </ul>
        ))
      }
    </nav>
  );
}
