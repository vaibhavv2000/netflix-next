import axios from "axios";

export const API = axios.create({
  baseURL: "https://netflix-next-pearl.vercel.app/api",
  withCredentials: true,
});