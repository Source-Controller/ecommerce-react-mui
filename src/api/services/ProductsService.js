import axiosPublic from "../axios";
import API_ENDPOINTS from "../endpoints";

class ProductsService {
  static async getAllProducts() {
    const res = await axiosPublic.get(API_ENDPOINTS.GET_ALL_PRODUCTS);
    return res.data;
  }

  static async getProductsPerPage({ offset, limit }) {
    const res = await axiosPublic.get(
      `/products?offset=${offset}&limit=${limit}`
    );
    return res.data;
  }

  static async getProductById(id) {
    const res = await axiosPublic.get(`/products/${id}`);
    return res.data;
  }

  static async getCategories() {
    const res = await axiosPublic.get(API_ENDPOINTS.CATEGORIES);
    return res.data;
  }

  static async getProductsByCategory(categoryId) {
    const res = await axiosPublic.get(`/categories/${categoryId}/products`);
    return res.data;
  }
}

export default ProductsService;
