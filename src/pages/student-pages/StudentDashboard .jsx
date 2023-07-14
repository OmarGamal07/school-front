import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
const StudentDashboard = () => {
  const [exams, setExams] = useState([]);
  const { user_id } = jwtDecode(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exams data from backend
    fetch(`http://localhost:5000/student/${user_id}`) // Update the URL with your backend API endpoint
      .then(response => response.json())
      .then(data => setExams(data))
      .catch(error =>toast.error("Failed to fetch exam data"));
  }, []);

  const handleTakeExam = (examId,courseId) => {
    // Implement exam taking logic here
    toast.success("Wating Loading Exam");
    navigate(`/s/exam/${examId}/${user_id}/${courseId}`); // Navigate to exam page with exam ID as URL parameter
  };

  const isExamActive = exam => {
    // Check if exam is active based on current time compared to exam start time
    const currentDate = new Date(); // Get current date and time
    const examStartDate = new Date(`${exam.date}T${exam.startTime}`); // Get exam start date and time
    const examEndDate = new Date(`${exam.date}T${exam.endTime}`); // Get exam end date and time
    // console.log(currentDate);
    // console.log(examStartDate);
    // console.log(examEndDate);
    return currentDate >= examStartDate && currentDate < examEndDate;
  };

  return (
    <Container style={{ marginTop: "10rem" }}>
      <h1 className="studentDashboardHeader">Student Dashboard</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.startTime}</TableCell>
                <TableCell>{exam.endTime}</TableCell>
                <TableCell>
                  {isExamActive(exam) ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleTakeExam(exam._id,exam.courseId)}
                    >
                      Join Exam
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary" disabled>
                      Exam Not Active
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentDashboard;

