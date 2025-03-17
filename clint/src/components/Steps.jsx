import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from "framer-motion"

const Steps = () => {
  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-32 px-4'
    >
      {/* Heading */}
      <h1 className='text-4xl sm:text-5xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
        How It Works
      </h1>

      <p className='text-lg text-gray-600 mb-12 max-w-xl text-center'>
        Transform Words Into Stunning Images with AI Magic
      </p>

      {/* Steps Section */}
      <div className='w-full max-w-5xl flex flex-col gap-10'>
        {stepsData.map((item, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`relative group flex items-center p-6 bg-white/30 backdrop-blur-lg shadow-lg border border-gray-300/50 rounded-xl transition-all duration-300 hover:border-blue-500/70 hover:shadow-xl hover:-translate-y-1 cursor-pointer
              ${index % 2 === 0 ? "self-start" : "self-end"} w-full sm:w-1/2`} // Half-width styling
          >
            {/* Step Number */}
            <div className={`absolute top-0 ${index % 2 === 0 ? "left-0" : "right-0"} bg-blue-500 text-white px-3 py-1 text-sm font-bold rounded-br-lg rounded-tl-lg`}>
              Step {index + 1}
            </div>

            {/* Step Icon */}
            <div className='bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl shadow-lg'>
              <img width={40} src={item.icon} alt="" />
            </div>

            {/* Step Content */}
            <div className={`max-w-md ${index % 2 === 0 ? "ml-6 text-left" : "mr-6 text-right"}`}>
              <h2 className='text-xl font-semibold text-gray-800 transition-all duration-300 group-hover:text-blue-600'>
                {item.title}
              </h2>
              <p className='text-gray-500 group-hover:text-gray-700 transition-all duration-300'>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
