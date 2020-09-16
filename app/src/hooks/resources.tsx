import { useEffect, useState } from "react";
import { createResourceFromFile, debouncedSearchResources, deleteResourceById, fetchResources } from "../handlers/resource";
import { Resource } from "../model/resource";

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [isSearching, setIsSearching] = useState(false);

  const loadResources = async () => {
    if (searchTerm) {
      setIsSearching(true);
      try {
        const searchedResources = await debouncedSearchResources(searchTerm);
        setResources(searchedResources);
      } finally {
        setIsSearching(false);
      }
    } else {
      const allResources = await fetchResources();
      setResources(allResources);
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

  useEffect(() => {
    loadResources();
  }, [searchTerm]);

  return { resources, deleteResource, searchTerm, setSearchTerm, addResource, isSearching };
};
