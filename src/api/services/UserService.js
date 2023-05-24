import API_ENDPOINTS from "../endpoints";

class UserService {
  static async getUserProfile(axiosPrivate) {
    return axiosPrivate.get(API_ENDPOINTS.USER_PROFILE);
  }
}

export default UserService;
