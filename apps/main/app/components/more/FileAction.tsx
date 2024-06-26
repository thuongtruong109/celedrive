"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { LuMoreVertical } from "react-icons/lu";
import { MdFileDownload, MdDriveFileRenameOutline, MdOutlineRestore } from "react-icons/md";
import { FiStar } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { PiTrashLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteFile, renameFile, starFile, trashFile } from "@/services/Firestore";

export function FileAction({
    file,
    select,
    isFolderComp,
    folderId,
    setRenameToggle,
  }: FileDropDownProps) {
  const handleDownload = (path: string) => {
    let a = document.createElement('a') as HTMLAnchorElement;
    a.href = path;
    a.setAttribute('download', path.split('/').pop() || '');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="h-6 w-6 rounded-full p-1 hover:bg-[#ccc]">
            <LuMoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        {select !== "trashed" ? (
            <>
                {!isFolderComp && <DropdownMenuItem
                        className="flex space-x-1 items-center cursor-pointer !text-purple-600"
                        onClick={() => handleDownload(file.fileLink)}
                    >
                        <MdFileDownload className="w-4 h-4" />
                        <span className="text-purple-600">Download</span>
                    </DropdownMenuItem>
                }
                <DropdownMenuItem
                    onClick={() => starFile(file.id, !file.isStarred)}
                >
                    { file.isStarred ? <div className="flex space-x-1 items-center cursor-pointer !text-yellow-600">
                            <GoStarFill className="w-4 h-4" />
                            <span>Unfavorite</span>
                        </div> :
                        <div className="flex space-x-1 items-center cursor-pointer !text-blue-600">
                            <FiStar className="w-4 h-4" />
                            <span>Favorite</span>
                        </div>
                    }
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex space-x-1 items-center cursor-pointer !text-green-600"
                    onClick={() => setRenameToggle(file.id)}
                >
                    <MdDriveFileRenameOutline className="w-4 h-4" />
                    <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex space-x-1 items-center cursor-pointer !text-red-600"
                    onClick={() => trashFile(file.id, true)}
                >
                    <PiTrashLight className="w-4 h-4" />
                    <span>Move to bin</span>
                </DropdownMenuItem>
            </> ) : (
            <>
                <DropdownMenuItem
                    className="flex space-x-1 items-center cursor-pointer !text-green-600"
                    onClick={() => trashFile(file.id, false)}
                >
                    <MdOutlineRestore className="w-4 h-4" />
                    <span>Restore</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex space-x-1 items-center cursor-pointer !text-red-600"
                    onClick={() => deleteFile(file.id, file.isFolder)}
                >
                    <RiDeleteBin6Line className="w-4 h-4" />
                    <span>Delete forever</span>
                </DropdownMenuItem>
            </>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
