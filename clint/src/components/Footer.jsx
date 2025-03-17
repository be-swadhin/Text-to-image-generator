import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const [message, setMessage] = useState("");

  const sendWhatsAppMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/9348716090?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="bg-gradient-to-r from-black via-blue-900 to-purple-900 text-white py-12 px-6 mt-20">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-start">
          <img src={assets.logo} width={120} alt="GenArtify Logo" />
          <p className="text-sm text-gray-300 mt-2">
            Copyright © GenArtify 2024 - 2025 | All rights reserved.
          </p>
        </div>

        {/* Contact Section with Glassmorphism */}
        <div className="flex flex-col flex-1 bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
          <textarea 
            className="w-full p-3 rounded-md text-black focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button 
            onClick={sendWhatsAppMessage} 
            className="mt-3 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-green-500/50"
          >
            <FaWhatsapp className="text-lg" /> Message on WhatsApp
          </button>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        Designed with 💙 by <span className="text-blue-400 font-medium">GenArtify Team</span>
      </div>
    </div>
  );
};

export default Footer;
