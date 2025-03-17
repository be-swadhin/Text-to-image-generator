import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"

const Description = () => {
  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Create AI Images
      </h1>
      <p className="text-lg text-gray-500 mb-8 text-center">
        Turn your imagination into visuals effortlessly
      </p>

      {/* Content Section */}
      <div className="flex flex-col gap-8 md:gap-16 md:flex-row items-center">
        
        {/* Image Section with Floating Effect */}
        <motion.img 
          src={assets.sample_img_3} 
          className="w-80 xl:w-96 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" 
          alt="AI Generated" 
          whileHover={{ scale: 1.03 }}
        />

        {/* Text Section */}
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold text-gray-800 leading-snug mb-4">
            Introducing the <span className="text-blue-500">AI-Powered</span> Text-to-Image Generator
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into <span className="text-blue-500 font-medium">eye-catching images</span> with just a few clicks.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Simply type in a text prompt, and our <span className="text-purple-500 font-medium">cutting-edge AI</span> will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. <span className="text-blue-500">The creative possibilities are limitless!</span>
          </p>
        </div>

      </div>
    </motion.div>
  )
}

export default Description
