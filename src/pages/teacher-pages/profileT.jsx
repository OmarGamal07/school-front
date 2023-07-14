import { Button, Container, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./UserProfile.css";
import { API_URL } from "../../enviroment";
import { toast } from "react-toastify";

const UserProfileT = () => {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setUserId(decoded.user_id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(API_URL + `/profile/${userId}`);
      const { firstName, lastName, email, dateOfBirth } = response.data;
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      const dateObject = new Date(dateOfBirth);
      const formattedDateString = dateObject.toISOString().substring(0, 10);
      setDateOfBirth(formattedDateString);
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
        toast.error("Please Enter Password To update your data");
      return;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.patch(API_URL + `/profile/${userId}`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        dateOfBirth,
      });
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="pageContainer">
      <Container>
        <h1 className="profileHeader">User Profile</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <FormControl style={{ marginBottom: "1.5rem", width: "100%" }}>
            <InputLabel
              htmlFor="firstName"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              First Name:
            </InputLabel>
            <Input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </FormControl>
          <FormControl style={{ marginBottom: "1.5rem", width: "100%" }}>
            <InputLabel
              htmlFor="lastName"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Last Name:
            </InputLabel>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </FormControl>
          <FormControl style={{ marginBottom: "1.5rem", width: "100%" }}>
            <InputLabel
              htmlFor="email"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Email:
            </InputLabel>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl style={{ marginBottom: "1.5rem", width: "100%" }}>
            <InputLabel
              htmlFor="password"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Password:
            </InputLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <FormControl style={{ marginBottom: "1.5rem", width: "100%" }}>
            <InputLabel
              htmlFor="confirmPassword"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Confirm Password:
            </InputLabel>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </FormControl>
          <FormControl style={{ marginBottom: "1.5rem", width: "100%" }}>
            <label
              htmlFor="dateOfBirth"
              style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            >
              Date of Birth:
            </label>
            <Input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default UserProfileT;
