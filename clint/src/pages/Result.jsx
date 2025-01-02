import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../context/AppContext';

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const {generateImage} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if(input){
      const image = await generateImage(input)

      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form 
      initial={{ opacity: 0.2, y: 100}}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
      <div className='relative'>
        <img src={image} alt="" className='max-w-sm rounded' />
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
      </div>
      <p className={!loading ? 'hidden' : ''}>Loading.....</p>
    </div>
          {!isImageLoaded && 
        <div className='flex w-full max-w-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm p-1 mt-10 rounded-full shadow-xl'>
          <input 
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder='Describe what you want to generate...' 
            className='flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-base sm:text-lg py-3 px-4 rounded-l-full' 
          />
          <button 
            type='submit' 
            className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white px-6 sm:px-10 py-3 rounded-r-full text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out shadow-lg'>
            Generate
          </button>
        </div>
      }
    </motion.form>
  )
}

export default Result