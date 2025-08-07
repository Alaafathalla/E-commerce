import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import login from "../../assets/login.png";
const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    region: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    region: Yup.string().required("Region/State is required"),
  });

  const onSubmit = (values) => {
    console.log("Register form submitted:", values);
    // Add register API logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 space-y-6">
        {/* Logo */}
        <div className="text-center">
          <img src={login} alt="Logo" className="w-16 h-16 mx-auto mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">FoodTrove</h1>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Row 1: First + Last Name */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    First Name*
                  </label>
                  <Field
                    name="firstName"
                    placeholder="Enter your first name"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Last Name*
                  </label>
                  <Field
                    name="lastName"
                    placeholder="Enter your last name"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Row 2: Email + Phone */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email*
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Phone Number*
                  </label>
                  <Field
                    name="phone"
                    placeholder="Enter your phone number"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Address
                </label>
                <Field
                  name="address"
                  placeholder="Address"
                  className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Row 3: City + Post Code */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    City*
                  </label>
                  <Field
                    name="city"
                    placeholder="City"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="postCode" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Post Code
                  </label>
                  <Field
                    name="postCode"
                    placeholder="Post Code"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Row 4: Country + Region */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Country*
                  </label>
                  <Field
                    name="country"
                    placeholder="Country"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Region/State*
                  </label>
                  <Field
                    name="region"
                    placeholder="Region/State"
                    className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  />
                  <ErrorMessage name="region" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition duration-300"
              >
                {isSubmitting ? "Registering..." : "Signup"}
              </button>

              {/* Login Redirect */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Have an account?{" "}
                <a href="/login" className="text-red-500 hover:underline">
                  Login
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
