import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between py-1'>
      <Link to='/'>
        <img 
          src={assets.logo} 
          alt="" 
          className='w-24 sm:w-28 lg:w-32 shrink-0 transition-transform duration-300 hover:scale-110' 
        />
      </Link>
      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <button 
              onClick={() => navigate('/buy')} 
              className="flex items-center gap-2 px-6 py-2 sm:px-8 sm:py-2.5 
                        text-white text-sm font-medium transition-all duration-300 
                        bg-sky-800 hover:bg-gradient-to-r from-purple-500 to-blue-500 
                        hover:scale-105 hover:shadow-md"
              style={{
                clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)",
                padding: "6px 18px",
              }}
            >
              <img className="w-5 filter invert brightness-0" src={assets.credit_star} alt="Credit Star" />
              <p>Credit left : {credit}</p>
            </button>

            <p className="text-white bg-gradient-to-r from-purple-500 to-blue-500 
              px-5 py-1.5 text-xs sm:text-sm font-semibold 
              shadow-md max-sm:hidden animate-fadeIn"
              style={{
                clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)"
              }}>
              👋 Hi, {user.name}!
            </p>

            <div className='relative group'>
            <img 
              src={assets.profile_icon} 
              className="w-10 h-10 rounded-full border-2 border-transparent 
                        transition-all duration-300 drop-shadow-md
                        group-hover:border-transparent 
                        group-hover:shadow-[0px_0px_15px_3px_rgba(239,68,68,0.7)]
                        group-hover:scale-110"
              alt="Profile"
            />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 border text-sm'>
                  <li 
                    onClick={logout} 
                    className="bg-red-600 text-white px-6 py-1 sm:px-8 text-small transition-all duration-300 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 hover:shadow-md"
                    style={{
                      clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)",
                      padding: "6px 18px",
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            {/* Shaped "Pricing" Button with Arrow Effect */}
            <button 
              onClick={() => navigate('/buy')} 
              className="bg-green-600 text-white px-6 py-2 text-sm transition-all duration-300 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 hover:shadow-md"
              style={{
                clipPath: "polygon(0% 50%, 10% 0%, 100% 0%, 90% 50%, 100% 100%, 10% 100%)",
                padding: "6px 22px",
              }}
            >
              Pricing
            </button>

            {/* Login Button */}
            <button 
              onClick={() => setShowLogin(true)} 
              className="bg-sky-800 text-white px-6 py-2 text-sm transition-all duration-300 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 hover:shadow-md"
              style={{
                clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)",
                padding: "6px 18px",
              }}
            >
              Login
            </button>

          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
