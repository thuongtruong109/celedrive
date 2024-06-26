"use client";

import React, { useState, ChangeEvent } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import DropDown from "./DropDown";
import AddFolder from "./AddFolder";
import fileUpload from "@/services/FileUpload";
import ProgressIndicator from "../../ProgressIndicator";
import { addFolder } from "@/services/Firestore";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Button } from "@/_components/ui/button";

export default function SideMenu() {
  const params = useParams<{ id: string }>()
  const folderId = params.id;

  const [isDropDown, setIsDropDown] = useState(false);
  // TODO: change uploadStatus to progress
  // const [uploadStatus, setUploadStatus] = useState([]);
  const [progress, setProgress] = useState([]);
  const [fileName, setFileName] = useState<string[]>([]);
  const [folderName, setFolderName] = useState<string>("");
  const [folderToggle, setFolderToggle] = useState(false);

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    for (let i = 0; i < files.length; i++) {
      const file = files?.[i];
      if (!file) return;
      setFileName((prev) => [...prev, file.name]);
      fileUpload(file, setProgress, folderId || "", userEmail!);
    }
  };
  fileName.reverse();
  progress.reverse();

  const uploadFolder = () => {
    let payload = {
      folderName: folderName === "" ? "Untitled folder" : folderName,
      isFolder: true,
      isStarred: false,
      isTrashed: false,
      FileList: [],
      folderId: folderId || "",
      userEmail,
    };

    addFolder(payload);
    setFolderName("");
  };

  return (
    <section className="relative w-16 h-auto space-y-2 duration-500">
      <Button onClick={() => setIsDropDown(true)} variant="default" className="px-2.5 !h-fit py-2">
        <HiOutlinePlusSm />
        <span>New</span>
      </Button>


      {isDropDown && (
        <DropDown
          setFolderToggle={setFolderToggle}
          uploadFile={uploadFile}
          setIsDropDown={setIsDropDown}
        />
      )}

      <ProgressIndicator
        progress={progress}
        fileName={fileName}
        setFileName={setFileName}
      />

      {folderToggle && (
        <AddFolder
          setFolderToggle={setFolderToggle}
          setFolderName={setFolderName}
          uploadFolder={uploadFolder}
        />
      )}
    </section>
  );
}