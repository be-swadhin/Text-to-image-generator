import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import { AppContext } from '../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_6);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast.error("Please enter a description before generating!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setLoading(true);
    const generatedImage = await generateImage(input);
    if (generatedImage) {
      setIsImageLoaded(true);
      setImage(generatedImage);
    }
    setLoading(false);
  };

  const onDownloadHandler = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'generated-image.png';
    link.click();

    toast.success("Image downloaded successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const onGenerateAgainHandler = () => {
    setIsImageLoaded(false);
    setInput('');
    setImage(assets.sample_img_1);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <motion.form
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSubmitHandler}
        className="flex flex-col min-h-[90vh] justify-center items-center px-4 sm:px-8"
      >
        <div>
          <div className="relative">
            <img src={image} alt="Generated Preview" className="max-w-full sm:max-w-sm rounded" />
            <span
              className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
                loading ? 'w-full transition-all duration-[10s]' : 'w-0'
              }`}
            />
          </div>
          <p className={`text-center mt-2 ${!loading ? 'hidden' : ''}`}>Loading.....</p>
        </div>

        {!isImageLoaded ? (
          <div className="flex flex-col sm:flex-row w-full max-w-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm p-1 mt-10 rounded-full shadow-xl">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Describe your goal..."
              className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400 text-base py-3 px-4 rounded-t-full sm:rounded-l-full sm:rounded-t-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white px-6 py-3 rounded-b-full sm:rounded-r-full sm:rounded-b-none text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out shadow-lg"
            >
              Generate
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-10 mt-8 items-center">
            <button
              onClick={onGenerateAgainHandler}
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 px-8 py-4 rounded-full text-base sm:text-lg font-bold shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              Generate Again
            </button>
            <button
              onClick={onDownloadHandler}
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 px-8 py-4 rounded-full text-base sm:text-lg font-bold shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              Download
            </button>
          </div>
        )}
      </motion.form>
    </>
  );
};

export default Result;
