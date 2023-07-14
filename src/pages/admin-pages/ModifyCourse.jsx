import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../enviroment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import defaultImage from '../../assets/defaultcourseimage.webp'

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.string().required("Date is required"),
});

const initialValues = {
  name: "",
  description: "",
  date: dayjs(),
};

const ModifyCourse = () => {
  const { id } = useParams();
  // States
  const [formData, setFormData] = useState(initialValues);
  const [programs, setPrograms] = useState([]);
  const [homework, setHomework] = useState({
    startDate: "",
    endDate: "",
    homeworkDescription: ""
  })
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
  });
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  // Functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  const modifyCourse = async ({ name, description, date }) => {
    try {
      let formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("Date",date.format("YYYY-MM-DD"))
      formData.append("image",file)
      const token = localStorage.getItem("token");
      const { status } = await axios.put(API_URL + `/course/${id}`, formData, {
        headers: {
          "x-token": token,
          "Content-Type": "multipart/form-data",
        },
      });
      if (status === 200) {
        toast.success("Course modified successfully!");
        window.history.back();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getCourse = useCallback(async () => {
    try {
      const res = await axios.get(API_URL + `/course/${id}`);
      setFormData({
        date: dayjs(res.data.Date),
        name: res.data.name,
        description: res.data.description,
      });
      setImageUrl(API_URL + '/assets/uploads/course/' + res.data.image)
      setPrograms(res.data.courseProgram);
    } catch (error) {
      toast.error(error.message);
    }
  }, [id]);
  const deleteCourseProgram = async (id) => {
    try {
      const res = await axios.delete(API_URL + `/courseprogram/${id}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      toast.success("Deleted successfully!");
      console.log(res);
      getCourse();
    } catch (error) {}
  };
  const addCourseProgram = async () => {
    setOpen(false);
    try {
      const res = await axios.post(
        API_URL + `/courseprogram/`,
        {
          name: newProgram.name,
          description: newProgram.description,
          courseId: id,
          homework: homework
        },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      toast.success("Added successfully!");
      getCourse();
    } catch (error) {}
  };
  useEffect(() => {
    getCourse();
  }, [getCourse]);
  return (
    <>
      <main className="xs:p-5 sm:p-20 h-screen grid place-items-center">
        <div className="w-full h-[80%]">
          <button
            onClick={() => window.history.back()}
            className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-md p-2 relative z-40 mb-5"
          >
            Return
          </button>
          {formData && (
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={(values, { setSubmitting }) => {
                modifyCourse(values);
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
                  <h1 className="font-bold text-3xl relative before:absolute before:w-[40px] before:h-[3px] before:left-1/2 before:translate-x-[-50%] before:bg-[#6a43ff] before:rounded-lg before:-bottom-2 text-center py-2">
                    Modify Course
                  </h1>
                  {imageUrl && <img className="w-full h-[200px] object-cover rounded-md" src={imageUrl} alt="" />}
                  {!imageUrl && <img className="w-full h-[200px] object-cover rounded-md" src={defaultImage} alt="" />}
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
                    name="description"
                    label="Description"
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
                  <label className="text-black/75" htmlFor="">Course's Date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast={true}
                      value={values.date}
                      onChange={(newDate) =>
                        setValues({ ...values, date: newDate })
                      }
                    />
                  </LocalizationProvider>
                  <div className="flex justify-between">
                    <h3 className="text-3xl font-semibold">
                      Course's Programs
                    </h3>
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="bg-black text-white px-4 py-2"
                    >
                      Add
                    </button>
                  </div>
                  {programs.map((program) => (
                    <div
                      className="border flex justify-between rounded-md items-center p-5"
                      key={program._id}
                    >
                      <h4 className="font-semibold">{program.name}</h4>
                      <button
                        type="button"
                        onClick={() => {
                          deleteCourseProgram(program._id);
                        }}
                        className="text-white rounded-md px-10 py-2 bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="text-white shadow-black/40 shadow-lg bg-gradient-to-r from-[#6a43ff] to-[#8d46ff] rounded-full p-2"
                  >
                    MODIFY COURSE
                  </button>
                </form>
              )}
            </Formik>
          )}
        </div>
      </main>
      {open && (
        <>
          <div
            className="fixed w-full h-full left-0 top-0 bg-black/20"
            onClick={handleClose}
          ></div>
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid  z-50 bg-white p-5 rounded-lg xs:w-[70%] sm:w-1/2 space-y-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCourseProgram();
              }}
              className="flex flex-col space-y-8"
            >
              <TextField
                name="name"
                label="Program's Name"
                value={newProgram.name}
                onChange={(e) => {
                  setNewProgram({ ...newProgram, name: e.target.value });
                }}
                variant="standard"
                required
              />
              <TextField
                name="description"
                label="Program's Description"
                value={newProgram.description}
                onChange={(e) => {
                  setNewProgram({ ...newProgram, description: e.target.value });
                }}
                multiline
                rows={4}
                variant="standard"
                required
              />
              <TextField
                name="homework"
                label="Homework's Description"
                value={homework.homeworkDescription}
                onChange={(e) => {
                  setHomework({ ...homework, homeworkDescription: e.target.value });
                }}
                variant="standard"
                required
              />
              <label htmlFor="">Homework Start Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast={true}
                  value={homework.startDate}
                  onChange={(newDate) =>
                    setHomework({ ...homework, startDate: newDate })
                  }
                />
              </LocalizationProvider>
              <label htmlFor="">Homework End Date</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast={true}
                  value={homework.endDate}
                  onChange={(newDate) =>
                    setHomework({ ...homework, endDate: newDate })
                  }
                />
              </LocalizationProvider>
              <button className="text-white bg-black p-5">Add</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ModifyCourse;
