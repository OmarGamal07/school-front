import { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Logo from '../../../components/Logo'

const NavbarS = () => {
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
        <Link to="/s/" className="text-white text-xl font-bold">Home</Link>
        <Link to="/s/courses" className="text-white text-xl font-bold">Courses</Link>
        <Link to="/s/my-courses" className="text-white text-xl font-bold">My Courses</Link>
        <Link to="/s/homeworkResult" className="text-white text-xl font-bold">Homework Result</Link>

        <Link to="/s/examination" className="text-white text-xl font-bold">Examination</Link>
        <Link to="/s/schedule" className="text-white text-xl font-bold">Schedule</Link>
        <Link to="/s/profile" className="text-white text-xl font-bold">Profile</Link>
        <Link onClick={logOut} className="text-white text-xl font-bold">Logout</Link>
      </ul>
      {/* <!-- Mobile Menu --> */}
      <ul className={`${isOpened ? 'scale-[1]':'scale-0'} fixed w-full h-full justify-center items-center left-0 top-0 duration-500 space-y-4 bg-black flex flex-col`}>
        <button onClick={toggleMenu} className="absolute top-10 right-10 text-4xl text-white"><i className="fa-solid fa-xmark"></i></button>
        <Link onClick={toggleMenu} to="/s/" className="text-white text-xl font-bold duration-500 hover:pl-5">Home</Link>
        <Link onClick={toggleMenu} to="/s/courses" className="text-white text-xl font-bold duration-500 hover:pl-5">Courses</Link>
        <Link onClick={toggleMenu} to="/s/my-courses" className="text-white text-xl font-bold duration-500 hover:pl-5">My Courses</Link>
        <Link onClick={toggleMenu} to="/s/homeworkResult" className="text-white text-xl font-bold duration-500 hover:pl-5">Homework Result</Link>

        <Link onClick={toggleMenu} to="/s/examination" className="text-white text-xl font-bold duration-500 hover:pl-5">Examination</Link>
        <Link onClick={toggleMenu} to="/s/schedule" className="text-white text-xl font-bold duration-500 hover:pl-5">Schedule</Link>
        <Link onClick={toggleMenu} to="/s/Profile" className="text-white text-xl font-bold duration-500 hover:pl-5">Profile</Link>
        <Link onClick={logOut} className="text-white text-xl font-bold duration-500 hover:pl-5">Logout</Link>
      </ul>
    </nav>
  )
}

export default NavbarS