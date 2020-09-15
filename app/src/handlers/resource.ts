import { API_BASE_URL } from "../config/constants";
import { Resource } from "../model/resource";

export const createResource = async (file: File) => {};

export const fetchResources = async (): Promise<Resource[]> => {
  const res = await fetch(`${API_BASE_URL}/resources`);
  const resources: Resource[] = await res.json();
  return resources;
};

export const searchResources = async (term: string): Promise<Resource[]> => {
  const params = new URLSearchParams({ term });
  const res = await fetch(`${API_BASE_URL}/resources/search?${params}`);
  const resources: Resource[] = await res.json();
  return resources;
};

export const deleteResource = async (id: string) => {
  return fetch(`${API_BASE_URL}/resource/${id}`, { method: "DELETE" });
};
