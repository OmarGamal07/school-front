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
import HomeworkResult from "./HomeworkResult";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
const Homework = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const { user_id } = jwtDecode(localStorage.getItem("token"));
  useEffect(() => {
    console.log(user_id);
    fetch(API_URL + `/homework/teacher/${user_id}`, {
      headers: { "x-token": localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setHomeworks(data));
  }, []);

  const downloadFile = (url) => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Network response was not ok");

          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        toast.error("There was a problem with the download");
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSetResultClick = (homeworkId, student) => {
    setSelectedHomework({ homeworkId, student });
    setOpen(true);
  };

  return (
    <Container className="pageContainer">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Course Program</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {homeworks.map((homework) => (
              <TableRow key={homework._id}>
                <TableCell>
                  {homework.studentId.firstName} {homework.studentId.lastName}
                </TableCell>
                <TableCell>{homework.courseProgramId.name}</TableCell>
                <TableCell>{homework.note}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      downloadFile(`${API_URL}/homework/file/${homework.file}`)
                    }
                  >
                    Download File
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      handleSetResultClick(homework._id, homework.studentId._id)
                    }
                  >
                    Set Result
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedHomework && (
        <HomeworkResult
          open={open}
          handleClose={handleClose}
          homeworkId={selectedHomework.homeworkId}
          studentId={selectedHomework.student}
        />
      )}
    </Container>
  );
};

export default Homework;
