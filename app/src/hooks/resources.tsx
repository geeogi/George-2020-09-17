import { useCallback, useEffect, useState } from "react";
import { notifyError } from "../core/error";
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

  const addResource = async (file: File) => {
    await createResourceFromFile(file);
    await loadResources();
  };

  const deleteResource = async (resource: Resource) => {
    await deleteResourceById(resource.id);
    await loadResources();
  };

  /**
   * Loads all resources or searches by debouncedSearchTerm if present
   */
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
      notifyError(e);
      setSearchTerm("");
    } finally {
      setResourcesAreLoading(false);
    }
  }, [debouncedSearchTerm, setSearchTerm]);

  /**
   * Loads resources whenever debouncedSearchTerm changes
   */
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
