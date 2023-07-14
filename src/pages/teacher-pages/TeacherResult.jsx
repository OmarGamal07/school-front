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
import "./TeacherResult.css";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const AdminResult = () => {
  const [results, setResults] = useState([]);
  const { user_id } = jwtDecode(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exams data from backend
    fetch(`http://localhost:5000/teacher/result/${user_id}`) // Update the URL with your backend API endpoint
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error =>  toast.error("Error fetching exams:", error));
  }, []);

 

  return (
    <Container style={{ marginTop: "10rem" }}>
      <h1 className="studentDashboardHeader">Teacher'courses  Result</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result._id}>
                <TableCell>{result.courseId.name}</TableCell>
                <TableCell>{result.studentId.firstName}{result.studentId.lastName}</TableCell>
                <TableCell>{result.result}</TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminResult;

