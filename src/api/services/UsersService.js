import axiosPublic, { axiosPrivate } from "../axios";
import API_ENDPOINTS from "../endpoints";

class UsersService {
  static async getAllUsers() {
    const res = await axiosPublic.get(API_ENDPOINTS.GET_ALL_USERS);
    return res.data;
  }

  static async getMe() {
    const res = await axiosPrivate.get(API_ENDPOINTS.USER_PROFILE);
    return res.data;
  }

  static async getUser(id) {
    const res = await axiosPrivate.get(`/users/${id}`);
    return res.data;
  }

  static async editUser(id, updatedFields) {
    const res = await axiosPrivate.put(`/users/${id}`, { ...updatedFields });
    return res.data;
  }

  static async uploadFile(file) {
    const res = await axiosPrivate.post(API_ENDPOINTS.UPLOAD_FILE, file, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }

  static async getFile(filename) {
    const res = await axiosPrivate.get(`/files/${filename}`);
    return res.data;
  }
}

export default UsersService;
