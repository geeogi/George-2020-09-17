import React from "react";

export const ResourcesOverview = (props: { numberOfDocuments: number; totalSizeKb: number }) => {
  const { numberOfDocuments, totalSizeKb } = props;

  return (
    <div className="flex wrap-reverse space-between mt-16">
      <h2>{numberOfDocuments} documents</h2>
      <p>Total size: {totalSizeKb}kb</p>
    </div>
  );
};
