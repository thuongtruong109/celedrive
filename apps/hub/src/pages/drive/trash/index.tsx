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
    const hasFolders = list.some((item) => item.isFolder && item.isTrashed);
    const hasFiles = list.some((item) => !item.isFolder && item.isTrashed);

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
                  { isFolder && <GetFolders folderId="" select="trashed" /> }
                  { isFile && <GetFiles folderId="" select="trashed" /> }
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <Image
                    draggable={false}
                    src="/empty_state_trash.svg"
                    width={500}
                    height={500}
                    alt="empty-state"
                    className="w-48 object-cover object-center"
                  />
                  <h2 className="mb-4 text-2xl">Bin is empty</h2>
                  <p className="mb-3 text-sm text-gray-600">
                    Items moved to the bin will be deleted forever after 30 days
                  </p>
                  <span className="cursor-pointer text-blue-700 hover:underline">
                    Learn more
                  </span>
                </div>
              )}
            </>
          )}
        </div>
  );
}
