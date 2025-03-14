import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo} width={90} alt="" />

      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright ©Sambit 2024 | All right reserved.</p>

      <div className='flex gap-2.5'>
        <a href="https://www.facebook.com/sahoo.sambit.56/">
          <img src={assets.facebook_icon} width={35} alt="" />
        </a>
        <a href="https://www.instagram.com/thesambit_360/">
          <img src={assets.instagram_icon} width={35} alt="" />
        </a>
        <a href="https://x.com/Sambit6090">
          <img src={assets.twitter_icon} width={35} alt="" />
        </a>
      </div>
    </div>
  )
}

export default Footer
