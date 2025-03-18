import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const [forgotPassword, setForgotPassword] = useState(false);
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Prevents multiple clicks

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevents double submission
    setLoading(true);

    if (!email || (!forgotPassword && !password)) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    if (forgotPassword) {
      // Reset Password Logic
      if (!newPassword || newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
          email,
          newPassword,
        });

        if (data.success) {
          toast.success("Password reset successfully");
          setForgotPassword(false);
          setState("Login");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
      setLoading(false);
      return;
    }

    // Login/Register Logic
    try {
      const endpoint = state === "Login" ? "/api/user/login" : "/api/user/register";
      const payload = state === "Login" ? { email, password } : { name, email, password };

      if (state === "Sign Up" && password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(state === "Login" ? "Login Successful" : "Account Created Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }

    setLoading(false);
  };


  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-sm shadow-2xl"
      >
        <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
          {forgotPassword ? "Reset Password" : state}
        </h1>
        <p className="text-center text-md text-gray-500 italic mb-6">
          {forgotPassword ? "Enter your email and new password" : "Welcome back! Please sign in to continue"}
        </p>

        {!forgotPassword && state !== "Login" && (
          <div className="input-container">
            <img src={assets.profile_icon} width={25} className="-ml-1" alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="input-field"
            />
          </div>
        )}

        <div className="input-container">
          <img src={assets.email_icon} alt="" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email id"
            required
            className="input-field"
          />
        </div>

        {!forgotPassword ? (
          <div className="input-container">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="input-field"
            />
          </div>
        ) : (
          <>
            <div className="input-container">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                placeholder="New Password"
                required
                className="input-field"
              />
            </div>
            <div className="input-container">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm Password"
                required
                className="input-field"
              />
            </div>
          </>
        )}

        {!forgotPassword && (
          <p
            className="text-sm text-violet-600 my-4 cursor-pointer hover:underline"
            onClick={() => setForgotPassword(true)}
          >
            Forgot password?
          </p>
        )}

        <button className="submit-btn" disabled={loading}>
          {loading ? "Processing..." : forgotPassword ? "Reset Password" : state}
        </button>

        {forgotPassword && (
          <p
            className="text-sm text-gray-600 text-center mt-4 cursor-pointer hover:underline"
            onClick={() => setForgotPassword(false)}
          >
            Go Back
          </p>
        )}

        {!forgotPassword && (
          <p className="mt-5 text-center text-sm text-gray-600">
            {state === "Login" ? (
              <>
                Don't have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline font-semibold" onClick={() => setState("Sign Up")}>
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline font-semibold" onClick={() => setState("Login")}>
                  Login
                </span>
              </>
            )}
          </p>
        )}

        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className="absolute top-5 right-5 cursor-pointer" alt="Close" />
      </motion.form>
      <style jsx>{`
        .input-container {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          margin-bottom: 15px;
          border: 2px solid transparent;
          border-radius: 9999px;
          background-color: white;
          transition: all 0.3s ease-in-out;
        }
        .input-container:hover {
          border-color: #4f46e5;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .input-field {
          flex-grow: 1;
          border: none;
          outline: none;
          font-size: 14px;
        }
        .submit-btn {
          background-color: #4f46e5;
          color: white;
          padding: 10px 0;
          border-radius: 9999px;
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
        .submit-btn:hover {
          background-color: #4338ca;
        }
      `}</style>
    </div>
  );
};

export default Login;
