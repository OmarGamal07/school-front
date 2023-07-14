import { useState } from "react";
import Loader from "../components/Loader";
import { TextField } from "@mui/material";
import Logo from "../components/Logo";
import img from "../assets/signin.webp";
import axios from "axios";
import { API_URL } from "../enviroment";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  // States
  const [isLoading, setIsLoading] = useState(false);
  // Functions
  const proceedSignIn = async (values: any) => {
    const reqBody = {
      email: values.email,
      password: values.password,
    };
    setIsLoading(true);
    try {
      let { data, status }: any = await axios.post(
        API_URL + "/login/",
        reqBody
      );
      if (status === 200) {
        localStorage.setItem("token", data.token);
        setIsLoading(false);
        toast.success("Logged in successfully!");
        switch (data.role) {
          case "student":
            navigate("/s/");
            break;
          case "teacher":
            navigate("/t/");
            break;
          case "admin":
            navigate("/a/");
            break;
        }
      } else {
        setIsLoading(false);
        toast.error("Invalid Credentials!");
      }
    } catch (error: any) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

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
      <div className="flex justify-center relative items-center overflow-auto lg:h-screen bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] w-full">
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
        <main className="flex justify-between xs:flex-col lg:flex-row rounded-md relative overflow-hidden font-mont">
          <div className="flex flex-col xs:w-[100%] lg:w-[60%] bg-white p-10">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                proceedSignIn(values);
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
                  className="flex flex-col space-y-8"
                >
                  {/* <!-- Logo --> */}
                  <div className="w-fit font-bold">
                    <Logo /> School System
                  </div>
                  <h1 className="font-bold text-3xl text-center relative before:absolute before:w-[40px] before:h-[3px] before:left-1/2 before:translate-x-[-50%] before:bg-[#6a43ff] before:rounded-lg before:-bottom-2">
                    Sign in to Account
                  </h1>
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
                  <button
                    className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-full p-2"
                    id="signInBtn"
                  >
                    SIGN IN
                  </button>
                </form>
              )}
            </Formik>
          </div>
          <div className="p-10 text-white bg-[#6a43ff] relative space-y-6">
            <h2 className="text-center text-3xl relative before:absolute before:w-[40px] before:h-[3px] before:left-1/2 before:translate-x-[-50%] before:bg-black before:rounded-lg before:-bottom-2">
              Hello Friend!
            </h2>
            <p className="text-center">
              Fill up personal information and start your journey with us!
            </p>
            <img
              loading="lazy"
              className="w-[250px] min-h-[250px] relative z-30 mx-auto"
              src={img}
              alt="a"
            />
            <Link
              to="/signup"
              className=" w-1/2 mx-auto shadow-black/40 shadow-lg text-white bg-gradient-to-r to-black from-[#8d46ff] text-center cursor-pointer rounded-full p-2 block"
            >
              SIGN UP
            </Link>
          </div>
        </main>
      </div>
      {/* <!-- Loader --> */}
      {isLoading && (
        <>
          <div className="left-0 top-0 absolute flex items-center justify-center w-full h-full bg-black/80 z-50">
            <Loader />
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
