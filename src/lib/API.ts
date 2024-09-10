import axios from "axios";

const URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.HOST_URL;

export const API = axios.create({
 baseURL: `${URL}/api`,
 withCredentials: true,
});