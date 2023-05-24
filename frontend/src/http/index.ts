import axios from "axios";
// const API_KEY = "24e2ede14665b0c6c80b86ad839e7f8c";

export const api = axios.create({});

export const getRepositories = async (query: string[], platform: string[]) =>
  api.get("/repository/all", {
    params: {
      // ...(platform && platform.length ? { platform: platform.join(",") } : {}),
      ...(query && query.length && query[0]
        ? { keywords: query.join(",") }
        : {}),
    },
  });

export const getPlatforms = async () => api.get("/platform");

export const getAllLicenses = async () => api.get("/license/all");

export const getRepoById = async (repoId: number) =>
  api.get("/repository", {
    params: {
      id: repoId,
    },
  });

export const createNewProject = async (projectName: string, ownerId: number) =>
  api.post("/project", { projectName, ownerId });

export const getAllProjectsByOwnerId = async (ownerId: number) =>
  api.get("/project/owner", {
    params: {
      ownerId,
    },
  });

export const deleteProjectRepository = async (
  projectId: number,
  repositoryId: number
) =>
  api.delete("/project/repository", {
    params: {
      projectId,
      repositoryId,
    },
  });

export const addProjectRepository = async (
  projectId: number,
  repositoryId: number
) => api.post("/project/repository", { projectId, repositoryId });

export default api;
