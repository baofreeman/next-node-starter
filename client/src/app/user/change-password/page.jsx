"use client";

import { useFormik } from "formik";
import { changePasswordSchema } from "@/app/validations/schema";
import { useState } from "react";
import { useChangePasswordMutation } from "@/lib/services/auth";
import LoadingIndicator from "@/components/LoadingIndicator";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialValues = {
  password: "",
  password_confirmation: "",
};

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, action) => {
      setIsLoading(true);
      try {
        const response = await changePassword(values);
        if (response.data && response.data.status === "success") {
          setIsLoading(false);
          action.resetForm();
          toast.success(response.data.message);
          router.push("/user/profile");
        }

        if (response.error && response.error.data.status === "failed") {
          setIsLoading(false);
          toast.error(response.error.data.message);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
  });
  console.log(errors);
  return (
    <>
      {isLoading && <LoadingIndicator />}
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Confirm Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-2">
                New Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                placeholder="Enter your name"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password_confirmation"
                className="block font-medium mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="text"
                id="password_confirmation"
                name="password_confirmation"
                value={values.password_confirmation}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 p-2"
                placeholder="Enter your name"
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-2 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium disabled:bg-gray-400 rounded-md"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
