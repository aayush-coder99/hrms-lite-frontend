import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-8g9h.onrender.com/"
});

export default API;