import debounce from "debounce-promise";
import { API_BASE_URL } from "../config/constants";
import { validateFileForResource } from "../core/validate";
import { Resource } from "../model/resource";

const fetchAllResources = async (): Promise<Resource[]> => {
  const res = await fetch(`${API_BASE_URL}/resources`);

  if (res.ok) {
    const resources: Resource[] = await res.json();
    return resources;
  } else {
    throw new Error("Documents could not be fetched. Try refreshing the page.");
  }
};

const searchResources = async (term: string): Promise<Resource[]> => {
  const params = new URLSearchParams({ term });
  const res = await fetch(`${API_BASE_URL}/resources/search?${params}`);

  if (res.ok) {
    const resources: Resource[] = await res.json();
    return resources;
  } else {
    throw new Error("Documents could not be searched. Try again.");
  }
};

export const debouncedLoadResources = debounce((term?: string) => {
  if (term) {
    return searchResources(term);
  } else {
    return fetchAllResources();
  }
}, 400);

export const createResourceFromFile = async (file: File) => {
  validateFileForResource(file);

  const formData = new FormData();

  formData.append("file", file);
  formData.append("name", file.name);

  const res = await fetch(`${API_BASE_URL}/resource`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("An error when occurred creating resource.");
  }
};

export const deleteResourceById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/resource/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("An error when occurred deleting resource.");
  }
};
