import axiosPublic, { axiosPrivate } from "../axios";

class UsersService {
  static async getAllUsers() {
    const res = await axiosPublic.get("/users");
    return res.data;
  }

  static async getMe() {
    const res = await axiosPrivate.get("/auth/profile");
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
    const res = await axiosPrivate.post("/files/upload", file, {
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
