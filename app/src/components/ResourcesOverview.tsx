import React from "react";
import { Spinner } from "./Spinner";

export const ResourcesOverview = (props: { numberOfDocuments: number; totalSizeKb: number; isSearching: boolean }) => {
  const { numberOfDocuments, totalSizeKb, isSearching } = props;

  return (
    <div className="flex wrap-reverse space-between mt-16">
      <h2>
        {numberOfDocuments} documents{" "}
        {isSearching && (
          <span className="ma-8">
            <Spinner />
          </span>
        )}
      </h2>
      <p>Total size: {totalSizeKb}kb</p>
    </div>
  );
};
