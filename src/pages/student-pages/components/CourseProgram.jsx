import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

// inside the CourseProgram component

const CourseProgram = ({ prog, index }) => {
  return (
    <div>
      {index + 1 + " - " + prog.name}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <p>
          <b>home work : </b>
          {prog.homework.homeworkDescription}
        </p>{" "}
        <Button variant="contained">
          <Link to={`/s/homework/${prog._id}`}>Send home work</Link>
        </Button>
      </div>
    </div>
  );
};

export default CourseProgram;
