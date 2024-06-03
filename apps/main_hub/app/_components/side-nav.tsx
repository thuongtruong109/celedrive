"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoFileTrayFullOutline, IoFileTrayFull } from "react-icons/io5";
import { SlStar } from "react-icons/sl";
import { TiStarFullOutline } from "react-icons/ti";
import { PiTrashLight, PiTrashFill } from "react-icons/pi";
import { HiOutlineUserGroup, HiMiniUserGroup } from "react-icons/hi2";
import { RiUserShared2Line, RiStackshareLine, RiUserShared2Fill, RiUserReceived2Line, RiUserReceivedFill } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";

export function SideNav() {
  const pathname = usePathname();

  const menu = [
    [
      {
        icon: IoFileTrayFullOutline,
        matchIcon: IoFileTrayFull,
        label: "Dashboard",
        href: "/dashboard/files",
      },
      {
        icon: SlStar,
        matchIcon: TiStarFullOutline,
        label: "Favorites",
        href: "/dashboard/favorites",
      },
      {
        icon: PiTrashLight,
        matchIcon: PiTrashFill,
        label: "Trash",
        href: "/dashboard/trash",
      },
    ],
    [
      {
        icon: HiOutlineUserGroup,
        matchIcon: HiMiniUserGroup,
        label: "External public",
        href: "/share/external-public",
      },
      {
        icon: MdSecurity,
        matchIcon: MdSecurity,
        label: "External protected",
        href: "/share/external-protected",
      },
      {
        icon: RiUserShared2Line,
        matchIcon: RiUserShared2Fill,
        label: "Internal single (sender)",
        href: "/share/internal-single/sender",
      },
      {
        icon: RiUserReceived2Line,
        matchIcon: RiUserReceivedFill,
        label: "Internal single (receiver)",
        href: "/share/internal-single/receiver",
      },
      {
        icon: RiStackshareLine,
        matchIcon: RiStackshareLine,
        label: "Internal multi",
        href: "/share/internal-multi",
      },
    ],
  ]

  return (
    <nav className="flex flex-col space-y-2 divide-y divide-slate-300/50">
      {
        menu.map((items, index) => (
          <ul key={index} className="max-w-60 min-w-max w-full flex flex-col space-y-2">
            {items.map((item) => (
              <li key={item.label} title={item.label}>
                <Link href={item.href} className={clsx("flex items-center w-full hover:bg-blue-100 px-2.5 py-2 rounded-md font-normal", {"text-blue-500 bg-blue-100 font-medium": pathname.includes(item.href)})}>
                  {
                    pathname.includes(item.href) ? <item.matchIcon /> : <item.icon />
                  }
                  <span className="ml-2 hidden md:block">{item.label}</span>
               </Link>
              </li>
            ))}
          </ul>
        ))
      }
    </nav>
  );
}
