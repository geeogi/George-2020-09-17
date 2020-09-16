import React from "react";
import { ControlsBar } from "./components/ControlsBar";
import { ResourcePreview } from "./components/ResourcePreview";
import { ResourcesContainer } from "./components/ResourcesContainer";
import { ResourcesOverview } from "./components/ResourcesOverview";
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
    <main>
      <ControlsBar />
      <ResourcesOverview numberOfDocuments={numberOfDocuments} totalSizeKb={totalSizeKb} />
      <ResourcesContainer>
        {MOCK_RESOURCES.map((resource) => (
          <ResourcePreview resource={resource} />
        ))}
      </ResourcesContainer>
    </main>
  );
}

export default App;
