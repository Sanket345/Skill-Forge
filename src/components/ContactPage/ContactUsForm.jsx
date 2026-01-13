import React, { useEffect } from "react";
import countrycode from "../../data/countrycode.json";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";

const ContactUsForm = ({ setLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        message: "",
        countrycode: "+91",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const submitContactForm = async (data) => {
    setLoading(true);
    try {
      await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mx-auto flex flex-col justify-center items-center gap-10">
        <form
          onSubmit={handleSubmit(submitContactForm)}
          className="flex w-full flex-col gap-7"
        >
          {/* for name */}
          <div className="flex justify-between">
            <label htmlFor="firstName" className="w-[48%]">
              <p className="text-richblack-5 text-sm">First Name</p>
              <input
                type="input"
                placeholder="Enter first name"
                id="firstName"
                className="p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none"
                {...register("firstname", {
                  required: "First name is required",
                })}
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">
                  {errors.firstname.message}
                </p>
              )}
            </label>

            <label htmlFor="lastName" className="w-[48%]">
              <p className="text-richblack-5 text-sm">Last Name</p>
              <input
                type="input"
                placeholder="Enter last name"
                id="lastName"
                className="p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none"
                {...register("lastname", {
                  required: "Last name is required",
                })}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">
                  {errors.lastname.message}
                </p>
              )}
            </label>
          </div>

          {/* for email */}
          <label htmlFor="email">
            <p className="text-richblack-5 text-sm">Email Address</p>
            <input
              type="email"
              placeholder="Enter email address"
              id="email"
              className="p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </label>

          {/* for phone Number */}
          <div className="flex flex-col justify-between">
            <p className="text-richblack-5 text-sm">Phone Number</p>

            <div className="flex justify-between">
              <label htmlFor="code" className="w-[15%]">
                <select
                  className="p-3 rounded-lg bg-richblack-700 w-full h-12 mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none"
                  defaultValue="+91"
                  {...register("countrycode")}
                >
                  {countrycode.map((country, key) => (
                    <option key={key} value={country.code}>
                      {country.code} - {country.country}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="phoneNumber" className="w-[81%]">
                <input
                  type="tel"
                  minLength={10}
                  maxLength={10}
                  placeholder="12345 67890"
                  id="phoneNumber"
                  className="p-3 rounded-lg bg-richblack-700 w-full h-12 mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none"
                  {...register("phoneNo", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNo.message}
                  </p>
                )}
              </label>
            </div>
          </div>

          {/* text Area */}
          <label htmlFor="message">
            <p className="text-richblack-5 text-sm">Message</p>
            <textarea
              rows={7}
              cols={7}
              placeholder="Enter your message here"
              id="message"
              className="p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none"
              {...register("message", {
                required: "Message is required",
              })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </label>

          <button className="w-full bg-yellow-50 text-center flex justify-center item-center text-black font-semibold p-2 rounded-lg">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
