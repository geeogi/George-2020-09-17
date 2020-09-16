import { useCallback, useEffect, useState } from "react";
import {
  createResourceFromFile,
  deleteResourceById,
  fetchAllResources,
  searchResources,
} from "../handlers/resource";
import { Resource } from "../model/resource";
import useDebounce from "./debounce";

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>();
  const [resourcesAreLoading, setResourcesAreLoading] = useState(false);
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebounce<string>(
    500
  );

  const loadResources = useCallback(async () => {
    setResourcesAreLoading(true);
    try {
      if (debouncedSearchTerm) {
        const newResources = await searchResources(debouncedSearchTerm);
        setResources(newResources);
      } else {
        const newResources = await fetchAllResources();
        setResources(newResources);
      }
    } catch (e) {
      alert(e);
      setSearchTerm("");
    } finally {
      setResourcesAreLoading(false);
    }
  }, [debouncedSearchTerm, setSearchTerm]);

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
  }, [debouncedSearchTerm, loadResources]);

  return {
    resources,

    addResource,
    deleteResource,

    searchTerm,
    setSearchTerm,
    resourcesAreLoading,
  };
};
