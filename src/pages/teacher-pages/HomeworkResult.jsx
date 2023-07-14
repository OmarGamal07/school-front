import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { API_URL } from "../../enviroment";
import { toast } from "react-toastify";

const HomeworkResult = ({ open, handleClose, homeworkId, studentId }) => {
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");
  const [resultError, setResultError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!result) {
      toast.error("Result is required.");

      setResultError("Result is required.");
      return;
    }
    if (!Number.isInteger(Number(result))) {
      toast.error("Result must be an integer.");

      setResultError("Result must be an integer.");
      return;
    }
    // send result to backend
    const body = {
      studentId,
      homeworkId,
      note,
      result,
    };

    fetch(`${API_URL}/hresult/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleResultChange = (e) => {
    setResult(e.target.value);
    setResultError("");
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set Homework Result</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="result"
            label="Result"
            type="number"
            fullWidth
            value={result}
            onChange={handleResultChange}
            error={Boolean(resultError)}
          />
          {resultError && (
            <Typography variant="body2" color="error">
              {resultError}
            </Typography>
          )}
          <TextField
            margin="dense"
            id="note"
            label="Note"
            type="text"
            fullWidth
            value={note}
            onChange={handleNoteChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HomeworkResult;
