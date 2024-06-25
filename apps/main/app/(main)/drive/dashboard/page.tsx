"use client";

import GetFiles from "@/components/GetFiles";
import GetFolders from "@/components/GetFolders";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFetchFiles } from "@/hooks/FetchFiles";
import { DotLoader } from "react-spinners";
import { useSession } from "next-auth/react";

export default function Page() {
  const [isFolder, setIsFolder] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const list = useFetchFiles("", session?.user?.email!);

  useEffect(() => {
    const hasFolders = list.some((item) => item.isFolder && !item.isTrashed);
    const hasFiles = list.some((item) => !item.isFolder && !item.isTrashed);

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
                  { isFolder && <GetFolders folderId="" select="" /> }
                  { isFile && <GetFiles folderId="" select="" /> }
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <h2 className="mb-5 text-xl font-medium text-textC">
                    A place for all of your files
                  </h2>
                  <Image
                    draggable={false}
                    src="/empty_state_drive.png"
                    width={500}
                    height={500}
                    alt="empty-state"
                    className="w-full max-w-2xl object-cover object-center"
                  />
                </div>
              )}
            </>
          )}
        </div>
  );
}
