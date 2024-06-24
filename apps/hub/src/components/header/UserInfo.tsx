import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function UserInfo({ setDisplayUserInfo }: UserInfoProps) {
  const { data: session } = useSession();
  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center
    space-y-3 rounded-xl bg-darkC2 p-3 text-sm font-medium text-textC
    shadow-md shadow-[#b4bebb]"
    >
      <div className="flex justify-between items-center space-x-3">
        <p>{session?.user.email}</p>
        <button
          onClick={() => setDisplayUserInfo((prev: boolean) => false)}
          className="rounded-full bg-darkC2 p-1 hover:bg-darkC"
        >
          <AiOutlineClose className="h-5 w-5 rounded-full stroke-2 text-textC" />
        </button>
      </div>
      <div className="h-20 w-20 rounded-full border">
        <Image
          src={session?.user.image as string}
          className="h-full w-full rounded-full object-center"
          height={500}
          width={500}
          draggable={false}
          alt="avatar"
        />
      </div>
      <h3 className="tablet:text-xl text-lg font-normal">
        Hi, {session?.user.name}!
      </h3>
      <button
        onClick={() => signOut()}
        className="tablet:w-44 flex w-full justify-center items-center space-x-1 rounded-full bg-white py-2  hover:bg-darkC"
      >
        <PiSignOutBold className="h-4 w-4" />
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default UserInfo;
