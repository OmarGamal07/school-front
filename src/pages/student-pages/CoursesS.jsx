import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../enviroment";
import { Link } from "react-router-dom";
import CourseCardS from "./components/CourseCardS";

const CoursesS = () => {
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
        <h1 className="font-bold xs:text-md sm:text-2xl">Available Courses</h1>
      </div>
      <div className="xs:grid xl:grid-cols-2 pt-10 xs:gap-10 relative z-40">
        {courses.map((course) => (
          <CourseCardS
            course={course}
            key={course._id}
          />
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

export default CoursesS;
