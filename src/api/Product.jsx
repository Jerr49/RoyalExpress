import axios from "axios";

// Base API setup
const api = axios.create({
  baseURL: "https://shipping-company-bdos.onrender.com/api/products/",
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
        const refreshResponse = await api.post("refresh-token", {
          refreshToken,
        });
        const newAccessToken = refreshResponse.accessToken;
        localStorage.setItem("authToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const createProduct = async (productData) => {
  try {
    const response = await api.post("/create-product", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);

    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to create product"
      );
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getProductsByTrackingId = async (trackingId) => {
    try {
      const response = await api.get(`/${trackingId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by tracking ID:", error);
  
      if (error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch product details"
        );
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };