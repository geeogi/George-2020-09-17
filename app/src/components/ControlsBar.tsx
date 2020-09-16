import React from "react";

export const ControlsBar = (props: {}) => {
  return (
    <div className="flex wrap-reverse space-between">
      <input placeholder="Search documents..."></input>
      <button className="large-button">UPLOAD</button>
    </div>
  );
};
