import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      {/* Gradient Text with a Stronger Glow Effect */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold py-6 md:py-16 leading-tight 
      bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-transparent bg-clip-text 
      drop-shadow-[0px_0px_10px_rgba(80,80,255,0.6)]">
        See the Magic. Try Now!
      </h1>

      {/* Stylish & Shining Glow Button */}
      <motion.button
        onClick={onClickHandler}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative inline-flex items-center justify-center gap-3 px-12 py-4 
        rounded-full text-white font-medium text-lg tracking-wide transition-all duration-500 ease-in-out
        bg-gradient-to-r from-blue-500 to-purple-600 
        shadow-[0px_0px_15px_rgba(80,80,255,0.5)] 
        hover:shadow-[0px_0px_25px_rgba(120,120,255,0.8),0px_0px_30px_rgba(160,80,255,0.6)] 
        hover:from-blue-400 hover:to-purple-500"
      >
        Generate Images
        <motion.img
          src={assets.star_group}
          className="h-6 opacity-90 drop-shadow-lg"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          alt=""
        />
      </motion.button>
    </motion.div>
  );
};

export default GenerateBtn;
