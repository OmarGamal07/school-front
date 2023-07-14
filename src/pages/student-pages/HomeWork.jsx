import { Button, Container, Input, InputLabel, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const HomeworkForm = () => {
  const { courseProgramId } = useParams();
  const [studentId, setStudentId] = useState("");
  useEffect(() => {
    setStudentId(jwtDecode(localStorage.getItem("token")).user_id);
  }, []);

  console.log(courseProgramId);
  console.log(studentId);
  const [formData, setFormData] = useState({
    note: "",
    file: null,
  });
  const [fileError, setFileError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file,
    }));
    setFileError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { note, file } = formData;

    if (!file) {
      toast.error("Please select a file");
      setFileError("Please select a file");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("studentId", studentId);
    formDataToSend.append("courseProgramId", courseProgramId);
    formDataToSend.append("note", note);
    formDataToSend.append("file", file);

    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/homework", {
        method: "POST",
        body: formDataToSend,
        headers: { "x-token": authToken },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Done submitting homework")

      } else {
        toast.error("Error submitting homework")
      }
    } catch (error) {
      toast.error("Error submitting homework", error)
    }
  };

  return (
    <Container style={{ marginTop: "8rem" }}>
      <form onSubmit={handleSubmit} className="border p-4">
        <h1
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "rem" }}
          className="mb-4"
        >
          Submit Homework
        </h1>
        <div className="mb-3">
          <Input type="hidden" name="courseProgramId" value={courseProgramId} />
        </div>
        <div className="mb-3">
          <InputLabel htmlFor="note" className="form-label">
            Note
          </InputLabel>
          <TextField
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <InputLabel htmlFor="file" className="form-label">
            File
          </InputLabel>
          <Input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="form-control"
            required
          />
          {fileError && (
            <div className="invalid-feedback d-block">{fileError}</div>
          )}
        </div>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default HomeworkForm;
