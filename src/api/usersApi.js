import API_ENDPOINTS from "./endpoints";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();
export const getUserProfile = async () => {
  const response = await axiosPrivate.get(API_ENDPOINTS.USER_PROFILE);
  return response.data;
};
