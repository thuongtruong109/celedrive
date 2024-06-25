"use client";

import { useFetchFiles } from "@/hooks/FetchFiles";
import React, { useEffect, useState } from "react";
import { AiFillFolder } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFetchAllFiles } from "@/hooks/FetchAllFiles";
import FileDropDown from "./more/OptionMenu";
import Rename from "./more/Rename";

function GetFolders({ folderId, select }: { folderId: string; select: string }) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState("");
  const [renameToggle, setRenameToggle] = useState("");

  const { data: session } = useSession();

  // Fetch all files unconditionally
  const fetchFiles = useFetchFiles(folderId, session?.user?.email!);
  const fetchAllFiles = useFetchAllFiles(session?.user?.email!);

  // Decide which list to use based on `select`
  const folderList = select ? fetchAllFiles : fetchFiles;

  const handleMenuToggle = (fileId: string) => {
    setRenameToggle("");
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === fileId ? "" : fileId));
  };

  const folders = folderList.map((folder) => {
    let condition = folder?.isFolder && !folder?.isTrashed;
    if (select === "starred")
      condition = folder?.isFolder && folder?.isStarred && !folder?.isTrashed;
    else if (select === "trashed")
      condition = folder?.isFolder && folder?.isTrashed;

    return (
      condition && (
        <div
          key={folder.id}
          onDoubleClick={() => {
            select !== "trashed" && router.push("/drive/folders/" + folder.id);
          }}
          className="relative flex w-[13.75rem] cursor-alias items-center justify-between rounded-xl bg-darkC2 p-3 hover:bg-darkC"
        >
          <div className="flex items-center space-x-2">
            <AiFillFolder className="h-6 w-6" />
            <span className="w-32 truncate text-sm font-medium text-textC">
              {folder.folderName}
            </span>
          </div>
          <BsThreeDotsVertical
            onClick={() => handleMenuToggle(folder.id)}
            className="h-6 w-6 cursor-pointer rounded-full p-1 hover:bg-[#ccc]"
          />
          {openMenu === folder.id && (
            <FileDropDown
              file={folder}
              setOpenMenu={setOpenMenu}
              isFolderComp={true}
              select={select}
              folderId={folder.id}
              setRenameToggle={setRenameToggle}
            />
          )}
          {renameToggle === folder.id && (
            <Rename
              setRenameToggle={setRenameToggle}
              fileId={folder.id}
              fileName={folder.folderName}
              isFolder={folder.isFolder}
              fileExtension=""
            />
          )}
        </div>
      )
    );
  });

  return (
    <div className="mb-5 flex flex-col space-y-4 font-medium">
      <h3>Folders</h3>
      <div className="flex flex-wrap justify-start gap-x-3 gap-y-5 text-textC">
        {folders}
      </div>
    </div>
  );
}

export default GetFolders;
