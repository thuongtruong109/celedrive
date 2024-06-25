"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import UserInfo from "./UserInfo";
import Search from "./Search";
import { FaUserCircle } from "react-icons/fa";
import NewBtn from "./add-upload/NewBtn";

function Header() {
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  const { data: session } = useSession();
  
  if (session === null) {
    signIn();
  }
  return (
    <header className="relative flex h-16 w-full items-center justify-between space-x-3 lg:space-x-5 py-2">
      <Search />

      <NewBtn />
      
      <div
        onClick={() => {
          session ? setDisplayUserInfo((prev) => !prev) : signIn();
        }}
        className="max-h-[34px] max-w-[34px] min-w-[34px] min-h-[34px] cursor-pointer rounded-full"
      >
        {session ? (
          <Image
            src={session?.user?.image as string}
            className="w-full h-full rounded-full object-center object-cover"
            height={50}
            width={50}
            draggable={false}
            alt="avatar"
          />
        ) : (
          <FaUserCircle className="h-full w-full" />
        )}
      </div>
      <div className="absolute right-5 top-14">
        {session && displayUserInfo && (
          <UserInfo setDisplayUserInfo={setDisplayUserInfo} />
        )}
      </div>
    </header>
  );
}

export default Header;
