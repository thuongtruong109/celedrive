"use client";

import { useFetchAllFiles } from "@/hooks/FetchAllFiles";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import { AiFillFolder, AiOutlineSearch } from "react-icons/ai";
import fileIcons from "../FileIcons";
import { useRouter } from "next/navigation";

function Search() {
  const [searchTest, setSearchTest] = useState<string>("");
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: session } = useSession();
  let list = useFetchAllFiles(session?.user?.email!);

  const router = useRouter();

  const openFile = (fileLink: string) => {
    window.open(fileLink, "_blank");
  };

  const searchList = list.filter((item) => {
    return (
      (item.fileName?.toLowerCase().includes(searchTest.toLowerCase()) &&
        searchTest &&
        !item?.isTrashed) ||
      (item.folderName?.toLowerCase().includes(searchTest.toLowerCase()) &&
        searchTest &&
        !item?.isTrashed)
    );
  });

  const result = searchList.map((item) => {
    const icon =
      fileIcons[item.fileExtension as keyof typeof fileIcons] ??
      fileIcons["any"];
    return (
      <div
        key={item.id}
        onClick={() => {
          item.isFolder
            ? router.push("/drive/folders/" + item.id)
            : openFile(item.fileLink);
        }}
        className="flex w-full cursor-pointer items-center space-x-3.5 border-blue-700 px-4 py-2 hover:border-l-2 hover:bg-darkC2"
      >
        <span className="h-6 w-6">
          {item.isFolder ? (
            <AiFillFolder className="h-full w-full text-textC" />
          ) : (
            icon
          )}
        </span>
        <span className="w-full truncate">
          {item.fileName || item.folderName}
        </span>
      </div>
    );
  });

  const handleDocumentClick = (e: { target: any }) => {
    if (
      inputRef.current &&
      e.target &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setOnFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const widthStyle = "w-full max-w-xs md:max-w-md xl:max-w-2xl"

  return (
    <div className={`relative ${widthStyle}`} onFocus={() => setOnFocus(true)}>
      <span className="absolute left-2 top-1 h-9 w-9 cursor-pointer rounded-full p-2 hover:bg-darkC">
        <AiOutlineSearch className="h-full w-full stroke-textC" stroke="2" />
      </span>

      <input
        ref={inputRef}
        onChange={(e) => setSearchTest(e.target.value)}
        type="text"
        placeholder="Search in Drive"
        className={`${widthStyle} rounded-full bg-darkC2 px-2 py-2 indent-11 shadow-darkC
        placeholder:text-textC focus:rounded-b-none
        focus:rounded-t-2xl focus:bg-white focus:shadow-md focus:outline-none`}
      />
      {onFocus && (
        <div
          className={`${widthStyle} absolute z-10 max-h-60 overflow-scroll rounded-b-2xl border-t
      border-slate-300 bg-white pt-2 shadow-md shadow-darkC`}
        >
          {result.length < 1 && searchTest ? (
            <div className="pl-5 text-sm text-gray-500">
              No result match your search.
            </div>
          ) : (
            result
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
