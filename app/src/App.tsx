import React from "react";
import { ResourcePreview } from "./components/ResourcePreview";
import { ResourcesContainer } from "./components/ResourcesContainer";
import { ControlsBar } from "./components/ResourcesControls";
import { ResourcesOverview } from "./components/ResourcesOverview";
import { Spinner } from "./components/Spinner";
import { useResources } from "./hooks/resources";

function App() {
  const { resources, deleteResource, searchTerm, setSearchTerm, addResource, isSearching } = useResources();

  return (
    <main>
      <ControlsBar searchTerm={searchTerm} onSearch={setSearchTerm} onUpload={addResource} />
      {resources ? (
        <>
          <ResourcesOverview isSearching={isSearching} resources={resources} />
          <ResourcesContainer>
            {resources.map((resource) => (
              <ResourcePreview key={resource.id} resource={resource} onDelete={() => deleteResource(resource)} />
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
