import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12"
    >
      {/* Heading with Better Gradient */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-green-600 text-transparent bg-clip-text drop-shadow-lg">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 text-lg mb-12">What Our Users Are Saying</p>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="relative bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-sky-500/30 w-80 mx-auto cursor-pointer hover:shadow-2xl transition-all overflow-hidden"
          >
            {/* Floating Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-3xl"></div>

            <div className="flex flex-col items-center relative z-10">
              {/* User Image */}
              <img
  src={testimonial.image}
  className="w-16 h-16 rounded-full shadow-lg border-1 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 p-1"
/>

              <h2 className="text-2xl font-semibold mt-3 text-gray-800">
                {testimonial.name}
              </h2>
              <p className="text-gray-500">{testimonial.role}</p>

              {/* Star Ratings with Glow */}
              <div className="flex my-4 space-x-1">
                {Array(testimonial.stars)
                  .fill()
                  .map((_, i) => (
                    <img
                      key={i}
                      src={assets.rating_star}
                      className="w-5 h-5 text-red-500 drop-shadow-md animate-pulse"
                      alt=""
                    />
                  ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-center text-sm text-gray-700 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
