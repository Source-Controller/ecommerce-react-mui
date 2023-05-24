import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import UsersService from "../api/services/UsersService";
import useAuthStore from "../store/authStore";
import { handleRequestError } from "../utils/requestErrorHandler";

const CURRENT_USER_KEY = "getMe";

const useProfile = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  const profileQuery = useQuery(
    [CURRENT_USER_KEY, authStore.accessToken],
    UsersService.getMe,
    {
      onMutate() {
        authStore.setRequestLoading(true);
      },
      onSuccess(data) {
        authStore.setAuthUser(data);
        authStore.setRequestLoading(false);
      },
      onError(error) {
        authStore.setRequestLoading(false);
        if (Array.isArray(error.response.data.error)) {
          error.response.data.error.forEach((el) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

  const editProfileMutation = useMutation(
    ({ email, name }) =>
      UsersService.editUser(authStore?.authUser?.id, { email, name }),
    {
      onSuccess: (data) => {
        authStore.setAuthUser(data);
        queryClient.invalidateQueries(CURRENT_USER_KEY);
        toast.success("Changes are saved");
      },
      onError: (error) => handleRequestError(error),
    }
  );

  const uploadAvatarMutation = useMutation(
    (formData) => UsersService.uploadFile(formData),
    {
      onError: (error) => handleRequestError(error),
    }
  );

  return {
    profileQuery,
    editProfileMutation,
    uploadAvatarMutation,
  };
};

export default useProfile;
