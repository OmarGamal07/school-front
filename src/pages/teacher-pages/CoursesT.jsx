import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../enviroment";
import { Link } from "react-router-dom";
import CourseCardT from "./components/CourseCardT";
import defaultImage from '../../assets/defaultcourseimage.webp'

const CoursesT = () => {
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
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className="pt-32 relative xs:px-5 sm:px-20">
      <div className="flex items-center justify-between">
        <h1 className="font-bold xs:text-md sm:text-2xl">All Courses</h1>
      </div>

      <div className="xs:grid xl:grid-cols-2 pt-10 xs:gap-10 relative z-40">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-md shadow-md border hover:scale-[1.1] duration-300 cursor-pointer">
            <div className="space-y-2 p-5">
              <img className="w-full h-[200px] object-cover rounded-md" src={course.image ? API_URL + `/assets/uploads/course/${course.image}` : defaultImage} alt="" />
              <div className="flex justify-between w-full text-black/50">
                <span>COURSE</span>
                <span className="text-xs">{new Date(course.Date).toUTCString()}</span>
              </div>
              <h3 className="font-bold text-xl">{course.name}</h3>
              <p className="text-sm text-black/50">{course.description.slice(0,200) + " ....."}</p>
            </div>
          </div>
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

export default CoursesT;
