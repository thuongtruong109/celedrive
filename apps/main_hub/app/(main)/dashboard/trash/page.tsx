"use client";

import { FileBrowser } from "../_components/file-browser";

export default function FavoritesPage() {
  return (
    <FileBrowser title="Trash" deletedOnly />
  );
}
