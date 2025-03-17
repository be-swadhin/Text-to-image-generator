import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, { headers: { token } });
          if (data.success) {
            loadCreditsData();
            navigate('/');
            toast.success('Credit Added');
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } });

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-28 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0.2, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-12"
      >
        <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Upgrade Your Creativity
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Unlock the power of AI with the best credit plans for GenArtify.
        </p>
      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 px-6"
      >
        {plans.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gray-800 bg-opacity-30 backdrop-blur-lg shadow-lg rounded-2xl p-6 text-center border border-gray-700 hover:border-blue-500 transition-all"
          >
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 rounded-2xl blur-xl"></div>

            {/* Plan Details */}
            <img src={assets.logo} width={70} alt="GenArtify" className="mx-auto mb-3" />
            <h3 className="text-xl font-bold">{item.id}</h3>
            <p className="text-gray-400 text-sm mt-2">{item.desc}</p>

            {/* Price */}
            <p className="mt-4 text-2xl font-semibold">
              ₹{item.price} <span className="text-lg text-gray-300">/ {item.credits} credits</span>
            </p>

            {/* Purchase Button */}
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="w-full py-3 mt-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-lg tracking-wide shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
            >
              {user ? 'Buy Now' : 'Get Started'}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BuyCredit;
