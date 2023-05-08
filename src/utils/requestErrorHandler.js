import { toast } from "react-toastify";

export const handleRequestError = (error) => {
  const errorResponseData = error?.response?.data;
  if (Array.isArray(errorResponseData?.error)) {
    errorResponseData.error.forEach((el) =>
      toast.error(el.message, {
        position: "top-right",
      }),
    );
  } else {
    toast.error(errorResponseData.message, {
      position: "top-right",
    });
  }
};
