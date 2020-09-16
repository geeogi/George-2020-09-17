import React from "react";

export const ResourcesContainer = (props: { children: React.ReactNode }) => {
  return <div className="flex wrap space-between">{props.children}</div>;
};
