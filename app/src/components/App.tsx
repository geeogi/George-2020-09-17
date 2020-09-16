import React from "react";
import { ResourcePreview } from "./ResourcePreview/ResourcePreview";
import { ResourcesContainer } from "./ResourcesContainer";
import { ResourcesControls } from "./ResourcesControls";
import { ResourcesOverview } from "./ResourcesOverview";
import { Spinner } from "./Spinner/Spinner";
import { useResources } from "../hooks/resources";

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
      {resources ? (
        <>
          <ResourcesOverview resourcesAreLoading={resourcesAreLoading} resources={resources} />
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
      ) : (
        <div className="mt-16">
          <Spinner />
        </div>
      )}
    </main>
  );
}

export default App;
