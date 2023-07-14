
import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

import axios from "axios";
import "./AdminDashboard.css";
const AdminSchedule = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams data from backend
    fetch("http://localhost:5000/admin") // Update the URL with your backend API endpoint
      .then((response) => response.json())
      .then((data) => setExams(data))
      .catch((error) => toast.error("Error fetching exams:", error));
  }, []);

  return (
    <Container style={{ marginTop: "10rem" }}>
      <h1 className="studentDashboardHeader">Admin Schedule</h1>
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
export default AdminSchedule;
