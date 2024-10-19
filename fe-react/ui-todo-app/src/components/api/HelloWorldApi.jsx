import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const retrieveHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const retrieveHelloWorldPathVariableBean = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`, {
    headers: {
      Authorization: "Basic RHVjOjEyMw==",
    },
  });
