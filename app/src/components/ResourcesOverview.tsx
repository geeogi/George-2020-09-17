import React from "react";
import { bytesToKilobytes, round } from "../core/util";
import { Resource } from "../model/resource";
import { Spinner } from "./Spinner";

export const ResourcesOverview = (props: {
  resources: Resource[];
  isSearching: boolean;
}) => {
  const { resources, isSearching } = props;

  const numberOfDocuments = resources.length;
  const totalSizeB = resources.reduce((a, b) => a + b.size, 0);
  const totalSizeKb = round(bytesToKilobytes(totalSizeB));

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
