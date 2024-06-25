"use client";

import React from "react";
import GetFolders from "@/components/GetFolders";
import GetFiles from "@/components/GetFiles";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useFetchFiles } from "@/hooks/FetchFiles";
import { DotLoader } from "react-spinners";

interface PageProps {
  params: {
    id: string;
  };
}
export default function Page(props: PageProps) {
  const folderId = props.params.id;
  const [isFolder, setIsFolder] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const list = useFetchFiles(folderId || "", session?.user?.email!);

  useEffect(() => {
    const hasFolders = list.some((item) => item.isFolder);
    const hasFiles = list.some((item) => !item.isFolder);

    setIsFolder(hasFolders);
    setIsFile(hasFiles);

    setTimeout(() => {
      setIsLoading(false);
    }, 2200);
  }, [list]);

  return (
        <div className="h-full w-full overflow-y-auto py-4">
          {!isFile && !isFolder && isLoading ? (
            <div className="flex h-full items-center justify-center">
              <DotLoader color="#b8c2d7" size={60} />
            </div>
          ) : (
            <>
              {isFile || isFolder ? (
                <>
                  { isFolder && <GetFolders folderId={folderId || ""} select={""} /> }
                  { isFile && <GetFiles folderId={folderId || ""} select={""} /> }
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <Image
                    draggable={false}
                    src="/empty_state_folder.png"
                    width={500}
                    height={500}
                    alt="empty-state"
                    className="w-full max-w-md object-cover object-center opacity-75"
                  />
                </div>
              )}
            </>
          )}
        </div>
  );
}