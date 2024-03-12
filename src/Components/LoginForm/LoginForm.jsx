import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import EyeIcon from "../shared/EyeIcon/EyeIcon";
import EyeSlashIcon from "./../shared/EyeSlashIcon/EyeSlashIcon";

import "react-toastify/dist/ReactToastify.min.css";

// BACKEND API
import { BASE_URL } from "./../../Service/API";

export default function LoginForm() {
  // ********** States ***********
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ********** Handlers ***************
  const loginHandler = async (user) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/v1/users/sign-in`, user);
      console.log(data);
      const token = data.data.access_token;
      const userId = data.data.user._id;
      const username = data.data.user.username;
      const gender = data.data.user.gender;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("gender", gender);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(`${error.response.data.message} 😞`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  // ----------- for navigation -----------
  const navigate = useNavigate();

  // ---------- for form validation ----------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="flex justify-center items-center mt-28 mb-11">
        <div className="w-[90%] mx-auto">
          <div className="bg-formColor flex flex-col-reverse lg:flex-row lg:w-[75%] rounded-xl mx-auto shadow-xl overflow-hidden">
            <div className="w-full h-[32rem] lg:w-1/2 py-12 px-12 ">
              <h2 className="text-3xl mb-4">Login</h2>
              <p className="mb-4">Enter with your account</p>
              <form onSubmit={handleSubmit(loginHandler)}>
                <div className="flex flex-col gap-2">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Please enter a valid email format",
                      },
                    })}
                    type="email"
                    placeholder="example@mail.com"
                    name="email"
                    className={`w-full border border-gray-400 py-1 px-2 bg-transparent rounded ${
                      errors.email
                        ? "border border-red-600 focus:outline-none"
                        : ""
                    }`}
                  />
                  <p className="text-red-600">{errors.email?.message}</p>

                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 5, message: "Min length is 5" },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      name="password"
                      className={`w-full border border-gray-400 py-1 px-2 bg-transparent rounded outline-none ${
                        errors.password
                          ? "border border-red-600 focus:outline-none"
                          : ""
                      }`}
                    />

                    <button
                      onClick={toggleShowPassword}
                      className="absolute top-1/2 right-[5%] translate-x-0 -translate-y-[50%]"
                    >
                      {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                    </button>
                  </div>
                  <p className="text-red-600">{errors.password?.message}</p>
                  <button
                    type="submit"
                    className={`${
                      loading ? "loading" : ""
                    } text-white btn btn-primary capitalize text-lg cursor-pointer`}
                  >
                    Login
                  </button>
                  <div className="flex gap-2">
                    <span>Don't have an account?</span>
                    <Link to="/register" className="link link-primary">
                      Signup
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            <div className="w-full h-[32rem] lg:w-1/2 bg-bgImg bg-cover bg-center bg-no-repeat flex justify-center items-center">
              <div className="text-center px-[10px] leading-5">
                <h1 className="text-white text-3xl">Welcome Back</h1>
                <p className="text-white">
                Be ready to discover your next favorite show, Your Destination for Insightful
                  Blogging
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </>
  );
}
