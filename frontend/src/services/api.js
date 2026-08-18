import axios from "axios";

const API = axios.create({
  baseURL: "https://contact-book-xxxx.onrender.com/api/",
});

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getContacts = () => API.get("contacts/");

export const createContact = (contact) =>
  API.post("contacts/", contact);

export const updateContact = (id, contact) =>
  API.put(`contacts/${id}/`, contact);

export const deleteContact = (id) =>
  API.delete(`contacts/${id}/`);