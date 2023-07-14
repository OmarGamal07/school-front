import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const TeacherGuard = () => {
  const isTeacher = () => {
    const token = localStorage.getItem("token");
    const teacher = jwtDecode(token);
    return teacher.role === 'teacher'
  };
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  return (
    isLoggedIn() && isTeacher() ?
    <Outlet/> 
    :
    <Navigate to='/signin'/>
  )
};

export default TeacherGuard;
