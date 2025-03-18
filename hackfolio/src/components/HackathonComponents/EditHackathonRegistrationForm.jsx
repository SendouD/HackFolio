import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from 'zod';

// Define Zod schema
const registrationSchema = z.object({
    aliasname: z.string().refine((value) => isNaN(Number(value)), {
        message: "Alias name cannot be a number"
    }),
    firstname: z.string().nonempty("First name is required"),
    lastname: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email format"),
    phoneno: z.string().refine((value) => /^\d{10}$/.test(value), {
        message: "Phone number must be exactly 10 digits",
    }),
    gender: z.string().nonempty("Gender is required"),
    githubprofile: z.string().url("Invalid GitHub profile URL"),
    linkednprofile: z.string().url("Invalid LinkedIn profile URL"),
    portfoliowebsite: z.string().url("Invalid portfolio website URL"),
    skills: z.string().nonempty("Skills are required"),
});

function EditHackathonRegistrationForm() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    aliasname: "",
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    gender: "",
    githubprofile: "",
    linkednprofile: "",
    portfoliowebsite: "",
    skills: "",
  });
  const [editableFields, setEditableFields] = useState({
    aliasname: false,
    firstname: false,
    lastname: false,
    email: false,
    phoneno: false,
    gender: false,
    githubprofile: false,
    linkednprofile: false,
    portfoliowebsite: false,
    skills: false,
  });

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        aliasname: data.aliasname,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phoneno: data.phoneno,
        gender: data.gender,
        githubprofile: data.githubprofile,
        linkednprofile: data.linkednprofile,
        portfoliowebsite: data.portfoliowebsite,
        skills: data.skills,
      });
    }
  }, [data]);

  async function getInfo() {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/hackathon/registerForHackathon/${name}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.status === 403) navigate("/Error403");
      if (!response.ok) throw new Error("Network response was not ok");
      const arr = await response.json();
      setData(arr.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function validateField(name, value) {
    let error = "";
    const regexes = {
      aliasname: /^[A-Za-z][A-Za-z ]*$/,
      firstname: /^[A-Za-z][A-Za-z ]*$/,
      lastname: /^[A-Za-z][A-Za-z ]*$/,
      email: /^[A-Za-z][A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      phoneno: /^[6-9][0-9]{9}$/,
      gender: /^(Male|Female|Other)$/,
      githubprofile: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/,
      linkednprofile:
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?$/,
      portfoliowebsite:
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/?.*$/,
      skills: /^[A-Za-z][A-Za-z, ]*$/,
    };
    if (!regexes[name].test(value)) {
      error = `Invalid ${name.replace("profile", " Profile")}`;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleChange(e, name) {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  }

  function handleEdit(field) {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));

    // When disabling edit mode, validate and save field data
    if (editableFields[field]) {
      validateField(field, formData[field]); // Ensure validation updates
    }
  }

  async function handleSubmit() {
    // Ensure no errors before submission
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) return;

    console.log("Submitting Data:", formData); // Debugging log

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/hackathon/registerForHackathon/${name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.status === 403) {
        navigate("/Error403");
        return;
      }

      if (!response.ok) throw new Error("Network response was not ok");

      console.log("Data updated successfully");
      navigate(`/hackathon/${name}/editRegistrationDetails`);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  function inputComponent(label, name, type = "text") {
    return (
      <>
        <label className="mt-[20px] font-light">{label}</label>
        <div className="flex items-center">
          {name === "gender" ? (
            <select
              disabled={!editableFields[name]}
              value={formData[name]}
              onChange={(e) => handleChange(e, name)}
              className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <input
              type={type}
              disabled={!editableFields[name]}
              value={formData[name]}
              onChange={(e) => handleChange(e, name)}
              className="edit-inp shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            />
          )}
          <button
            onClick={() => handleEdit(name)}
            className="bg-[#5f3abd] font-medium text-white py-2 px-4 rounded ml-2 edit-btn mt-2"
          >
            {editableFields[name] ? "Save" : "Edit"}
          </button>
        </div>
        {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
      </>
    );
  }

  return (
    <div className="w-full p-6 border rounded-[10px]">
      <div className="text-4xl text-gray-500 mb-[40px]">Application Form :</div>
      {inputComponent("What should people call you:", "aliasname")}
      {inputComponent("First Name:", "firstname")}
      {inputComponent("Last Name:", "lastname")}
      {inputComponent("Email:", "email", "email")}
      {inputComponent("Phone No.:", "phoneno", "tel")}
      {inputComponent("Gender:", "gender")}
      {inputComponent("Github URL:", "githubprofile", "url")}
      {inputComponent("LinkedIn URL:", "linkednprofile", "url")}
      {inputComponent("Portfolio Website URL:", "portfoliowebsite", "url")}
      {inputComponent("Skills:", "skills")}
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          disabled={Object.values(errors).some((error) => error)}
          className="edit-inp w-auto bg-[#5f3abd] text-white font-medium py-3 px-6 rounded-[5px] focus:outline-none focus:shadow-outline edit-btn mt-4 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EditHackathonRegistrationForm;

export default EditHackathonRegistrationForm;
