import axios from "./axios";
import API_ENDPOINTS from "./endpoints";

// products
export const getAllProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
};

export const getProducts = async ({ offset, limit }) => {
  const response = await axios.get(`/products?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get("/products/categories");
  return response.data;
};

export const getProductsByCategory = async (categoryId) => {
  const response = await axios.get(`/categories/${categoryId}/products`);
  return response.data;
};
