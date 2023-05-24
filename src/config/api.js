import axios from "axios";
import localStorageConst from "src/constants/localStorageConst";
import { isJwtExpired } from "jwt-check-expiration";

const apiConfig = axios.create({
  baseURL: "https://hrm-api.herokuapp.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
apiConfig.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage?.getItem(localStorageConst.JWT_TOKEN);
      if (token && !isJwtExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        localStorage.removeItem(localStorageConst.JWT_TOKEN);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiConfig;
