import { API_BASE_URL } from "../config/constants";
import { validateFileForResource } from "../core/validate";
import { Resource } from "../model/resource";
import debounce from "debounce-promise";

export const fetchResources = async (): Promise<Resource[]> => {
  const res = await fetch(`${API_BASE_URL}/resources`);
  const resources: Resource[] = await res.json();
  return resources;
};

const searchResources = async (term: string): Promise<Resource[]> => {
  const params = new URLSearchParams({ term });
  const res = await fetch(`${API_BASE_URL}/resources/search?${params}`);
  const resources: Resource[] = await res.json();
  return resources;
};

export const debouncedSearchResources = debounce(searchResources, 400);

export const createResourceFromFile = async (file: File) => {
  validateFileForResource(file);

  const formData = new FormData();

  formData.append("file", file);
  formData.append("name", file.name);

  return fetch(`${API_BASE_URL}/resource`, {
    method: "POST",
    body: formData,
  });
};

export const deleteResourceById = async (id: string) => {
  return fetch(`${API_BASE_URL}/resource/${id}`, { method: "DELETE" });
};
