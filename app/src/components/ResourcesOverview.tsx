import React from "react";
import { bytesToKilobytes, round } from "../core/util";
import { Resource } from "../model/resource";
import { Spinner } from "./Spinner/Spinner";

export const ResourcesOverview = (props: {
  resources: Resource[];
  resourcesAreLoading: boolean;
}) => {
  const { resources, resourcesAreLoading } = props;

  const numberOfDocuments = resources.length;
  const totalSizeB = resources.reduce((a, b) => a + b.size, 0);
  const totalSizeKb = round(bytesToKilobytes(totalSizeB));

  return (
    <div className="flex space-between mt-48 xs-mt-8 xs-column mx-8">
      <h2>
        {numberOfDocuments} documents{" "}
        {resourcesAreLoading && (
          <span className="ma-8">
            <Spinner />
          </span>
        )}
      </h2>
      <p>Total size: {totalSizeKb}kb</p>
    </div>
  );
};
