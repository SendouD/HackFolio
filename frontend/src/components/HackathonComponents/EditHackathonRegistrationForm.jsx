import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from 'zod';

// Improved Zod schema with stricter email validation
const registrationSchema = z.object({
  aliasname: z.string().refine(value => isNaN(Number(value)), {
    message: "Alias name cannot be a number"
  }),
  firstname: z.string()
    .nonempty({ message: "First name is required" })
    .regex(/^[A-Za-z\s]+$/, { message: "First name cannot contain numbers or special characters" }),
  lastname: z.string()
    .nonempty({ message: "Last name is required" })
    .regex(/^[A-Za-z\s]+$/, { message: "Last name cannot contain numbers or special characters" }),
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
  const [isHackathonEnded, setIsHackathonEnded] = useState(false);
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
    checkHackathonStatus();
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

  async function checkHackathonStatus() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/getHackDetails/${name}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
      });
      if (response.status === 403) navigate('/Error403');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const hackathonData = await response.json();
      const currentTime = new Date();
      const endTime = new Date(hackathonData.data.toDate);
      
      // Set isHackathonEnded to true if current time is after the end date
      setIsHackathonEnded(currentTime > endTime);
    } catch (error) {
      console.error('Error checking hackathon status:', error);
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
    if (isHackathonEnded) {
      // Read-only display when hackathon has ended - no edit buttons at all
      return (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
          <div className="flex items-center">
            {fieldName === "gender" ? (
              <div className="flex-1 px-4 py-2.5 bg-gray-50 rounded-md border border-gray-200 text-gray-700">
                {formData[fieldName] || "Not specified"}
              </div>
            ) : (
              <div className="flex-1 px-4 py-2.5 bg-gray-50 rounded-md border border-gray-200 text-gray-700 break-words">
                {formData[fieldName] || "Not specified"}
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // Editable fields with edit/save buttons when hackathon is active
    return (
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <div className="flex items-center gap-2">
          {fieldName === "gender" ? (
            <select
              disabled={!editableFields[fieldName]}
              value={formData[fieldName]}
              onChange={(e) => handleChange(e, fieldName)}
              className={`flex-1 px-4 py-2.5 bg-white rounded-md border ${editableFields[fieldName] ? 'border-indigo-300 bg-white' : 'border-gray-200 bg-gray-50'} focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-300`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <input
              type="text"
              disabled={!editableFields[fieldName]}
              value={formData[fieldName]}
              onChange={(e) => handleChange(e, fieldName)}
              className={`flex-1 px-4 py-2.5 rounded-md border ${editableFields[fieldName] ? 'border-indigo-300 bg-white' : 'border-gray-200 bg-gray-50'} focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-300`}
            />
          )}
          <button
            type="button"
            onClick={() => handleEdit(fieldName)}
            className={`px-4 py-2.5 rounded-md font-medium transition-colors duration-300 ${editableFields[fieldName] 
              ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'}`}
          >
            {editableFields[fieldName] ? "Save" : "Edit"}
          </button>
        </div>
        {errors[fieldName] && <p className="mt-1 text-sm text-red-500">{errors[fieldName]}</p>}
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
    <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg border border-gray-100 p-8">
      <h1 className="text-2xl font-medium text-gray-800 mb-6">
        {isHackathonEnded ? "Registration Details" : "Edit Registration Details"}
      </h1>
      
      <div className="grid gap-4">
        {inputComponent("Alias Name", "aliasname")}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputComponent("First Name", "firstname")}
          {inputComponent("Last Name", "lastname")}
        </div>
        {inputComponent("Email", "email")}
        {inputComponent("Phone Number", "phoneno")}
        {inputComponent("Gender", "gender")}
        {inputComponent("GitHub Profile URL", "githubprofile")}
        {inputComponent("LinkedIn Profile URL", "linkednprofile")}
        {inputComponent("Portfolio Website", "portfoliowebsite")}
        {inputComponent("Skills", "skills")}

        {errors.submitError && (
          <p className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-md">{errors.submitError}</p>
        )}

        {!isHackathonEnded && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-[#5f3abd] hover:bg-[#4f2fa0] text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f3abd] mt-4"
          >
            Submit Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default EditHackathonRegistrationForm;