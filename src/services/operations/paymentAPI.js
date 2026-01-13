import { apiConnector } from "../apiconnector";
import { paymentEndpoints } from "../apis";
import toast from "react-hot-toast";

export const purchaseCourse = async (courseId, token) => {
  const toastId = toast.loading("Processing...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      paymentEndpoints.PURCHASE_COURSE_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course purchased successfully");
    result = response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Purchase failed");
  }

  toast.dismiss(toastId);
  return result;
};
