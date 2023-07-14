import React from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../enviroment'
import defaultImage from "../../../assets/defaultcourseimage.webp"
import { useNavigate } from "react-router-dom";

const CourseCardS = ({ course: crs, createExam }) => {
  const navigate = useNavigate();

  const handleCreateExam = (resultId) => {
    navigate(`/t/createExam/${resultId}`); // Navigate to exam page with exam ID as URL parameter
  };

  return (
    <div className="bg-white rounded-md shadow-md border hover:scale-[1.1] duration-300">
      <Link to={crs._id}>
        <div className="space-y-2 p-5">
          <img className="w-full h-[200px] object-cover rounded-md" src={crs.image ? API_URL + `/assets/uploads/course/${crs.image}` : defaultImage} alt="" />
          <div className="flex justify-between w-full text-black/50">
            <span>COURSE</span>
            <span className="text-xs">{new Date(crs.Date).toUTCString()}</span>
          </div>
          <h3 className="font-bold text-xl">{crs.name}</h3>
          <p className="text-sm text-black/50">{crs.description.slice(0,200) + " ....."}</p>
        </div>
      </Link>

      {createExam && 
          <div className="flex justify-center">
            <button className='bg-black font-medium text-white px-4 py-2 rounded-md' onClick={() => handleCreateExam(crs._id)}>create exam</button>
          </div>
        }
    </div>
  )
}

export default CourseCardS;