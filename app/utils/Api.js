
import axios from "axios";

const axiosGlobal = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// =================================
// JWT Interceptor
// =================================

axiosGlobal.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const jwt = localStorage.getItem("jwt");

      // إرسال JWT للطلبات المحمية
      if (jwt && config.url?.includes("/users/me")) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${jwt}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =================================
// Categories
// =================================

export const getCategorylist = async () => {
  const response = await axiosGlobal.get(
    "/categories?populate=*"
  );

  return response.data.data;
};

// =================================
// Slider
// =================================

export const getSlider = async () => {
  const response = await axiosGlobal.get(
    "/sliders?populate=*"
  );

  return response.data.data;
};

// =================================
// Products
// =================================

export const getProductList = async () => {
  const response = await axiosGlobal.get(
    "/projects?populate=*"
  );

  return response.data.data;
};

// =================================
// Products By Category
// =================================

export const getProductByCategory = async (categoryName) => {
  const response = await axiosGlobal.get(
    `/projects?populate=*&filters[categories][Name][$eq]=${encodeURIComponent(
      categoryName
    )}`
  );

  return response.data.data;
};

// =================================
// Register
// =================================

export const registerUser = async (
  username,
  email,
  password
) => {
  const response = await axiosGlobal.post(
    "/auth/local/register",
    {
      username,
      email,
      password,
    }
  );

  return response.data;
};

// =================================
// Login
// =================================

export const loginUser = async (
  identifier,
  password
) => {
  const response = await axiosGlobal.post(
    "/auth/local",
    {
      identifier,
      password,
    }
  );

  console.log("LOGIN RESPONSE:", response.data);

  return response.data;
};

// =================================
// Current User
// =================================

export const getCurrentUser = async () => {
  const response = await axiosGlobal.get(
    "/users/me"
  );

  return response.data;
};

// =================================
// User Profile With Token
// =================================

export const getUserProfile = async (jwt) => {
  const response = await axiosGlobal.get(
    "/users/me",
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response.data;
};

// =================================
// Export Axios
// =================================

export { axiosGlobal };

export default axiosGlobal;

