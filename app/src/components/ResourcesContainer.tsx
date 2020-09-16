import React from "react";

export const ResourcesContainer = (props: { children: React.ReactNode }) => {
  return <div className="flex wrap">{props.children}</div>;
};
