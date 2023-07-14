import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../enviroment";
import jwt_decode from "jwt-decode";

const HomeworkResultS = () => {
  const [userId, setUserId] = useState("");
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserId(decoded.user_id);
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(API_URL + `/hresult/studentresult/${userId}`, {
        headers: { "x-token": localStorage.getItem("token") },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setHomeworks(data);
          }
        });
    }
  }, [userId]);

  return (
    <Container className="pageContainer">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Course Program</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homeworks.map((result) => (
              <TableRow key={result._id}>
                <TableCell>
                  {result.studentId.firstName} {result.studentId.lastName}
                </TableCell>
                <TableCell>
                  {result.homeworkId.courseProgramId
                    ? result.homeworkId.courseProgramId.name
                    : "N/A"}
                </TableCell>

                <TableCell>
                  {result.note ? result.note : <p>There's no notes.</p>}
                </TableCell>
                <TableCell>{result.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HomeworkResultS;