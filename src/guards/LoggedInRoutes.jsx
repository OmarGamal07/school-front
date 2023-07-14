import jwtDecode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInGuard = () => {
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token;
  };
  const isTeacher = () => {
    const token = localStorage.getItem("token");
    const teacher = jwtDecode(token);
    console.log(teacher);
    return teacher.role === "teacher";
  };
  const isStudent = () => {
    const token = localStorage.getItem("token");
    const student = jwtDecode(token);
    return student.role === "student";
  };
  const isAdmin = () => {
    const token = localStorage.getItem("token");
    const admin = jwtDecode(token);
    return admin.role === "admin";
  };
  return isLoggedIn() && isStudent() ? (
    <Navigate to="/s/" />
  ) : isLoggedIn() && isTeacher() ? (
    <Navigate to="/t/" />
  ) : isLoggedIn() && isAdmin() ? (
    <Navigate to="/a/" />
  ) : (
    <Outlet />
  );
};

export default LoggedInGuard;
