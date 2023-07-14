import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../components/Logo'
import { toast } from 'react-toastify'

const NavbarT = () => {
  const navigate = useNavigate()
  // States
  const [isOpened, setIsOpened] = useState(false)
  // Functions
  const toggleMenu = () => {
    setIsOpened(prev => !prev)
  }
  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/signin")
    toast.success("Logged out successfully!")
  }
  return (
    <nav className="flex justify-between items-center font-mont fixed w-full bg-transparent top-0 z-30 bg-gradient-to-r from-white to-[#8d46ff] shadow-md shadow-black/30 p-5 px-12 z-50">
      {/* <!-- Logo --> */}
      <Link to="/" className='space-x-2'>
        <Logo/>
        <span className='font-semibold'>
          School Managment
        </span>
      </Link>
      <button onClick={toggleMenu} className="text-4xl xs:block lg:hidden text-white"><i className="fa-solid fa-bars"></i></button>
      <ul className="space-x-4 xs:hidden lg:flex items-center">
        <Link to="/t/" className="text-white text-xl font-bold">Home</Link>
        <Link to="/t/courses" className="text-white text-xl font-bold">All Courses</Link>
        <Link to="/t/my-courses" className="text-white text-xl font-bold">My Courses</Link>
        <Link to="/t/homework" className="text-white text-xl font-bold">Homework</Link>
        <Link to="/t/result" className="text-white text-xl font-bold">Results</Link>
        <Link to="/t/correctExam" className="text-white text-xl font-bold">CorrectExam</Link>
        <Link to="/t/profile" className="text-white text-xl font-bold">Profile</Link>
        
        <Link onClick={logOut} className="text-white text-xl font-bold">Logout</Link>
      </ul>
      {/* <!-- Mobile Menu --> */}
      <ul className={`${isOpened ? 'scale-[1]':'scale-0'} fixed w-full h-full justify-center items-center left-0 top-0 duration-500 space-y-4 bg-black flex flex-col`}>
        <button onClick={toggleMenu} className="absolute top-10 right-10 text-4xl text-white"><i className="fa-solid fa-xmark"></i></button>
        <Link onClick={toggleMenu} to="/t/" className="text-white text-xl font-bold duration-500 hover:pl-5">Home</Link>
        <Link onClick={toggleMenu} to="/t/courses" className="text-white text-xl font-bold duration-500 hover:pl-5">All Courses</Link>
        <Link onClick={toggleMenu} to="/t/my-courses" className="text-white text-xl font-bold duration-500 hover:pl-5">My Courses</Link>
        <Link onClick={toggleMenu} to="/t/homework" className="text-white text-xl font-bold duration-500 hover:pl-5">Home Work</Link>
        <Link onClick={toggleMenu} to="/t/result" className="text-white text-xl font-bold duration-500 hover:pl-5">Results</Link>
        <Link onClick={toggleMenu} to="/t/correctExam" className="text-white text-xl font-bold duration-500 hover:pl-5">Correct Exam</Link>
        <Link onClick={toggleMenu} to="/t/profile" className="text-white text-xl font-bold duration-500 hover:pl-5">Profile</Link>
        
        <Link onClick={logOut} className="text-white text-xl font-bold duration-500 hover:pl-5">Logout</Link>
      </ul>
    </nav>
  )
}

export default NavbarT