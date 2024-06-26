import React from "react";
import { PiSignOutBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { signOut } from "next-auth/react";

type Props = {
  setDisplayUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  email?: string;
  name?: string;
  image?: string;
}

export default function UserInfo(props: Props) {
  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center
    space-y-3 rounded-xl bg-darkC2 p-3 text-sm font-medium text-textC
    shadow-md"
    >
      <div className="flex justify-between items-center space-x-3">
        <p>{props.email}</p>
        <button
          onClick={() => props.setDisplayUserInfo(false)}
          className="rounded-full bg-darkC2 p-1 hover:bg-darkC"
        >
          <AiOutlineClose className="h-5 w-5 rounded-full stroke-2 text-textC" />
        </button>
      </div>
      {
        props.image && <div className="h-20 w-20 rounded-full border">
          <Image
            src={props.image}
            className="h-full w-full rounded-full object-center"
            height={500}
            width={500}
            draggable={false}
            alt="avatar"
          />
        </div>
      }
      {
        props.name && <h3 className="tablet:text-xl text-lg font-normal">
          Hi, {props.name}!
        </h3>
      }
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