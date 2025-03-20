import axios from "axios";

// Base API setup
const api = axios.create({
  baseURL: "https://shipping-company-bdos.onrender.com/api/auth/",  
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptors: Attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptors: Handle token refresh logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const refreshResponse = await api.post("refresh-token", { refreshToken });
        const newAccessToken = refreshResponse.accessToken;  // No .data here
        localStorage.setItem("authToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        localStorage.clear();
        window.location.href = "/login"; // Redirect to login page if refresh fails
      }
    }
    return Promise.reject(error);
  }
);

// Function to handle user login
export const loginUser = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
  
      if (response.status === 200) {
        return response.data; 
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      console.error("Login error:", err);
      throw new Error('Login failed');
    }
  };
