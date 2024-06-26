"use client";

import React, { useState } from "react";
import { useFetchFiles } from "@/hooks/FetchFiles";
import Image from "next/image";
import fileIcons from "@/components/FileIcons";
import { useSession } from "next-auth/react";
import { useFetchAllFiles } from "@/hooks/FetchAllFiles";
import Rename from "./more/Rename";
import { FileAction } from "./more/FileAction";

function GetFiles({ folderId, select }: { folderId: string; select: string }) {
  const [renameToggle, setRenameToggle] = useState("");

  const { data: session } = useSession();

  const fetchFiles = useFetchFiles(folderId, session?.user?.email!);
  const fetchAllFiles = useFetchAllFiles(session?.user?.email!);

  const fileList = select ? fetchAllFiles : fetchFiles;

  const openFile = (fileLink: string) => {
    window.open(fileLink, "_blank");
  };

  const list = fileList.map((file) => {
    const icon =
      fileIcons[file.fileExtension as keyof typeof fileIcons] ??
      fileIcons["any"];

    const img = ["jpg", "ico", "webp", "png", "jpeg", "gif", "jfif"].includes(
      file.fileExtension,
    ) ? (
      <Image
        src={file.fileLink}
        alt={file.fileName}
        height="500"
        width="500"
        draggable={false}
        className="h-full w-full rounded-sm object-cover object-center"
      />
    ) : file.fileExtension === "mp3" ? (
      <div className="flex flex-col items-center justify-center">
        <div className="h-24 w-24 ">{icon}</div>
        <audio controls className="w-44">
          <source src={file.fileLink} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    ) : file.fileExtension === "mp4" ? (
      <video controls>
        <source src={file.fileLink} type="audio/mpeg" />
        <div className="h-36 w-36 ">{icon}</div>
      </video>
    ) : (
      <div className="h-36 w-36 ">{icon}</div>
    );

    let condition = !file?.isFolder && !file?.isTrashed;
    if (select === "starred")
      condition = !file?.isFolder && file?.isStarred && !file?.isTrashed;
    else if (select === "trashed")
      condition = !file?.isFolder && file?.isTrashed;

    return (
      condition && (
        <div
          key={file.id}
          onDoubleClick={() => openFile(file.fileLink)}
          className="hover:cursor-alias"
        >
          <div
            className="flex w-full flex-col items-center justify-center
         overflow-hidden rounded-xl bg-darkC2 px-2.5 hover:bg-darkC"
          >
            <div className="relative flex w-full items-center justify-between px-1 py-3">
              <div className="flex items-center space-x-4">
                <div className="h-6 w-6">{icon}</div>
                <span className="w-32 truncate text-sm font-medium text-textC">
                  {file.fileName}
                </span>
              </div>
              <FileAction file={file}
                  isFolderComp={false}
                  select={select}
                  folderId=""
                  setRenameToggle={setRenameToggle}
              />
              {renameToggle === file.id && (
                <Rename
                  setRenameToggle={setRenameToggle}
                  fileId={file.id}
                  isFolder={file.isFolder}
                  fileName={file.fileName}
                  fileExtension={file.fileExtension}
                />
              )}
            </div>
            <div className="flex h-44 w-48 items-center justify-center pb-2.5">
              {img}
            </div>
          </div>
        </div>
      )
    );
  });

  return (
    <div className="mb-5 flex flex-col space-y-4 font-medium">
      <h3>Files</h3>
      <div className="flex flex-wrap justify-start gap-x-3 gap-y-5 text-textC">
        {list}
      </div>
    </div>
  );
}

export default GetFiles;
