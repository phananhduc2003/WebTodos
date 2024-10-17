import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const retrieveAllToDosForUsernameApi = (username) =>
  apiClient.get(`/users/${username}/todos`);

export const deleteToDosApi = (username, id) =>
  apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveToDosApi = (username, id) =>
  apiClient.get(`/users/${username}/todos/${id}`);

export const updateToDosApi = (username, id, todo) =>
  apiClient.put(`/users/${username}/todos/${id}`, todo);

export const createToDosApi = (username, todo) =>
  apiClient.post(`/users/${username}/todos`, todo);
