import Loader from "../components/Loader";
import {
  Backdrop,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import img from "../assets/signup.webp";
import { useRef, useState } from "react";
import Logo from "../components/Logo";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../enviroment";
import { Link, useNavigate } from "react-router-dom";
import React, { Component } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  checked: Yup.boolean(),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  checked: false,
};

const SignUp = () => {
  const navigate = useNavigate();
  // States
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const formRef: any = useRef(null);
  // Functions
  const proceedSignUp = async () => {
    if (selectedOption) {
      const formData = formRef.current.values;
      const reqBody = {
        firstName: formData.name,
        lastName: formData.name,
        email: formData.email,
        password: formData.password,
        dateOfBirth: new Date().toUTCString(),
        role: selectedOption,
        confirmPassword: formData.password,
      };
      try {
        const res = await axios.post(API_URL + "/register/", reqBody);
        toast.success("User created successfully!");
        navigate("/signin");
      } catch (error) {
        toast.error("User already exists!");
      }
      setIsLoading(false);
    }
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-center relative items-center overflow-auto lg:h-screen bg-gradient-to-r from-[#6a43ff] to-[#8d46ff]">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="1440"
        height="560"
        preserveAspectRatio="none"
        viewBox="0 0 1440 560"
      >
        <g mask='url("#SvgjsMask1054")' fill="none">
          <path
            d="M79.282,360.524C95.88,360.32,108.856,347.682,116.789,333.101C124.327,319.245,125.907,302.74,118.211,288.971C110.332,274.875,95.428,265.662,79.282,265.997C63.654,266.321,50.848,276.981,43.055,290.531C35.287,304.036,32.983,320.206,40.145,334.043C47.905,349.036,62.401,360.731,79.282,360.524"
            fill="rgba(52, 8, 147, 0.4)"
            className="triangle-float1"
          ></path>
          <path
            d="M1016.828,154.143C1047.226,153.864,1076.135,141.873,1093.266,116.761C1113.056,87.751,1126.616,49.788,1108.564,19.666C1090.812,-9.955,1051.353,-11.513,1016.828,-10.785C984.014,-10.093,948.686,-4.598,931.557,23.399C913.844,52.351,919.38,89.758,937.921,118.187C954.845,144.136,985.849,154.427,1016.828,154.143"
            fill="rgba(52, 8, 147, 0.4)"
            className="triangle-float3"
          ></path>
          <path
            d="M787.234,67.664C813.099,68.647,840.187,59.664,852.942,37.141C865.556,14.866,857.22,-11.649,844.834,-34.052C831.911,-57.426,813.943,-81.841,787.234,-81.707C760.666,-81.573,742.594,-57.198,730.628,-33.477C720.018,-12.445,718.139,11.897,729.644,32.454C741.422,53.498,763.135,66.748,787.234,67.664"
            fill="rgba(52, 8, 147, 0.4)"
            className="triangle-float1"
          ></path>
          <path
            d="M333.45 540.51 a103.41 103.41 0 1 0 206.82 0 a103.41 103.41 0 1 0 -206.82 0z"
            fill="rgba(52, 8, 147, 0.4)"
            className="triangle-float3"
          ></path>
        </g>
        <defs>
          <mask id="SvgjsMask1054">
            <rect width="1440" height="560" fill="#ffffff"></rect>
          </mask>
        </defs>
      </svg>
      {/* <!-- Loader --> */}
      {isLoading && (
        <div className="left-0 top-0 absolute flex items-center justify-center w-full h-full bg-black/80 z-50">
          <Loader />
        </div>
      )}
      <main className="flex justify-between xs:flex-col lg:flex-row rounded-md relative overflow-hidden font-mont">
        <div className="p-10 bg-white relative">
          {/* <!-- Logo --> */}
          <h3 className={`${true ? "text-[20px]" : "text-4xl"} font-bold`}>
            <Logo /> School System
          </h3>
          <img
            loading="lazy"
            className="w-[300px] min-h-[300px] relative z-30 mx-auto object-cover"
            src={img}
            alt="xyz"
          />
          <div className="relative z-30">
            <p className="my-6 flex items-center">
              <span className="text-3xl text-[#8d46ff] font-bold">"</span>
              We're born to raise a generation of well educated students!
              <span className="text-3xl text-[#8d46ff] font-bold">"</span>
            </p>
            <p className="mx-auto w-fit my-6 relative before:w-[15px] before:h-[2px] before:absolute before:bg-[#8d46ff] before:top-1/2 before:translate-y-[-50%] before:left-[-25px] after:w-[15px] after:h-[2px] after:absolute after:bg-[#8d46ff] after:top-1/2 after:translate-y-[-50%] after:right-[-25px]">
              GET IN TOUCH
            </p>
            <ul className="flex justify-center space-x-4">
              <li className="text-blue-600 text-xl">
                <i className="fa-brands fa-square-facebook"></i>
              </li>
              <li className="text-red-600 text-xl">
                <i className="fa-brands fa-youtube"></i>
              </li>
              <li className="text-blue-500 text-xl">
                <i className="fa-brands fa-square-twitter"></i>
              </li>
            </ul>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={(values, { setSubmitting }) => {
            setOpen(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-white p-10 space-y-6"
            >
              <h1 className="font-bold text-3xl relative before:absolute before:w-[40px] before:h-[3px] before:left-1/2 before:translate-x-[-50%] before:bg-[#6a43ff] before:rounded-lg before:-bottom-2">
                Create a new Account
              </h1>
              <TextField
                name="name"
                label="Full Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name) && touched.name}
                helperText={touched.name && errors.name}
                variant="standard"
                required
              />
              <TextField
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email) && touched.email}
                helperText={touched.email && errors.email}
                variant="standard"
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password) && touched.password}
                helperText={touched.password && errors.password}
                variant="standard"
                required
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  Boolean(errors.confirmPassword) && touched.confirmPassword
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                variant="standard"
                required
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.checked}
                    onChange={handleChange}
                    name="checked"
                  />
                }
                label="All terms and conditions"
              />
              {!values.checked && touched.checked && (
                <p className="text-red-500">Must be checked!</p>
              )}
              <p>
                Already have an account?{" "}
                <Link to="/signin" className="text-[#6a43ff] font-semibold">
                  Sign in
                </Link>{" "}
              </p>
              <button
                disabled={isSubmitting}
                onClick={proceedSignUp}
                className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-full p-2"
              >
                SIGN UP
              </button>
            </form>
          )}
        </Formik>
      </main>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className="bg-white rounded-lg w-fit z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10">
            <h3 className="text-3xl font-semibold">
              Are you a student or teacher ?
            </h3>
            <div className="flex mt-5">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label="Student"
                />
                <FormControlLabel
                  value="teacher"
                  control={<Radio />}
                  label="Teacher"
                />
              </RadioGroup>
            </div>
            <button
              onClick={proceedSignUp}
              className="text-white mt-5 shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md px-10 p-2"
            >
              SUBMIT
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SignUp;
