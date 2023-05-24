import axiosPublic from "../axios";

class ProductsService {
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
    const res = await axiosPublic.get("/categories");
    return res.data;
  }

  static async getProductsByCategory(categoryId) {
    const res = await axiosPublic.get(`/categories/${categoryId}/products`);
    return res.data;
  }
}

export default ProductsService;
