import { promises as asyncFs } from "fs";
import { Resource } from "../model/resource";

let MOCK_RESOURCE_METADATA_DB: Resource[] = [];

export const addResource = (resource: Resource) => {
  MOCK_RESOURCE_METADATA_DB.push(resource);
};

export const findResourceById = (id: string) => {
  return MOCK_RESOURCE_METADATA_DB.find((resource) => resource.id === id);
};

export const fetchAllResources = () => MOCK_RESOURCE_METADATA_DB;

export const searchResourcesByName = (term: string) => MOCK_RESOURCE_METADATA_DB.filter((resource) => resource.name.includes(term));

export const removeResourceById = async (id: string) => {
  await asyncFs.unlink(`uploads/${id}`);
  MOCK_RESOURCE_METADATA_DB = MOCK_RESOURCE_METADATA_DB.filter((resource) => resource.id !== id);
};
