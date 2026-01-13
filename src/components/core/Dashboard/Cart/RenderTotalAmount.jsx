import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../../common/IconBtn";
import { purchaseCourse } from "../../../../services/operations/paymentAPI";
import { resetCart } from "../../../../slices/cartSlice";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) return;

    try {
      // Buy courses one by one
      for (const course of cart) {
        await purchaseCourse(course._id, token);
      }

      // Clear cart after successful purchase
      dispatch(resetCart());

      navigate("/dashboard/enrolled-courses");
    } catch (error) {
      console.log("Purchase failed", error);
    }
  };

  return (
    <div className="min-w-[280px] rounded-md border border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
}
