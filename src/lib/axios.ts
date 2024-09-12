import axios from "axios";
import nookies from "nookies";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com/",
});

// Response interceptor to handle 401 errors and refresh the token
axiosClient.interceptors.response.use(
  (response) => response, // If the response is successfull, just return it
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const { refresh } = nookies.get(); // Getting Refresh token
        if (refresh) {
          // Try to refresh the token
          const response = await axiosClient.post("auth/refresh", {
            refreshToken: refresh,
          });
          const newAccessToken = response.data.token;
          nookies.set(null, "access", newAccessToken, { path: "/" }); // Update the access token in cookies
          nookies.set(null, "refresh", response.data.refresh, { path: "/" }); // Update the new refresh token in cookies

          // Update the Authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Try to request the url with new access token again
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
