import xss from "xss";
import { API_BASE_URL } from "../config/constants";
import { validateFileForResource } from "../core/validate";
import { Resource } from "../model/resource";

export const fetchAllResources = async (): Promise<Resource[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/resources`);

    if (!res.ok) {
      throw new Error(res.status.toString());
    }

    const resources: Resource[] = await res.json();
    return resources;
  } catch (e) {
    throw new Error("Documents could not be fetched. Try refreshing the page.");
  }
};

export const searchResources = async (term: string): Promise<Resource[]> => {
  const params = new URLSearchParams({ term });

  try {
    const res = await fetch(`${API_BASE_URL}/resources/search?${params}`);

    if (!res.ok) {
      throw new Error(res.status.toString());
    }

    const resources: Resource[] = await res.json();
    return resources;
  } catch (e) {
    throw new Error("Documents could not be searched. Try again.");
  }
};

export const createResourceFromFile = async (file: File) => {
  validateFileForResource(file);

  const formData = new FormData();

  formData.append("file", file);
  formData.append("name", xss(file.name));

  try {
    const res = await fetch(`${API_BASE_URL}/resource`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(res.status.toString());
    }
  } catch (e) {
    throw new Error("An error when occurred creating document.");
  }
};

export const deleteResourceById = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/resource/${id}`, {
      method: "DELETE",
    });
    
    if (!res.ok) {
      throw new Error(res.status.toString());
    }
  } catch (e) {
    throw new Error("An error when occurred deleting document.");
  }
};
