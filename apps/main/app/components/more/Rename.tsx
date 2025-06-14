"use client";

import { renameFile } from "@/services/Firestore";
import React, { useState } from "react";

function Rename({
  setRenameToggle,
  fileId,
  fileName,
  isFolder,
  fileExtension,
}: renameProps) {
  const [newName, setNewName] = useState(fileName);

  const rename = () => {
    if (newName === "") return;

    if (isFolder) renameFile(fileId, newName, isFolder);
    else {
      const formatName = newName.includes(".")
        ? newName
        : newName + "." + fileExtension;
      renameFile(fileId, formatName, isFolder);
    }
    setRenameToggle("");
  };

  return (
    <div className="absolute top-9 z-10 space-y-2 rounded-xl bg-white p-3 shadow-lg shadow-[#bbb]">
      <input
        className="w-full rounded-md border border-textC py-1.5 indent-2 outline-textC2"
        type="text"
        placeholder="Rename"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <div className="flex w-full justify-between">
        <button
          type="button"
          onClick={() => setRenameToggle("")}
          className="rounded-full px-3 py-2"
        >
          Cancel
        </button>
        <button
          onClick={() => rename()}
          className={`rounded-full px-3 py-2 font-medium text-textC2 ${newName && "hover:bg-darkC2"}`}
        >
          Rename
        </button>
      </div>
    </div>
  );
}

export default Rename;
