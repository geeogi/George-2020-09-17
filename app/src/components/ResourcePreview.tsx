import React from "react";
import { bytesToKilobytes, round } from "../core/util";
import { Resource } from "../model/resource";

export const ResourcePreview = (props: { resource: Resource }) => {
  const { resource } = props;

  const sizeKb = round(bytesToKilobytes(resource.size));

  return (
    <div className="border my-8 document-width">
      <div className="pa-16">
        <h3>{resource.name}</h3>
        <div className="flex space-between center">
          <p>{sizeKb}kb</p>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
};
