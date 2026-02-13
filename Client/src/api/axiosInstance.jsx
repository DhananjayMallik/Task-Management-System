/* Here we write our base api url in the whole project and also add token (from localStorage)token from localstorage */

import axios from "axios";

// first add our base api url
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/user",
});

// and next add our authentication token
axiosInstance.interceptors.request.use((config) => {
  // get token from local Storage
  const token = localStorage.getItem("token");
  if (token) {
    // add it's from authorizatio headers
    config.headers["Authorization"] = `Bearer Token : ${token}`;
  }
  return config;
});
export default axiosInstance;
