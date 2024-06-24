import React from "react";
import { useRouter } from "next/router";
import GetFolders from "@/components/GetFolders";
import GetFiles from "@/components/GetFiles";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchFiles } from "@/hooks/fetchFiles";
import { DotLoader } from "react-spinners";

function Folder() {
  const [isFolder, setIsFolder] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { Folder } = router.query;

  const { data: session } = useSession();

  const list = fetchFiles(Folder?.[1] || "", session?.user.email!);

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
                  { isFolder && <GetFolders folderId={Folder?.[1] || ""} select={""} /> }
                  { isFile && <GetFiles folderId={Folder?.[1] || ""} select={""} /> }
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

export default Folder;
