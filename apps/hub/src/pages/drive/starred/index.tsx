import GetFiles from "@/components/GetFiles";
import GetFolders from "@/components/GetFolders";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchFiles } from "@/hooks/fetchFiles";
import { DotLoader } from "react-spinners";

export default function Index() {
  const [isFolder, setIsFolder] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const list = fetchFiles("", session?.user.email!);

  useEffect(() => {
    const hasFolders = list.some(
      (item) => item.isFolder && item.isStarred && !item.isTrashed,
    );
    const hasFiles = list.some(
      (item) => !item.isFolder && item.isStarred && !item.isTrashed,
    );

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
                  { isFolder && <GetFolders folderId="" select="starred" /> }
                  { isFile && <GetFiles folderId="" select="starred" /> }
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <Image
                    draggable={false}
                    src="/empty_state_starred.svg"
                    width={500}
                    height={500}
                    alt="empty-state"
                    className="w-48 object-cover object-center"
                  />
                  <h2 className="mb-4 text-2xl">No starred files</h2>
                  <p className="text-sm text-gray-600">
                    Add stars to things that you want to easily fine later
                  </p>
                </div>
              )}
            </>
          )}
        </div>
  );
}
