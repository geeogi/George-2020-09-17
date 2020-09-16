import React from "react";
import { useResources } from "../hooks/resources";
import { ResourcePreview } from "./ResourcePreview/ResourcePreview";
import { ResourcesContainer } from "./ResourcesContainer";
import { ResourcesControls } from "./ResourcesControls";
import { ResourcesOverview } from "./ResourcesOverview";

function App() {
  const {
    resources,
    deleteResource,
    searchTerm,
    setSearchTerm,
    addResource,
    resourcesAreLoading,
  } = useResources();

  return (
    <main>
      <ResourcesControls
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onUpload={addResource}
      />
      {resources && (
        <>
          <ResourcesOverview
            resourcesAreLoading={resourcesAreLoading}
            resources={resources}
          />
          <ResourcesContainer>
            {resources.map((resource) => (
              <ResourcePreview
                key={resource.id}
                resource={resource}
                onDelete={() => deleteResource(resource)}
              />
            ))}
          </ResourcesContainer>
        </>
      )}
    </main>
  );
}

export default App;
