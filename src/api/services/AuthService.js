import axiosPublic from "../axios";
import API_ENDPOINTS from "../endpoints";

class AuthService {
  static async verifyEmail(email) {
    const res = await axiosPublic.post(API_ENDPOINTS.VERIFY_EMAIL, { email });
    return res.data.isAvailable;
  }

  static async signUp(newUser) {
    const res = await axiosPublic.post(API_ENDPOINTS.CREATE_USER, {
      ...newUser,
    });
    return res.data;
  }

  static async signIn(email, password) {
    const res = await axiosPublic.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });
    return res.data;
  }

  static async refreshTokens(refreshToken) {
    const res = await axiosPublic.post(API_ENDPOINTS.REFRESH, {
      refreshToken,
    });
    return res.data;
  }
}

export default AuthService;
