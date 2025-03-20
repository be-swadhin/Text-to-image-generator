import React, { useState, useEffect } from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(5);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(5);
      }
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const getVisibleTestimonials = () => {
    return testimonialsData
      .slice(currentIndex, currentIndex + visibleCards)
      .concat(
        testimonialsData.slice(
          0,
          Math.max(0, currentIndex + visibleCards - testimonialsData.length)
        )
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12 px-4"
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-green-600 text-transparent bg-clip-text drop-shadow-lg">
        Team Testimonials
      </h1>
      <p className="text-gray-500 text-base sm:text-lg mb-8 text-center">
        What Our Users Are Saying
      </p>

      <div className="relative w-full max-w-6xl flex items-center justify-center overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="flex space-x-4 w-full justify-center overflow-hidden px-2 sm:px-4">
          <AnimatePresence mode="wait">
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative bg-white/20 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-lg border border-sky-500/30 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 text-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-sky-400 hover:bg-white/40"
              >
                <div className="flex flex-col items-center relative z-10">
                  <img
                    src={testimonial.image}
                    className="w-14 sm:w-16 h-14 sm:h-16 rounded-full shadow-lg border-1 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 p-1 transition-all duration-300 ease-in-out hover:scale-110"
                    alt="user"
                  />
                  <h2 className="text-lg sm:text-2xl font-semibold mt-3 text-gray-800 transition-all duration-300 ease-in-out hover:text-blue-600">
                    {testimonial.name}
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base transition-all duration-300 ease-in-out hover:text-gray-700">
                    {testimonial.role}
                  </p>

                  <div className="flex my-3 sm:my-4 space-x-1">
                    {Array(testimonial.stars)
                      .fill()
                      .map((_, i) => (
                        <img
                          key={i}
                          src={assets.rating_star}
                          className="w-4 sm:w-5 h-4 sm:h-5 drop-shadow-md animate-pulse transition-all duration-300 ease-in-out hover:scale-110"
                          alt="star"
                        />
                      ))}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed transition-all duration-300 ease-in-out hover:text-gray-800">
                    {testimonial.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </motion.div>
  );
};

export default Testimonials;