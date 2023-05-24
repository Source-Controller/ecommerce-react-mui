import axiosPublic from "../axios";

class AuthService {
  static async verifyEmail(email) {
    const res = await axiosPublic.post("/users/is-available", { email });
    return res.data.isAvailable;
  }

  static async signUp(newUser) {
    const res = await axiosPublic.post("/users", {
      ...newUser,
    });
    return res.data;
  }

  static async signIn(email, password) {
    const res = await axiosPublic.post("/auth/login", {
      email,
      password,
    });
    return res.data;
  }

  static async refreshTokens(refreshToken) {
    const res = await axiosPublic.post("/auth/refresh-token", {
      refreshToken,
    });
    return res.data;
  }
}

export default AuthService;
