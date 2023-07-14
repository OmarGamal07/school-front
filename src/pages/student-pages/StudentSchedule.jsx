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

const StudentSchedule = () => {
  const [exams, setExams] = useState([]);
  const { user_id } = jwtDecode(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exams data from backend
    fetch(`http://localhost:5000/student/${user_id}`) // Update the URL with your backend API endpoint
      .then(response => response.json())
      .then(data => setExams(data))
      .catch(error => toast.error("Failed to fetch exam data",error));
  }, []);

 

  return (
    <Container style={{ marginTop: "10rem" }}>
      <h1 className="studentDashboardHeader">Student Schedule</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exam</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.startTime}</TableCell>
                <TableCell>{exam.endTime}</TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentSchedule;

