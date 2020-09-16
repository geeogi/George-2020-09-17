import React from "react";
import "./App.css";
import { bytesToKilobytes, round } from "./core/util";
import { Resource } from "./model/resource";

const MOCK_RESOURCES: Resource[] = [
  { id: "1", name: "My super picture", size: 30000 },
  { id: "2", name: "My very good picture", size: 15000 },
  { id: "3", name: "My picture", size: 8000 },
  { id: "4", name: "My picture with a long name", size: 90000 },
  { id: "5", name: "My brilliant picture", size: 25000 },
  { id: "6", name: "My fantastic picture", size: 7000 },
];

function App() {
  const numberOfDocuments = MOCK_RESOURCES.length;
  const totalSizeB = MOCK_RESOURCES.reduce((a, b) => a + b.size, 0);
  const totalSizeKb = round(bytesToKilobytes(totalSizeB));

  return (
    <main className="container">
      <div className="flex wrap-reverse space-between">
        <input placeholder="Search documents..."></input>
        <button>UPLOAD</button>
      </div>
      <div className="flex wrap-reverse space-between">
        <h2>{numberOfDocuments} documents</h2>
        <p>Total size: {totalSizeKb}kb</p>
      </div>
      <div className="flex wrap space-between">
        {MOCK_RESOURCES.map((resource) => (
          <div className="border my-8 document-width">
            <div className="pa-16">
              <h3>{resource.name}</h3>
              <div className="flex space-between center">
                <p>{round(bytesToKilobytes(resource.size))}kb</p>
                <button>delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
