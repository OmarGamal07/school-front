import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  FormControl,
  FormGroup,
  TextField,
  Button,
} from "@mui/material";
import "./SetResultExam.css";
import { useParams } from "react-router-dom"; // Import useParams hook from react-router-dom
import { toast } from "react-toastify";

const SetResultExam = () => {
    const { resultId } = useParams(); // Use useParams hook to get examId from URL parameter
  const [questions, setQuestions] = useState([]);
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch questions from backend API
    const fetchQuestions = async () => {
           if(resultId){
            try {
                const response = await fetch(
                    `http://localhost:5000/result/${resultId}`); // Replace with your backend API endpoint for fetching questions
        
             
              if (response.ok) {
                const data = await response.json();
                if (data) {
                    setQuestions(data[0].studentAnswer);
                    setGrades(data.result);
                    setLoading(false);
                }
              } else {
                toast.error("Failed to fetch exam data");

                throw new Error("Failed to fetch exam data");
              }
            } catch (error) {
                toast.error(error);
            }
           }
           else{
            toast.error("result id not found");

            console.log("result id not found");
           }
          };
    
          
    fetchQuestions();
    
    

  }, []);

  const handleGradeChange = (questionId, e) => {
    const newGrades = { ...grades };
    newGrades[questionId] =parseInt(e.target.value);
    // Check if entered grade is greater than maximum possible grade
    const question = questions.find((q) => q._id === questionId);
    if (parseInt(newGrades[questionId]) > question.grade) {
        toast.error("Grade shouldn't be greater than question grade!");
      return;
    }
    setGrades(newGrades);
  };

  const handleSubmitButtonClick = () => {
    let score = 0;
        for (const question of questions) {
            score+=grades[question._id];
        }
    axios .patch(`http://localhost:5000/result/${resultId}`, {
        result: score
    })
        
        .then(()=>{ toast.success("Result Submitted");})
    .catch((error) => {
        toast.error("Failed to submit grades:", error);
      });
  };

  if (loading) {
    return <Typography>Loading questions...</Typography>;
  }

  return (
    <Container sx={{ marginTop: "10rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
  <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
    Correct Exam
  </Typography>

  <FormControl component="fieldset" sx={{ marginBottom: "2rem" }}>
    <FormGroup>
      {questions.map((question, index) => (
        <div key={question._id} sx={{ marginBottom: "1rem" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Question {index + 1}: {question.question}
          </Typography>
          <Typography variant="body1">
            Answer: {question.answer}
          </Typography>
          <Typography variant="body1" sx={{ color: "gray" }}>
            Grade: {question.grade}
          </Typography>
          <TextField
            type="number"
            onChange={(e) => handleGradeChange(question._id, e)}
            label="Grade"
            fullWidth
            inputProps={{
              min: 0,
              max: 100,
            }}
            sx={{ marginTop: "1rem" }}
          />
        </div>
      ))}
    </FormGroup>
  </FormControl>

  <Button
    variant="contained"
    color="primary"
    onClick={handleSubmitButtonClick}
    sx={{ marginTop: "1rem" }}
  >
    Submit Grades
  </Button>
</Container>
  );
};

export default SetResultExam;