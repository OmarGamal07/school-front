import {useState} from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const NavbarA = () => {
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false)
  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/signin")
    toast.success("Logged out successfully!")
  }
  return (
    <>
    <button onClick={() => setOpened(prev => !prev)} className="xs:block lg:hidden mx-auto text-4xl pt-5">
      <i className="fa-solid fa-bars"></i>
    </button>
    <nav className="xs:w-[70%] lg:w-full mx-auto flex xs:flex-col lg:flex-row justify-evenly xs:hidden lg:flex py-4 font-mont">
      <Link to={'/a/courses'} className="border-b-4 cursor-pointer border-b-violet-600 p-3 px-6 font-bold hover:scale-[1.1] duration-500 rounded-md">Courses</Link>
      <Link to={'/a/AdminDashboard'} className="border-b-4 cursor-pointer border-b-violet-600 p-3 px-6 font-bold hover:scale-[1.1] duration-500 rounded-md">Examination</Link>
      <Link to={'/a/schedule'} className="border-b-4 cursor-pointer border-b-violet-600 p-3 px-6 font-bold hover:scale-[1.1] duration-500 rounded-md">Schedule</Link>
      <Link to={'/a/result'} className="border-b-4 cursor-pointer border-b-violet-600 p-3 px-6 font-bold hover:scale-[1.1] duration-500 rounded-md">Result</Link>
      <Link to={'/'} onClick={logOut} className="border-b-4 border-b-violet-600 p-3 px-6 font-bold hover:scale-[1.1] cursor-pointer duration-500 rounded-md">Logout</Link>
    </nav>

    {/* <!-- Small screens menu --> */}
    {
      opened &&
      <nav className="xs:w-[70%] lg:w-full mx-auto xs:flex lg:hidden xs:flex-col lg:flex-row justify-evenly py-4 font-mont">
        <Link to={'/a/courses'} className="border-b-4 cursor-pointer border-b-violet-600 p-3 px-6 font-bold lk rounded-md">Courses</Link>
        <Link to={'/a/AdminDashboard'} className="border-b-4 cursor-pointer border-b-violet-600 p-3 px-6 font-bold lk rounded-md">Examination</Link>
        <Link to={'/a/schedule'} className="border-b-4 cursor-pointer border-b-violet-600 p-3 px-6 font-bold lk rounded-md">Schedule</Link>
        <Link to={'/a/result'} className="border-b-4 cursor-pointer border-b-violet-600 p-3 px-6 font-bold lk rounded-md">Result</Link>
        <Link to={'/'} onClick={logOut} className="border-b-4 border-b-violet-600 p-3 px-6 font-bold lk rounded-md cursor-pointer">Logout</Link>
      </nav>
    }
    </>
  )
}

export default NavbarA