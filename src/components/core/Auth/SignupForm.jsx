import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../../slices/authSlice";
import { sendOTP } from "../../../services/operations/authAPI";
import { toast } from "react-hot-toast";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      accountType: ACCOUNT_TYPE.STUDENT,
    },
  });
  const accountType = watch("accountType");
  function submitHandler(data) {
    if (data.password !== data.confirmPassword) {
      toast.error("Password Do Not Match Confirm Password");
      return;
    }
    dispatch(setSignupData(data));
    dispatch(sendOTP(data.email, navigate));
    if (isSubmitSuccessful) {
      reset();
    }
  }
  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      <div
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
      >
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setValue("accountType", tab.type)}
            className={`${
              accountType === tab.type
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex w-full flex-col gap-y-4"
      >
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("firstName", {
                required: true,
              })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                First Name is required
              </p>
            )}
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("lastName", {
                required: true,
              })}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">Last Name is required</p>
            )}
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            name="email"
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">Email is required</p>
          )}
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                Confirm password is required
              </p>
            )}
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
