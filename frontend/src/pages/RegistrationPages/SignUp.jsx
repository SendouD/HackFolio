import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/SignUp.css";
import * as z from "zod";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const signUpSchema = z.object({
    firstName: z.string().regex(/^(?!\s)([A-Za-z]+(?: [A-Za-z]+)*){3,}$/, {
      message:
        'First name must contain at least 3 alphabetic characters and cannot have multiple consecutive spaces.',
    }),
    lastName: z.string().min(1, {
      value: 1,
      message: 'Last name must contain at least 1 alphabetic characters.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    // Username must be 3-20 characters long, contain only letters, numbers, and underscores, and cannot start or end with an underscore.
    username: z.string().regex(/^(?!_)(?!.*__)[A-Za-z0-9_]{3,20}(?<!_)$/, {
      message:
        'Username must be 3-20 characters long, contain only letters, numbers, and underscores, and cannot start or end with an underscore.',
    }),
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const nameRegex = /^[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!usernameRegex.test(username))
      newErrors.username =
        "Username must be 3-15 characters (letters, numbers, underscores)";
    if (!nameRegex.test(firstName))
      newErrors.firstName =
        "First name must contain only letters and be at least 2 characters";
    if (!nameRegex.test(lastName))
      newErrors.lastName =
        "Last name must contain only letters and be at least 2 characters";
    if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be at least 6 characters, including one number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/userlogin/signup`,
        {
          email,
          password,
          username,
          firstName,
          lastName,
        }
      );

      console.log(response);
      setSuccess("User created successfully!");
      navigate("/signin");
    } catch (err) {
      setErrors({ server: "Error signing up. Fix validation Errors." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full flex">
        <div className="w-1/2 p-8">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
              Create your account
            </h2>
            <p className="text-center mb-6 text-sm text-gray-500">
              Start sharing your projects today!
            </p>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Username"
                id="username"
                value={username}
                setValue={setUsername}
                error={errors.username}
              />
              <InputField
                label="First Name"
                id="first-name"
                value={firstName}
                setValue={setFirstName}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                id="last-name"
                value={lastName}
                setValue={setLastName}
                error={errors.lastName}
              />
              <InputField
                label="Email"
                id="email"
                value={email}
                setValue={setEmail}
                error={errors.email}
                type="email"
              />
              <InputField
                label="Password"
                id="password"
                value={password}
                setValue={setPassword}
                error={errors.password}
                type="password"
              />
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
            {errors.server && (
              <p className="mt-4 text-red-600 text-center">{errors.server}</p>
            )}
            {success && (
              <p className="mt-4 text-green-600 text-center">{success}</p>
            )}
          </div>
        </div>
        <WelcomeSection navigate={navigate} />
      </div>
    </div>
  );
};

const InputField = ({ label, id, value, setValue, error, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
      placeholder={label}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const WelcomeSection = ({ navigate }) => (
  <div className="w-1/2 bg-[#6366f1] text-white flex items-center justify-center p-8 relative overflow-hidden">
    <svg
      className="absolute bottom-0 left-0 w-full h-[150px] transform rotate-180 animate-wave"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill="#2dd4bf"
        fillOpacity="1"
        d="M0,128L48,106.7C96,85,192,43,288,42.7C384,43,480,85,576,128C672,171,768,213,864,202.7C960,192,1056,128,1152,122.7C1248,117,1344,171,1392,213.3L1440,256V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
        className="animate-linear-move"
      ></path>
      <circle
        cx="300"
        cy="170"
        r="150"
        fill="#172554"
        className="animate-bounce"
        style={{ animationDuration: "3.5s" }}
      ></circle>
      <circle
        cx="200"
        cy="300"
        r="100"
        fill="#facc15"
        className="animate-bounce"
        style={{ animationDuration: "3.0s" }}
      ></circle>
    </svg>
    <div className="text-center z-10">
      <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
      <p className="mb-6 text-lg">
        Sign in with your personal details to keep connected with your projects.
      </p>
      <button
        className="bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-gray-900"
        onClick={() => navigate("/signin")}
      >
        Sign In
      </button>
    </div>
  </div>
);

export default SignUp;

