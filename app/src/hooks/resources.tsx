import { useEffect, useState } from "react";
import { createResourceFromFile, deleteResourceById, fetchResources, searchResources } from "../handlers/resource";
import { Resource } from "../model/resource";

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>();
  const [searchTerm, setSearchTerm] = useState<string>();

  useEffect(() => {
    if (!resources || !searchTerm) {
      fetchResources().then(setResources);
    }
  });

  useEffect(() => {
    if (searchTerm) {
      searchResources(searchTerm).then(setResources);
    }
  }, [searchTerm]);

  const deleteResource = async (resource: Resource) => {
    await deleteResourceById(resource.id);
    const updatedResourceList = await fetchResources();
    setResources(updatedResourceList);
  };

  return { resources, deleteResource, searchTerm, setSearchTerm, createResourceFromFile };
};
