import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
const ExamItem = ({ exam, onUpdateExam,selectedExam }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [updatedExamName, setUpdatedExamName] = React.useState("");
  const [updatedExamDate, setUpdatedExamDate] = React.useState("");
  const [updatedExamTime, setUpdatedExamTime] = React.useState("");

  const handleOpenModal = () => {
    setShowModal(true);
    setUpdatedExamName(exam.name);
    setUpdatedExamDate(exam.date);
    setUpdatedExamTime(exam.time);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateExam = () => {
     // Update the selected exam with new details
     axios.patch(`http://localhost:5000/exam/mangeExam/643578abe885fe324f681953`, {
        date: updatedExamDate,
        time: updatedExamTime
      })
       
  };

  return (
    <>
      <div>
        <h3>{exam.name}</h3>
        <p>Date: {exam.date}</p>
        <p>Time: {exam.time}</p>
        <Button onClick={handleOpenModal}>Edit</Button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="examName">
            <Form.Label>Exam Name</Form.Label>
            <Form.Control
              type="text"
              value={updatedExamName}
              onChange={(e) => setUpdatedExamName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="examDate">
            <Form.Label>Exam Date</Form.Label>
            <Form.Control
              type="date"
              value={updatedExamDate}
              onChange={(e) => setUpdatedExamDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="examTime">
            <Form.Label>Exam Time</Form.Label>
            <Form.Control
              type="time"
              value={updatedExamTime}
              onChange={(e) => setUpdatedExamTime(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateExam}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExamItem;