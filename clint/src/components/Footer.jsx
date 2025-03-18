import React, { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error('Please enter a valid email');
      return;
    }
    toast.success('Subscribed successfully!');
    setEmail('');
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a message before sending');
      return;
    }
    toast.success('Message sent successfully!');
    setMessage('');
  };

  return (
    <div className="bg-gradient-to-r from-black via-blue-900 to-purple-900 text-white py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo and Branding */}
        <div className="flex flex-col items-start">
          <img src={assets.logo} width={120} alt="GenArtify Logo" />
          <p className="text-gray-400 mt-2">Thoughtful AI for creative minds.</p>
        </div>

        {/* Subscription Box - Hides on Mobile */}
        <div className="hidden md:flex flex-col bg-white bg-opacity-10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/20 w-96">
          <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
          <input 
            type="email" 
            placeholder="Your email" 
            className="w-full p-3 rounded-md text-black focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            onClick={handleSubscribe} 
            className="mt-3 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all shadow-md"
          >
            Subscribe
          </button>
        </div>

        {/* Contact and Social Links */}
        <div className="flex flex-col gap-4 items-start">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/gen_artify/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl cursor-pointer hover:text-pink-500" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61574244897589" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-2xl cursor-pointer hover:text-blue-500" />
            </a>
          </div>

          {/* Message Box */}
          <h3 className="text-lg font-semibold mt-4">Send us a Message</h3>
          <textarea
            placeholder="Type your message here..."
            className="w-full p-3 rounded-md text-black focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            onClick={handleSendMessage} 
            className="mt-3 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all shadow-md"
          >
            Send Message
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-gray-400 text-sm border-t border-gray-700 pt-4">
        <p>Copyright © GenArtify 2024 - 2025 | All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="hover:text-white">Privacy Policy</a> | 
          <a href="#" className="hover:text-white ml-2">Terms and Conditions</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
