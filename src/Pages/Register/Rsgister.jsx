import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import login from "../../assets/login.png";

const Register = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    city: "",
    postCode: "",
    country: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setApiError("");
    setApiSuccess("");
    try {
      const { data } = await axios.post(
        "https://dummyjson.com/users/add",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          password: values.password, // just echoed back by DummyJSON
          address: {
            address: values.address || "",
            city: values.city,
            postalCode: values.postCode || "",
            country: values.country,
          },
        },
        {
          headers: { "Content-Type": "application/json" }, // explicit to avoid CORS oddities
          timeout: 10000,
        }
      );

      console.log("Created user:", data);
      setApiSuccess("Account created! Redirecting to login…");
      resetForm();
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      const msg =
        (err.response && (err.response.data?.message || err.response.data?.error)) ||
        err.message ||
        "Signup failed. Please try again.";
      setApiError(msg);
      console.error("Signup error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 space-y-6">
        <div className="text-center">
          <img src={login} alt="Logo" className="w-16 h-16 mx-auto mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">FoodTrove</h1>
        </div>

        {apiError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{apiError}</div>
        )}
        {apiSuccess && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2">{apiSuccess}</div>
        )}

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium">First Name*</label>
                  <Field name="firstName" placeholder="Enter your first name" className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Last Name*</label>
                  <Field name="lastName" placeholder="Enter your last name" className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Email*</label>
                  <Field type="email" name="email" placeholder="Enter your email" className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Phone Number*</label>
                  <Field name="phone" placeholder="Enter your phone number" className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Address</label>
                <Field name="address" placeholder="Address" className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white" />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium">City*</label>
                  <Field name="city" placeholder="City" className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Post Code</label>
                  <Field name="postCode" placeholder="Post Code" className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Country*</label>
                  <Field name="country" placeholder="Country" className="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white" />
                  <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="w-1/2 relative">
                  <label className="block text-sm font-medium">Password*</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Choose a password"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring focus:ring-red-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-9 right-3 text-gray-500 dark:text-gray-300"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition duration-300">
                {isSubmitting ? "Registering..." : "Signup"}
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Have an account? <a href="#login" className="text-red-500 hover:underline">Login</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;

