import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  
  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  const sampleImages = [
    assets.sample_img_1,
    assets.sample_img_2,
    assets.sample_img_3,
    assets.sample_img_4,
    assets.sample_img_5,
    assets.sample_img_6,
  ];

  return (
    <motion.div 
      className='flex flex-col justify-center items-center text-center my-20'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Tagline with Animation */}
      <motion.div 
        className="text-stone-500 inline-flex items-center text-center gap-3 bg-white px-6 py-2 
                   rounded-full border border-neutral-500 shadow-lg transition-all duration-500
                   hover:scale-110 hover:shadow-xl hover:border-purple-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-sm sm:text-base font-semibold text-purple-700">
          Your AI-Powered Image Generator
        </p>
        <img 
          src={assets.star_icon} 
          alt="Star Icon" 
          className="w-6 h-6 transition-all duration-500 animate-spin-slow"
        />
      </motion.div>

      {/* Main Heading */}
      <motion.h1 
  className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center 
             bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-transparent bg-clip-text
             drop-shadow-md'
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4, duration: 2 }}
>
  Transform <span>words</span> into <span>visuals</span> instantly
</motion.h1>



      {/* Subtext */}
      <motion.p 
        className='text-center max-w-xl mx-auto mt-5 text-gray-600'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Experience the magic of AI and creativity. Simply describe what you imagine, and let GenArtify bring it to life.
      </motion.p>

      {/* Button */}
      <motion.button 
        onClick={onClickHandler} 
        className="relative sm:text-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 w-auto mt-8 px-12 py-3 flex items-center gap-2 rounded-full shadow-lg 
                  transition-all duration-500 hover:shadow-[0px_0px_20px_#7b61ff,0px_0px_40px_#7b61ff] hover:-translate-y-1"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
      >
        Generate Images ✨
      </motion.button>

      {/* Image Grid */}
      <motion.div 
        className='grid grid-cols-3 sm:grid-cols-6 gap-6 mt-16'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        {sampleImages.map((imgSrc, index) => (
          <motion.img
            whileHover={{ scale: 1.1, duration: 0.1 }}
            className='rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer w-24 sm:w-28 md:w-32 lg:w-36 shadow-lg hover:shadow-xl'
            src={imgSrc}
            alt={`Sample ${index + 1}`}
            key={index}
          />
        ))}
      </motion.div>

      {/* Footer Text */}
      <motion.p 
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className='mt-2 text-neutral-600 font-medium'
      >
        Stunning creations by GenArtify
      </motion.p>
    </motion.div>
  );
};

export default Header;