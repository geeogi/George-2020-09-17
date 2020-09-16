import { useEffect, useState } from "react";
import {
  createResourceFromFile,
  debouncedLoadResources,
  deleteResourceById,
} from "../handlers/resource";
import { Resource } from "../model/resource";

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [resourcesAreLoading, setResourcesAreLoading] = useState(false);

  const loadResources = async () => {
    setResourcesAreLoading(true);
    try {
      const newResources = await debouncedLoadResources(searchTerm);
      setResources(newResources);
    } finally {
      setResourcesAreLoading(false);
    }
  };

  const deleteResource = async (resource: Resource) => {
    await deleteResourceById(resource.id);
    await loadResources();
  };

  const addResource = async (file: File) => {
    await createResourceFromFile(file);
    await loadResources();
  };

  /**
   * Load resources on page load and whenever search term changes
   */
  useEffect(() => {
    loadResources();
  }, [searchTerm]);

  return {
    resources,

    addResource,
    deleteResource,

    searchTerm,
    setSearchTerm,
    resourcesAreLoading,
  };
};
