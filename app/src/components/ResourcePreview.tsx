import React, { useState } from "react";
import { bytesToKilobytes, round } from "../core/util";
import { notifyError } from "../core/error";
import { Resource } from "../model/resource";
import { Spinner } from "./Spinner";

export const ResourcePreview = (props: {
  resource: Resource;
  onDelete: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { resource, onDelete } = props;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete();
    } catch (e) {
      notifyError(e as Error);
      setIsLoading(false);
    }
  };

  const sizeKb = round(bytesToKilobytes(resource.size));

  return (
    <div className="border ma-8 resource-preview-width">
      <div className="pa-16">
        <h3>{resource.name}</h3>
        <div className="flex space-between center">
          <p>{sizeKb}kb</p>
          <button onClick={handleDelete} disabled={isLoading}>
            {isLoading ? <Spinner /> : "delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
