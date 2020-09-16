import React from "react";

export const ControlsBar = (props: { onSearch: (newSearchTerm: string) => void; onUpload: (file: File) => void; searchTerm?: string }) => {
  const { onSearch, onUpload, searchTerm } = props;
  return (
    <div className="flex wrap-reverse space-between">
      <input placeholder="Search documents..." value={searchTerm} onChange={(e) => onSearch(e.target.value)}></input>
      <button className="large-button">UPLOAD</button>
    </div>
  );
};
