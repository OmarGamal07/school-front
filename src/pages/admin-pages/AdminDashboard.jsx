
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

import axios from "axios";
import "./AdminDashboard.css";
import { toast } from "react-toastify";
const AdminDashboard = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams data from backend
    fetch("http://localhost:5000/exam/mangeExam") // Update the URL with your backend API endpoint
      .then((response) => response.json())
      .then((data) => setExams(data))
      .catch((error) =>toast.error("Error fetching exams:", error));
  }, []);

  const handleTimeChange = (id, event) => {
    const { value } = event.target;
    setExams((prevExams) =>
      prevExams.map((exam) => {
        if (exam._id === id) {
          return { ...exam, time: value };
        }
        return exam;
      })
    );
  };

  const handleDateChange = (id, event) => {
    const { value } = event.target;
    setExams((prevExams) =>
      prevExams.map((exam) => {
        if (exam._id === id) {
          return { ...exam, date: value };
        }
        return exam;
      })
    );
  };
  const handleEndTimeChange = (id, event) => {
    // New event handler for endTime field
    const { value } = event.target;
    setExams((prevExams) =>
      prevExams.map((exam) => {
        if (exam._id === id) {
          return { ...exam, endTime: value }; // Update endTime field
        }
        return exam;
      })
    );
  };
  const handleSave = (exam) => {
    // // Update exam data on backend
    axios
      .patch(`http://localhost:5000/exam/mangeExam/${exam._id}`, {
        name: exam.name,
        startDate: new Date(`${exam.date}T${exam.time}`),
        endDate:   new Date(`${exam.date}T${exam.endTime}`),
      })
      .then(()=>{toast.success("Exam Time Updating")})
      .catch((error) => toast.error("Error updating exam:", error));
  };

  return (
    <Container>
      <h1 className="examListHeader">Exam List</h1>
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
                <TableCell>
                  <TextField
                    type="date"
                    value={exam.date}
                    onChange={(event) => handleDateChange(exam._id, event)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={exam.time}
                    onChange={(event) => handleTimeChange(exam._id, event)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="time"
                    value={exam.endTime}
                    onChange={(event) => handleEndTimeChange(exam._id, event)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(exam)}
                  >
                    Save
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
export default AdminDashboard;
