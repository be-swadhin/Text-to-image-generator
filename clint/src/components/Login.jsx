import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = state === "Login" ? "/api/user/login" : "/api/user/register";
      const payload = state === "Login" ? { email, password } : { name, email, password };
      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(state === "Login" ? "Login Successfully" : "Account Created Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center bg-black/30 backdrop-blur-lg">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative bg-white/10 p-8 rounded-lg shadow-xl w-[90%] max-w-md border border-white/20 backdrop-blur-md"
      >
        {/* Close Button */}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className="absolute top-4 right-4 cursor-pointer w-5 hover:scale-110 transition"
          alt="Close"
        />

        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-white">{state}</h1>
        <p className="text-center text-gray-300 mb-6">{state === "Login" ? "Sign in to continue" : "Create a new account"}</p>

        {/* Input Fields */}
        {state !== "Login" && (
          <div className="relative mb-4">
            <img src={assets.profile_icon} className="absolute left-4 top-3 w-5 text-white" alt="User" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="w-full bg-white/5 pl-12 pr-4 py-3 text-white text-sm outline-none border border-white/30 shadow-md placeholder-gray-300"
              style={{ borderRadius: "0px", borderBottom: "3px solid #24B8A0" }}
            />
          </div>
        )}

        <div className="relative mb-4">
          <img src={assets.email_icon} className="absolute left-4 top-3 w-5 text-white" alt="Email" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email ID"
            required
            className="w-full bg-white/5 pl-12 pr-4 py-3 text-white text-sm outline-none border border-white/30 shadow-md placeholder-gray-300"
            style={{ borderRadius: "0px", borderBottom: "3px solid #24B8A0" }}
          />
        </div>

        <div className="relative mb-4">
          <img src={assets.lock_icon} className="absolute left-4 top-3 w-5 text-white" alt="Password" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="w-full bg-white/5 pl-12 pr-4 py-3 text-white text-sm outline-none border border-white/30 shadow-md placeholder-gray-300"
            style={{ borderRadius: "0px", borderBottom: "3px solid #24B8A0" }}
          />
        </div>

        {/* Forgot Password */}
        <p className="text-sm text-white text-right cursor-pointer hover:underline">Forgot password?</p>

        {/* Submit Button with Stylish Hover Effect */}
        <button
          className="w-full mt-4 bg-[#24B8A0] text-white py-3 text-lg font-semibold relative overflow-hidden group transition-all hover:scale-105 hover:bg-gradient-to-r from-[#1f9b89] to-[#24B8A0] hover:shadow-lg"
          style={{
            borderRadius: "0px",
            boxShadow: "0px 4px 15px rgba(36, 184, 160, 0.4)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {state === "Login" ? "Login" : "Create Account"}
          <span
            className="absolute inset-0 bg-[#1f9b89] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            style={{ zIndex: "-1", opacity: "0.8" }}
          ></span>
        </button>

        {/* Switch Between Login & Sign Up */}
        {state === "Login" ? (
          <p className="mt-4 text-center text-gray-300">
            Don't have an account?{" "}
            <span className="text-[#24B8A0] cursor-pointer font-medium hover:underline" onClick={() => setState("Sign Up")}>
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-gray-300">
            Already have an account?{" "}
            <span className="text-[#24B8A0] cursor-pointer font-medium hover:underline" onClick={() => setState("Login")}>
              Login
            </span>
          </p>
        )}
      </motion.form>
    </div>
  );
};

export default Login;
