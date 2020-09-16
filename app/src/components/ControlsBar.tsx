import React from "react";
import { PERMISSABLE_FILE_TYPES_MIME } from "../config/constants";

export const ControlsBar = (props: { onSearch: (newSearchTerm: string) => void; onUpload: (file: File) => void; searchTerm?: string }) => {
  const { onSearch, onUpload, searchTerm } = props;
  return (
    <div className="flex wrap-reverse space-between">
      <input placeholder="Search documents..." value={searchTerm} onChange={(e) => onSearch(e.target.value)}></input>
      <input
        type="file"
        id="resource-upload-file-input"
        accept={PERMISSABLE_FILE_TYPES_MIME.join(",")}
        onChange={(e) => {
          if (e.target.files && e.target.files.length === 1) {
            onUpload(e.target.files[0]);
          }
        }}
      />
      <label htmlFor="resource-upload-file-input">UPLOAD</label>
    </div>
  );
};
