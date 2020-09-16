import React from "react";
import { ControlsBar } from "./components/ControlsBar";
import { ResourcePreview } from "./components/ResourcePreview";
import { ResourcesContainer } from "./components/ResourcesContainer";
import { ResourcesOverview } from "./components/ResourcesOverview";
import { bytesToKilobytes, round } from "./core/util";
import { useResources } from "./hooks/resources";

function App() {
  const { resources } = useResources();

  if (!resources) {
    return <div>Loading...</div>;
  }

  const numberOfDocuments = resources.length;
  const totalSizeB = resources.reduce((a, b) => a + b.size, 0);
  const totalSizeKb = round(bytesToKilobytes(totalSizeB));

  return (
    <main>
      <ControlsBar />
      <ResourcesOverview numberOfDocuments={numberOfDocuments} totalSizeKb={totalSizeKb} />
      <ResourcesContainer>
        {resources.map((resource) => (
          <ResourcePreview resource={resource} />
        ))}
      </ResourcesContainer>
    </main>
  );
}

export default App;
