import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from 'zod';

// Improved Zod schema with stricter email validation
const registrationSchema = z.object({
  aliasname: z.string().refine(value => isNaN(Number(value)), {
    message: "Alias name cannot be a number"
  }),
  firstname: z.string().nonempty({ message: "First name is required" }),
  lastname: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }).refine(email => {
    // Additional regex to prevent invalid emails like '0.0@0.0'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }, { message: "Invalid email address" }),
  phoneno: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits",
  }),
  gender: z.string().nonempty({ message: "Gender is required" }),
  githubprofile: z.string().url({ message: "Invalid GitHub profile URL" }),
  linkednprofile: z.string().url({ message: "Invalid LinkedIn profile URL" }),
  portfoliowebsite: z.string().url({ message: "Invalid portfolio website URL" }),
  skills: z.string().nonempty({ message: "Skills are required" }),
});

function EditHackathonRegistrationForm() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    aliasname: '',
    firstname: '',
    lastname: '',
    email: '',
    phoneno: '',
    gender: '',
    githubprofile: '',
    linkednprofile: '',
    portfoliowebsite: '',
    skills: '',
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  async function fetchData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      });
      if (response.status === 403) navigate('/Error403');
      if (!response.ok) throw new Error('Network response was not ok');
      const resData = await response.json();
      setData(resData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function handleChange(e, fieldName) {
    setFormData(prev => ({ ...prev, [fieldName]: e.target.value }));
    
    // Clear errors dynamically as user edits
    setErrors(prevErrors => ({ ...prevErrors, [fieldName]: undefined }));
  }

  function handleEdit(fieldName) {
    if (editableFields[fieldName]) validateField(fieldName); // Validate on save
    setEditableFields(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }

  function validateField(fieldName) {
    const fieldSchema = registrationSchema.pick({ [fieldName]: true });
    const result = fieldSchema.safeParse({ [fieldName]: formData[fieldName] });

    if (!result.success) {
      setErrors(prev => ({ ...prev, [fieldName]: result.error.errors[0].message }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
      return true;
    }
  }

  function inputComponent(label, fieldName) {
    return (
      <div className="mt-4">
        <label className="font-light">{label}</label>
        <div className="flex items-center mt-2">
          <input
            type="text"
            disabled={!editableFields[fieldName]}
            value={formData[fieldName]}
            onChange={(e) => handleChange(e, fieldName)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleEdit(fieldName)}
            className="bg-[#5f3abd] hover:bg-[#492a8a] text-white py-2 px-4 rounded ml-2 transition"
          >
            {editableFields[fieldName] ? 'Save' : 'Edit'}
          </button>
        </div>
        {errors[fieldName] && <p className="text-red-500 text-sm mt-1">{errors[fieldName]}</p>}
      </div>
    );
  }

  async function handleSubmit() {
    const parsedResult = registrationSchema.safeParse(formData);

    if (!parsedResult.success) {
      const formattedErrors = parsedResult.error.format();
      let newErrors = {};
      for (const key in formattedErrors) {
        if (formattedErrors[key]?._errors.length > 0)
          newErrors[key] = formattedErrors[key]._errors[0];
      }
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/registerForHackathon/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.status === 403) navigate('/Error403');
      if (!response.ok) throw new Error('Network response was not ok');

      navigate(`/hackathon/${name}`);
      
    } catch (error) {
      console.error('Error submitting data:', error);
      setErrors({ submitError: error.message });
    }
  }

  return (
    <div className="w-full p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Application Form</h2>
      
      {inputComponent("Alias Name:", "aliasname")}
      {inputComponent("First Name:", "firstname")}
      {inputComponent("Last Name:", "lastname")}
      {inputComponent("Email:", "email")}
      {inputComponent("Phone Number:", "phoneno")}
      {inputComponent("Gender:", "gender")}
      {inputComponent("GitHub Profile URL:", "githubprofile")}
      {inputComponent("LinkedIn Profile URL:", "linkednprofile")}
      {inputComponent("Portfolio Website URL:", "portfoliowebsite")}
      {inputComponent("Skills:", "skills")}

      {errors.submitError && (
        <p className="text-red-500 mt-4">{errors.submitError}</p>
      )}

      <button
        onClick={handleSubmit}
        className="mt-6 bg-[#5f3abd] hover:bg-[#492a8a] text-white py-3 px-6 rounded transition"
      >
        Submit
      </button>
      
    </div>
  );
}

export default EditHackathonRegistrationForm;