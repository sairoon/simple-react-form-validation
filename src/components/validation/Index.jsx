import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";

const FormValidation = () => {
  // State to store form field values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});
  // State to toggle password visibility for both password fields
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle password visibility for both password fields
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword } = formData;

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password should be at least 8 characters";
    }

    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Password not matched";
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Form Validation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded-md bg-gray-700 text-white border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-gray-700 text-white border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                placeholder="Enter your email"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                {/* Email icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-gray-700 text-white border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                placeholder="••••••"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              >
                {/* Eye icon for show/hide password */}
                {showPassword ? <RxEyeClosed /> : <TfiEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 rounded-md bg-gray-700 text-white border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                placeholder="••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormValidation;
