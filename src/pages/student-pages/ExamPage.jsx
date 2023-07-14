import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook from react-router-dom
import axios from "axios";
import {
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import { toast } from "react-toastify";

const ExamPage = () => {
  const navigate = useNavigate();
  const { examId,studentId,courseId } = useParams(); // Use useParams hook to get examId from URL parameter
  const [questions, setQuestions] = useState([]);
  const [examType, setExamType] = useState("");
  const [examStart, setExamStart] = useState("");
  const [examEnd, setExamEnd] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(false); // State to keep track of whether to disable the submit button
  useEffect(() => {
    if (examId) {
      
      const fetchExistingExamData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/exam/${examId}`
          ); // Replace with your own API endpoint to fetch exam data

          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            if (data) {
              // If exam data is found, set it in the state
              setExamType(data.type);
              setExamStart(data.startDate);
              setExamEnd(data.endDate);
              setQuestions(data.questions);
              setTeacherId(data.courseId.teacherId)
            }
          } else {
            toast.error("Failed to fetch exam data");
            throw new Error("Failed to fetch exam data");
          }
        } catch (error) {
          toast.error(error);

        }
      };

      fetchExistingExamData();
      
      
    
    }
  }, [examId]); // Update dependency to examId from useParams hook
  
  // Handler for radio button change event
  const handleRadioButtonChange = (questionId, answer) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answer
    }));
  };
  
 // Handler for textarea change event
const handleTextAreaChange = (questionId, answer) => {
  setSelectedAnswers(prevState => ({
    ...prevState,
    [questionId]: answer
  }));
};

  // Handler for submit button click event
  const handleSubmitButtonClick = async () => {
    const currentDate = new Date();

   // Check if current date is equal to or greater than exam end date
   if (currentDate.toISOString() >= examEnd) {
    setDisableSubmit(true); // Disable submit button
    return ;
  }
    try {
      
      if (examType === "mcq" ||examType === "true_false") {
        // Calculate result for MCQ exams
        let score = 0;
        for (const question of questions) {
          if (question.correctAnswer === selectedAnswers[question._id]) {
            score+=question.grade;
          }
        }
        const resultData={
          examId:examId,
          studentId,
          courseId,
          teacherId:teacherId,
          result:score
        }
        // Update backend with exam result
        const response = await axios.post(
          "http://localhost:5000/result",
          resultData
        );
        if (response) {
          toast.success("Exam result created successfully");

          navigate(`/s/examination`); // Navigate to exam page with exam ID as URL parameter

        } else {
          toast.error("Failed to created exam result");
          throw new Error("Failed to created exam result");
        }
      } else {
        let questionsANDanswerClassic=[];
        let index=0;
        for (const question of questions) {
            questionsANDanswerClassic[index]={
              question:question.question,
              answer:selectedAnswers[question._id],
              grade:question.grade
            }
            index++;
        }
        const resultDataClasic={
          examId:examId,
          studentId,
          courseId,
          teacherId:teacherId,
          isClassic:true,
          studentAnswer:questionsANDanswerClassic
        }
        // Update backend with classic exam answers
        const response = await axios.post(
          "http://localhost:5000/result",
          resultDataClasic
        );
        if (response  && response.status === 200) {
          toast.success("Exam  created successfully");
        } else {
          toast.error("Failed to created exam result");
          throw new Error("Failed to created exam result");
        }
      }
    } catch (error) {
      toast.error(error);

    }
  };
return (
  <Container maxWidth="md" className="mt-5" >
     <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
     <Typography variant="h3" gutterBottom >
      Exam Page
    </Typography>
     </div>
    
    <div>
      {questions.map((question, index) => (
        <div key={question._id} className="mt-5">
          <Typography variant="h4" gutterBottom>
            Question {index + 1}
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{color:"red"}}>
            Grade: {question.grade}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {question.question}
          </Typography>
          {examType === "mcq" ? (
            <FormControl component="fieldset">
              <RadioGroup
                name={question._id}
                value={selectedAnswers[question._id] || ""}
                onChange={(e) =>
                  handleRadioButtonChange(
                    question._id,
                    `option${parseInt(e.target.value) + 1}`
                  )
                }
              >
                {question.answers.map((option, index) => (
                  <FormControlLabel
                    key={option}
                    value={index.toString()}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : examType === "true_false" ? (
            <FormControl component="fieldset">
              <FormLabel component="legend">True/False</FormLabel>
              <RadioGroup
                name={question._id}
                value={selectedAnswers[question._id] || ""}
                onChange={(e) => handleRadioButtonChange(question._id, e.target.value)}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="True"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                />
              </RadioGroup>
            </FormControl>
          ) : (
            // Render textarea for all other question types
            <TextField
              id={question._id}
              label="Answer"
              variant="outlined"
              fullWidth
              multiline
              value={selectedAnswers[question._id] || ""}
              onChange={(e) =>
                handleTextAreaChange(question._id, e.target.value)
              }
            />
          )}
        </div>
      ))}
         {/* Display Time's Up message if current date is equal to or greater than exam end date */}
  {disableSubmit && (
    <Typography variant="body1" color="secondary" className="time-up-message">
      Time's Up!
    </Typography>
  )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            disabled={disableSubmit} // Disable submit button if current date is equal to or greater than exam end date
            onClick={handleSubmitButtonClick}
          >
            Submit
          </Button>
        </div>
    </div>
  
  </Container>
);
};
export default ExamPage;
