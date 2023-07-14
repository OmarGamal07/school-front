import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../enviroment";
import axios from "axios";
import user from '../../assets/user.webp'
import Note from "../student-pages/components/Note";
import defaultImage from "../../assets/defaultcourseimage.webp"

const CourseT = () => {
  const { id } = useParams();
  // States
  const [course, setCourse] = useState({});
  const [enrolledStudents, setEnrolledStudents] = useState([])
  const [notes, setNotes] = useState([]);
  // Fucntions
  const getCourse = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + `/course/${id}`);
      setCourse(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [id]);
  const getNotes = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + `/notes/${id}`, {
        headers: { "x-token": localStorage.getItem("token") },
      });
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  const getEnrolledStudents = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + `/attendence/course/${id}`, {
        headers: { "x-token": localStorage.getItem("token") },
      });
      setEnrolledStudents(res.data)
    } catch (error) {
      console.log(error)
    }
  },[id]);
  useEffect(() => {
    getCourse();
    getEnrolledStudents()
    getNotes()
  }, [getCourse, getEnrolledStudents, getNotes]);
  return (
    <main className="pt-32 relative xs:px-5 sm:px-20">
      <button
        onClick={() => window.history.back()}
        className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 relative z-40 mb-5"
      >
        Return
      </button>
      <img className="w-full h-[200px] object-cover rounded-md" src={course.image ? API_URL + `/assets/uploads/course/${course.image}` : defaultImage} alt="" />
      <div>
        <h1 className="text-center font-bold text-3xl mt-5">{course.name}</h1>
        <p className="mt-10">{course.description}</p>
      </div>
      {/* Notes */}
      <h3 className="font-bold text-3xl my-10">All Notes</h3>
      {
        notes.length === 0 &&
        <span className="text-black/50 text-sm">no notes yet!</span>
      }
      <div className="space-y-4">
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
      </div>
      <h3 className="font-bold text-3xl my-10">Enrolled Students</h3>
      {
        enrolledStudents.length === 0 &&
        <span className="text-black/50 text-sm">no students enrolled the course yet!</span>
      }
      <div className="space-y-4">
        {
          enrolledStudents.map((std,i) => (
            <div key={i} className="flex items-center justify-between bg-white rounded-md border p-5">
              <div className="flex space-x-4 items-center">
                <img className="rounded-full border border-black w-[30px] h-[30px]" src={user} alt="adas" />
                <h4 className="font-semibold">{std.studentId.firstName}</h4>
              </div>
              <span className={`${std.status ? "bg-green-500":"bg-red-500"} font-bold px-4 py-2 text-white`}>{std.status ? "Attending":"NOT Attending"}</span>
            </div>
          ))
        }
      </div>
    </main>
  );
};

export default CourseT;
