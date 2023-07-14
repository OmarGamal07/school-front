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
import "./CorrectExamDashboard.css";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const CorrectExamDashboard = () => {
  const [result, setResults] = useState([]);
  const { user_id } = jwtDecode(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exams data from backend
    fetch(`http://localhost:5000/teacher/correct/${user_id}`) // Update the URL with your backend API endpoint
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => toast.error("Error fetching exams:", error));
  }, []);

  const handleCorrectExam = (resultId) => {
    navigate(`/t/correctExam/${resultId}`); // Navigate to exam page with exam ID as URL parameter
  };



  return (
    <Container style={{ marginTop: "10rem" }}>
      <h1 className="studentDashboardHeader">Correct Dashboard</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cousre Name</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((result) => (
              <TableRow key={result._id}>
                <TableCell>{result.courseId.name}</TableCell>
                <TableCell>{result.studentId.firstName}{result.studentId.lastName}</TableCell>
                <TableCell>
                <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleCorrectExam(result._id)}
                    >
                      Correct Exam
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CorrectExamDashboard;

