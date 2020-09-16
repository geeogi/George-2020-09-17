import React from "react";
import { PERMISSABLE_FILE_TYPES_MIME } from "../config/constants";

export const ControlsBar = (props: { onSearch: (newSearchTerm: string) => void; onUpload: (file: File) => void; searchTerm?: string }) => {
  const { onSearch, onUpload, searchTerm } = props;
  return (
    <div className="flex wrap-reverse space-between">
      <input placeholder="Search documents..." value={searchTerm} onChange={(e) => onSearch(e.target.value)}></input>
      <input type="file" id="file-input" accept={PERMISSABLE_FILE_TYPES_MIME.join(",")} />
      <label htmlFor="file-input">UPLOAD</label>
    </div>
  );
};
