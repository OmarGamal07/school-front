import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../enviroment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import defaultImage from "../../assets/defaultcourseimage.webp"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.string().required("Date is required"),
  teacherId: Yup.string().required("Teacher's name is required"),
});

const initialValues = {
  name: "",
  teacherId: "",
  description: "",
  date: dayjs(),
};

const CreateCourse = () => {
  // States
  const [teachers, setTeachers] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  // Functions
  const createCourse = async ({ name, description, date, teacherId }) => {
    try {
      let formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("Date",date.format("YYYY-MM-DD"))
      formData.append("teacherId",teacherId)
      formData.append("image",file)
      const token = localStorage.getItem("token");
      const { status } = await axios.post(API_URL + "/course/", formData, {
        headers: {
          "x-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      if (status === 200) {
        toast.success("Course created successfully!");
        window.history.back();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getTeachers = async () => {
    try {
      const res = await axios.get(API_URL + "/teacher/");
      setTeachers(res.data);
    } catch (error) {}
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  useEffect(() => {
    getTeachers();
  }, []);
  return (
    <main className="xs:p-5 sm:p-20 h-screen grid place-items-center">
      <div className="w-full h-[80%]">
        <button
          onClick={() => window.history.back()}
          className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 relative z-40 mb-5"
        >
          Return
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            createCourse(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-white p-10 space-y-6"
            >
              <h1 className="font-bold text-3xl relative before:absolute before:w-[40px] before:h-[3px] before:left-1/2 before:translate-x-[-50%] before:bg-[#6a43ff] before:rounded-lg before:-bottom-2 text-center">
                Create a new Course
              </h1>
              {imageUrl && <img className="w-full h-[200px] object-cover rounded-md" src={imageUrl} alt="" />}
              {!imageUrl && <img className="w-full h-[200px] object-cover rounded-md" src={defaultImage} alt="" />}
              <TextField
                name="name"
                label="Course's Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name) && touched.name}
                helperText={touched.name && errors.name}
                variant="standard"
                required
              />
              <InputLabel id="demo-multiple-name-label">
                Teacher's Name
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={values.teacherId}
                onChange={(e) => {
                  setValues({ ...values, teacherId: e.target.value });
                }}
                required
                error={Boolean(errors.teacherId) && touched.teacherId}
                input={<OutlinedInput label="Teacher's Name" />}
                MenuProps={MenuProps}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher._id} value={teacher._id}>
                    {teacher.firstName}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                name="description"
                label="Course's Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={4}
                error={Boolean(errors.description) && touched.description}
                helperText={touched.description && errors.description}
                variant="standard"
                required
              />
              <label className="text-black/75" htmlFor="">Course's Image</label>
              <input type="file" onChange={handleFileChange} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast={true}
                  value={values.date}
                  onChange={(newDate) =>
                    setValues({ ...values, date: newDate })
                  }
                />
              </LocalizationProvider>
              <button
                type="submit"
                className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-full p-2"
              >
                CREATE COURSE
              </button>
            </form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default CreateCourse;
