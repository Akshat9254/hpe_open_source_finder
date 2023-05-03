import axios from "axios";
const API_KEY = "24e2ede14665b0c6c80b86ad839e7f8c";

const api = axios.create({
  baseURL: "https://libraries.io/api/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getRepositories = async (query: string[], platform: string[]) =>
  api.get("/search", {
    params: {
      api_key: API_KEY,
      ...(platform && platform.length ? { platform: platform.join(",") } : {}),
      q: query.join(","),
      per_page: "5",
    },
  });

export const getPlatforms = async () =>
  api.get("/platforms", {
    params: {
      api_key: API_KEY,
    },
  });

export default api;
