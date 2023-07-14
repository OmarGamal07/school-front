import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../enviroment";
import { Link } from "react-router-dom";
import CourseCard from "./components/CourseCard";
import { toast } from "react-toastify";
const CoursesA = () => {
  const [courses, setCourses] = useState([]);
  // Functions
  const getCourses = async () => {
    try {
      const res = await axios.get(API_URL + "/course/");
      setCourses(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onCourseDeleted = () => {
    getCourses()
  }
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className="pt-10 relative overflow-hidden xs:px-5 sm:px-20">
      <div className="flex items-center justify-between">
        <h1 className="font-bold xs:text-md sm:text-2xl">Published Courses</h1>
        <Link
          to="/a/courses/new-course"
          className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 relative z-40"
        >
          Post a new course
        </Link>
      </div>
      <div className="xs:grid xl:grid-cols-2 pt-10 xs:gap-10 relative z-40">
        {courses.map((course) => (
          <CourseCard course={course} key={course._id} courseDeleted={onCourseDeleted} />
        ))}
      </div>
      {!courses && (
        <p className="text-3xl font-bold h-[50vh] grid place-items-center">
          No Courses Found!
        </p>
      )}
    </div>
  );
};

export default CoursesA;
