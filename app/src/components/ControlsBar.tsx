import React, { useState } from "react";
import { PERMISSABLE_FILE_TYPES_MIME } from "../config/constants";
import { notifyError } from "../core/error";
import { Spinner } from "./Spinner";

export const ControlsBar = (props: { onSearch: (newSearchTerm: string) => void; onUpload: (file: File) => Promise<void>; searchTerm?: string }) => {
  const [isUploading, setIsUploading] = useState(false);

  const { onSearch, onUpload, searchTerm } = props;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isUploading && e.target.files && e.target.files.length === 1) {
      setIsUploading(true);
      try {
        await onUpload(e.target.files[0]);
      } catch (e) {
        notifyError(e as Error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex wrap-reverse space-between">
      <input type="text" placeholder="Search documents..." value={searchTerm} onChange={(e) => onSearch(e.target.value)}></input>
      <input type="file" id="resource-upload-file-input" accept={PERMISSABLE_FILE_TYPES_MIME.join(",")} disabled={isUploading} onChange={handleUpload} />
      <label htmlFor="resource-upload-file-input">{isUploading ? <Spinner /> : "UPLOAD"}</label>
    </div>
  );
};
