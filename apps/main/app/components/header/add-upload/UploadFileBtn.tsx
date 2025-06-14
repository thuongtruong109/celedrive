import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

function UploadFileBtn({ uploadFile, className }: { uploadFile: Function, className?: string}) {
  return (
    <button className={`relative flex w-full items-center space-x-3 px-4 py-1.5 hover:bg-darkC ${className}`}>
      <AiOutlineCloudUpload className="h-5 w-5" />
      <input
        type="file"
        multiple
        onChange={(e) => uploadFile(e)}
        className="absolute -left-3 top-0 h-full w-full !cursor-pointer bg-slate-300 opacity-0"
      />
      <span>Upload file</span>
    </button>
  );
}

export default UploadFileBtn;
