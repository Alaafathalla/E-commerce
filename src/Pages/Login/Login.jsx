import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import login from "../../assets/login.png"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
  });

  const onSubmit = (values) => {
    console.log("Login submitted:", values);
    // TODO: Add real login logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 space-y-6">
        {/* Logo */}
        <div className="text-center">
          <img src= {login} alt="Logo" className="w-16 h-16 mx-auto mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">FoodTrove</h1>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email Address*
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring focus:ring-red-200"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password with toggle */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password*
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring focus:ring-red-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-9 right-3 text-gray-500 dark:text-gray-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Remember me + forgot */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <label className="flex items-center gap-2">
                  <Field type="checkbox" name="remember" />
                  Remember Me
                </label>
                <a href="#" className="text-red-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition duration-300"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Signup */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don’t have an account?{" "}
                <a href="/register" className="text-red-500 hover:underline">
                  Signup
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

