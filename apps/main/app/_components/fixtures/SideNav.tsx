"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HubServices, SharedServices } from "@/shared";
import { IService, IServiceNav } from "@/types";
import { useState } from "react";
import { MdKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";

export function SideNav() {
  const pathname = usePathname();

  const menu: IServiceNav[] = [
    {
      id: 1,
      type: "drive",
      services: [...HubServices],
    },
    {
      id: 2,
      type: "share",
      services: [...SharedServices]
    }
  ]

  const [isColapsed, setIsColapsed] = useState(false);

  const handleCollapse = () => {
    setIsColapsed(!isColapsed);
  }

  return (
    <div className={`flex flex-col space-y-2 divide-y divide-slate-300/50 p-2 rounded-lg bg-white shadow-md ${isColapsed ? 'h-fit' : 'h-fit md:h-auto justify-between'}`}>
      <nav className="flex flex-col space-y-2 divide-y divide-slate-300/50">
        {
          menu.map((item: IServiceNav) => (
            <div key={item.id} className="flex flex-col space-y-2 pt-2 first:pt-0">
              <span className={`text-xs ${isColapsed ? 'text-center' : 'text-center md:text-left'}`}>{item.type}</span>
              <ul className="max-w-48 min-w-max w-full flex flex-col space-y-1">
                {item.services.map((service: IService) => (
                  <li key={service.name} title={service.name}>
                    <Link href={service.link} className={clsx("flex items-center w-full hover:bg-blue-100 px-2.5 py-2 rounded-md font-normal", {"text-blue-500 bg-blue-100 font-medium": pathname.includes(service.link)})}>
                      {
                        pathname.includes(service.link) ? <service.matchIcon /> : <service.icon />
                      }
                      <span className={`ml-2 ${isColapsed ? 'hidden' : 'hidden md:block'}`}>{service.name}</span>
                  </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </nav>

      <div className="pt-0.5">
          <button title={isColapsed ? 'Expand' : 'Collapse'} className="flex justify-center items-center cursor-pointer mt-2 w-full hover:bg-blue-100 px-2.5 py-2 rounded-md font-normal" onClick={handleCollapse}>
            {
              isColapsed ? <MdOutlineKeyboardDoubleArrowRight /> : <MdKeyboardDoubleArrowLeft />
            }
          </button>{
          }  
      </div>
    </div>
  );
}
