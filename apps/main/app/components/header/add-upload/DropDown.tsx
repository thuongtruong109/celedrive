import React from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import UploadFileBtn from "./UploadFileBtn";

function DropDown({
  setFolderToggle,
  setIsDropDown,
  uploadFile,
}: folderToggleAndUpload) {
  return (
    <div
      onClick={() => setIsDropDown(false)}
      className="fixed z-20 -left-5 -top-20 flex h-screen w-screen items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute top-1/4 right-1/4 w-40 rounded-md bg-white p-1 text-textC shadow-md shadow-[#bbb]"
      >
        <button
          onClick={() => setFolderToggle(true)}
          className="flex w-full items-center space-x-3 px-4 py-1.5 hover:bg-darkC rounded-md"
        >
          <MdOutlineCreateNewFolder className="h-5 w-5" />
          <span>New folder</span>
        </button>
        <div className="border-t mt-1 pt-1">
          <UploadFileBtn uploadFile={uploadFile} className="rounded-md cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default DropDown;
