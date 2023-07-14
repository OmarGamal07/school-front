import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="xs:text-center lg:text-left p-12 py-24 bg-gradient-to-r from-[#6a43ff] text-white overflow-hidden to-[#8d46ff] mt-10">
      <div className="flex xs:flex-col lg:flex-row xs:space-y-10 lg:space-y-0 xs:space-x-0 lg:space-x-14">
        <div className="xs:w-full lg:w-[45%] space-y-3">
          <div className="rounded-lg space-x-4">
            <Logo/>
            <span>School management system</span>
          </div>
          <p className="text-gray-400">Education is the most powerful weapon which you can use to change the world.</p>
        </div>
        <div className="space-y-3">
          <h4 className="text-2xl font-semibold">Permalinks</h4>
          <ul className="space-y-4">
            <Link to="/" className="duration-300 hover:pl-2 hover:text-gray-200 block text-gray-400">Home</Link>
            <Link to="/courses" className="duration-300 hover:pl-2 hover:text-gray-200 block text-gray-400">Courses</Link>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-2xl font-semibold">Privacy</h4>
          <ul className="space-y-4">
            <Link to={"/"} className="duration-300 hover:pl-2 hover:text-gray-200 block whitespace-nowrap text-gray-400">Terms and conditions</Link>
            <Link to={"/"} className="duration-300 hover:pl-2 hover:text-gray-200 block text-gray-400">Privacy policy</Link>
            <Link to={"/"} className="duration-300 hover:pl-2 hover:text-gray-200 block text-gray-400">Refund policy</Link>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-2xl font-semibold">Contact us</h4>
          <address className="space-y-4 text-gray-400">
            +0151484858
            omargamal@gmail.com
          </address>
          <ul className="flex space-x-4 xs:justify-center lg:justify-start">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-youtube"></i>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer