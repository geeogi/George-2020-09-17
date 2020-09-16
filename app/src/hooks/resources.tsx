import { useEffect, useState } from "react";
import { createResourceFromFile, deleteResourceById, fetchResources, searchResources } from "../handlers/resource";
import { Resource } from "../model/resource";

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>();
  const [searchTerm, setSearchTerm] = useState<string>();

  const loadResources = async () => {
    const freshResources = await fetchResources();
    setResources(freshResources);
  };

  const deleteResource = async (resource: Resource) => {
    await deleteResourceById(resource.id);
    await loadResources();
  };

  const addResource = async (file: File) => {
    await createResourceFromFile(file);
    await loadResources();
  };

  useEffect(() => {
    if (!resources) {
      loadResources();
    }
  }, [resources]);

  useEffect(() => {
    if (searchTerm) {
      searchResources(searchTerm).then(setResources);
    } else {
      fetchResources().then(setResources);
    }
  }, [searchTerm]);

  return { resources, deleteResource, searchTerm, setSearchTerm, addResource };
};
